// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.26;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract UserManager is UUPSUpgradeable, OwnableUpgradeable {
    struct UserStruct {
        string username;
        uint256 point;
        uint256 winrate;
        uint256 totalBid;
        uint256 totalValueBid;
        uint256 totalAuctionCreated;
        uint256 totalAuctionParticipated;
        uint256 totalWinningBids;
        uint256 totalBidsPlaced;
        uint256 averageBidValue;
    }
    
    mapping(address => UserStruct) private users;
    address[] private userList;

    event UserRegistered(address indexed user, string username);
    event UserUpdated(address indexed user);

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function registerUser(string memory _username) external {
        require(bytes(users[msg.sender].username).length == 0, "User already registered");

        users[msg.sender] = UserStruct({
            username: _username,
            point: 0,
            winrate: 0,
            totalBid: 0,
            totalValueBid: 0,
            totalAuctionCreated: 0,
            totalAuctionParticipated: 0,
            totalWinningBids: 0,
            totalBidsPlaced: 0,
            averageBidValue: 0
        });

        userList.push(msg.sender);
        emit UserRegistered(msg.sender, _username);
    }

    function updateUserStats(address user, uint256 bidAmount, bool isWinner) external onlyOwner {
        require(bytes(users[user].username).length > 0, "User not registered");

        users[user].totalBidsPlaced += 1;
        users[user].totalValueBid += bidAmount;
        users[user].totalAuctionParticipated += 1;

        if (isWinner) {
            users[user].point += 10;
            users[user].totalWinningBids += 1;
        }

        if (users[user].totalBidsPlaced > 0) {
            users[user].averageBidValue = users[user].totalValueBid / users[user].totalBidsPlaced;
        }

        users[user].winrate = (users[user].totalWinningBids * 100) / users[user].totalAuctionParticipated;

        emit UserUpdated(user);
    }

    function updateAuctionCreated(address user) external onlyOwner {
        require(bytes(users[user].username).length > 0, "User not registered");
        users[user].totalAuctionCreated += 1;
        emit UserUpdated(user);
    }

    function getUser(address user) external view returns (UserStruct memory) {
        return users[user];
    }

    function getAllUsers() public view returns (UserStruct[] memory) {
        UserStruct[] memory allUsers = new UserStruct[](userList.length);
        for (uint i = 0; i < userList.length; i++) {
            allUsers[i] = users[userList[i]];
        }
        return allUsers;
    }

    function getTopUsers() external view returns (UserStruct[] memory) {
        UserStruct[] memory sortedUsers = getAllUsers();

        for (uint i = 0; i < sortedUsers.length; i++) {
            for (uint j = i + 1; j < sortedUsers.length; j++) {
                if (sortedUsers[i].point < sortedUsers[j].point) {
                    (sortedUsers[i], sortedUsers[j]) = (sortedUsers[j], sortedUsers[i]);
                }
            }
        }
        return sortedUsers;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

contract Auction is UUPSUpgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    struct AuctionStruct {
        address payable beneficiary;
        string auctionName;
        string auctionDescription;
        uint auctionEndTime;
        address highestBidder;
        uint highestBid;
        bool ended;
    }

    AuctionStruct[] public auctions;
    mapping(address => uint) public pendingReturns;
    UserManager public userManager;

    event AuctionCreated(uint indexed auctionId, string auctionName);
    event HighestBidIncreased(address indexed bidder, uint amount);
    event AuctionEnded(address indexed winner, uint amount);

    function initialize(address userManagerAddress) public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
        userManager = UserManager(userManagerAddress);
    }

    function createAuction(
        string memory _auctionName,
        string memory _auctionDescription,
        uint biddingTime,
        address payable beneficiaryAddress
    ) external onlyOwner {
        auctions.push(
            AuctionStruct({
                auctionName: _auctionName,
                auctionDescription: _auctionDescription,
                auctionEndTime: block.timestamp + biddingTime,
                beneficiary: beneficiaryAddress,
                highestBidder: address(0),
                highestBid: 0,
                ended: false
            })
        );

        userManager.updateAuctionCreated(msg.sender);
        emit AuctionCreated(auctions.length - 1, _auctionName);
    }

    function getRecentAuctions(uint count) external view returns (AuctionStruct[] memory) {
        uint start = (auctions.length > count) ? auctions.length - count : 0;
        AuctionStruct[] memory recentAuctions = new AuctionStruct[](auctions.length - start);
        
        for (uint i = start; i < auctions.length; i++) {
            recentAuctions[i - start] = auctions[i];
        }
        
        return recentAuctions;
    }

    function bid(uint auctionId) external payable nonReentrant {
        require(auctionId < auctions.length, "Auction does not exist");
        AuctionStruct storage auction = auctions[auctionId];

        require(block.timestamp <= auction.auctionEndTime, "Auction already ended");
        require(msg.value > auction.highestBid, "Bid not high enough");

        if (auction.highestBid != 0) {
            pendingReturns[auction.highestBidder] += auction.highestBid;
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);

        userManager.updateUserStats(msg.sender, msg.value, false);
    }

    function auctionEnd(uint auctionId) external nonReentrant {
        require(auctionId < auctions.length, "Auction does not exist");
        AuctionStruct storage auction = auctions[auctionId];

        require(block.timestamp >= auction.auctionEndTime, "Auction not yet ended");
        require(!auction.ended, "Auction already ended");

        auction.ended = true;
        emit AuctionEnded(auction.highestBidder, auction.highestBid);

        userManager.updateUserStats(auction.highestBidder, auction.highestBid, true);
        auction.beneficiary.transfer(auction.highestBid);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
