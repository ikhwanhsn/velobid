// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.26;

contract Auction {
    // Constants
    address public owner;

    // Structs
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
    struct AuctionStruct {
        uint256 auctionId;
        address beneficiary;
        string auctionName;
        string auctionDescription;
        uint256 auctionEndTime;
        uint256 biddingTime;
        bool ended;
    }
    struct DataStruct {
        uint256 totalAuction;
        uint256 totalActiveAuction;
        uint256 totalBidders;
        uint256 totalBid;
        uint256 totalVolumeBid;
        uint256 highestBid;
        address highestBidder;
        uint256 averageBidValue;
        uint256 totalUsers;
    }

    // Mappings
    mapping(address => UserStruct) public users;
    mapping(address => AuctionStruct) public auctions;
    mapping(address => DataStruct) public data;

    // Events
    event UserRegistered(address indexed user, string username);
    event UserUpdated(address indexed user);
    event AuctionCreated(uint indexed auctionId, string auctionName);
    event HighestBidIncreased(address indexed bidder, uint amount);
    event AuctionEnded(address indexed winner, uint amount);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    bool private reentrant = false;
    modifier nonReentrant() {
        require(!reentrant, "ReentrancyGuard: reentrant call");
        reentrant = true;
        _;
        reentrant = false;
    }

    // Functions
    function UserRegistration(string memory _username) external {
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
        emit UserRegistered(msg.sender, _username);
    }
    function getUser(address user) external view returns (UserStruct memory) {
        return users[user];
    }
    function createAuction(string memory _auctionName, string memory _auctionDescription, uint256 _biddingTime) external {
        require(bytes(auctions[msg.sender].auctionName).length == 0, "User already created an auction");
        auctions[msg.sender] = AuctionStruct({
            auctionId: 1,
            beneficiary: msg.sender,
            auctionName: _auctionName,
            auctionDescription: _auctionDescription,
            auctionEndTime: block.timestamp + _biddingTime,
            biddingTime: _biddingTime,
            ended: false
        });
        emit AuctionCreated(auctions[msg.sender].auctionId, _auctionName);
    }
}