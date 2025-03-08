# Auction Smart Contract

## Overview
This repository contains a decentralized auction system built on Ethereum, designed for a DeFi-based Hackathon. The project consists of two smart contracts:
1. **UserManager** - Manages user registration, statistics, and rankings.
2. **Auction** - Handles auction creation, bidding, and winner determination.

The project leverages **UUPS Upgradable Smart Contracts** for future improvements, ensuring flexibility and longevity.

---

## Features
### User Management
- **Register users** with a unique username.
- **Track user statistics**, including total bids, win rate, and points.
- **Calculate rankings** based on user points.

### Auction System
- **Create auctions** with a description, duration, and beneficiary.
- **Place bids** with ETH, ensuring only the highest bidder is recorded.
- **Withdraw previous bids** if outbid.
- **Automatically determine winners** at the end of an auction.
- **Distribute funds** to the auction beneficiary upon completion.

---

## Technology Stack
- **Solidity 0.8.26** - Smart contract language.
- **OpenZeppelin** - Security-enhanced contract libraries.
- **Hardhat** - Development and testing environment.
- **Ethereum** - Deployed on EVM-compatible chains.

---

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Hardhat
- MetaMask (for testing)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ikhwanhsn/velobid.git
   cd velobid
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile contracts:
   ```bash
   npx hardhat compile
   ```
4. Deploy contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network goerli
   ```

---

## Usage
### Registering a User
Call `registerUser(string _username)` from the `UserManager` contract.

### Creating an Auction
Use `createAuction(string _auctionName, string _auctionDescription, uint biddingTime, address payable beneficiaryAddress)`.

### Placing a Bid
Send ETH to `bid(uint auctionId)` in the `Auction` contract.

### Ending an Auction
Call `auctionEnd(uint auctionId)` to finalize and transfer funds.

---

## Security Considerations
- **Reentrancy Protection**: `ReentrancyGuardUpgradeable` prevents attacks.
- **Access Control**: `onlyOwner` ensures admin privileges are secure.
- **Upgradeability**: `UUPSUpgradeable` allows future improvements.

---

## License
This project is licensed under the **GPL-3.0** license.

---

## Future Enhancements
- Implement **on-chain reputation scores** for users.
- Support **batch auctions** and different bidding strategies.
- Improve **UI/UX with a frontend integration**.

---

🚀 **Happy Bidding!**

