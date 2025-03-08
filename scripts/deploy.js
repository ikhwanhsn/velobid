// Deploy with proxy
const { ethers, upgrades } = require("hardhat");

async function main() {
  const AuctionFactory = await ethers.getContractFactory("SimpleAuction");

  console.log("Deploying proxy...");

  const auctionFactory = await upgrades.deployProxy(
    AuctionFactory,
    ["0xF9dcBFF7EdDd76c58412fd46f4160c96312ce734"],
    {
      kind: "uups",
      initializer: "initialize",
    }
  );

  await auctionFactory.waitForDeployment();

  console.log("AuctionFactory deployed to:", await auctionFactory.getAddress());
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});
