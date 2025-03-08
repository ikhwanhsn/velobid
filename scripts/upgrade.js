// Upgrade with proxy
const { ethers, upgrades } = require("hardhat");

async function main() {
  const AuctionFactory = await ethers.getContractFactory("SimpleAuction");
  const auctionFactory = await upgrades.upgradeProxy(
    "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
    AuctionFactory
  );

  console.log("AuctionFactory upgraded to new implementation!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
