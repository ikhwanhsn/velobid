"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  BarChart2,
  ChevronDown,
  DollarSign,
  Filter,
  Gavel,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  useAccount,
  useReadContracts,
  UseReadContractsReturnType,
} from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "auctionName",
        type: "string",
      },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AuctionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "HighestBidIncreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "auctionEnd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctions",
    outputs: [
      {
        internalType: "address payable",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "string",
        name: "auctionName",
        type: "string",
      },
      {
        internalType: "string",
        name: "auctionDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "auctionEndTime",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "highestBidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "highestBid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "ended",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "bid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_auctionName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_auctionDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "biddingTime",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "beneficiaryAddress",
        type: "address",
      },
    ],
    name: "createAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "getRecentAuctions",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "string",
            name: "auctionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "auctionDescription",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "auctionEndTime",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "highestBidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "highestBid",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "ended",
            type: "bool",
          },
        ],
        internalType: "struct Auction.AuctionStruct[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userManagerAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pendingReturns",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "userManager",
    outputs: [
      {
        internalType: "contract UserManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const DashboardPage = () => {
  const { isConnected } = useAccount();
  const notifyTransactionPending = () => toast("Your transaction is pending!");
  const notifyTransactionSuccess = () => toast("Transaction success!");

  // Read data from smart contract
  const {
    data,
    isPending: isFetching,
    refetch,
  }: UseReadContractsReturnType = useReadContracts({
    contracts: [
      {
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi,
        functionName: "userManagerAddress",
      },
    ],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-12 px-6">
      <ToastContainer />
      {/* Top Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Auction Overview"
          stats={[
            {
              label: "Total Auctions",
              value: "120",
              icon: <Gavel size={24} className="text-blue-500" />,
            },
            {
              label: "Active Auctions",
              value: "45",
              icon: <Activity size={24} className="text-red-500" />,
            },
            {
              label: "Total Bidders",
              value: "350",
              icon: <Users size={24} className="text-green-500" />,
            },
          ]}
        />
        <DashboardCard
          title="Financial Overview"
          stats={[
            {
              label: "Total Volume",
              value: "45 ETH",
              icon: <DollarSign size={24} className="text-yellow-500" />,
            },
            {
              label: "Highest Bid",
              value: "3.5 ETH",
              icon: <TrendingUp size={24} className="text-purple-500" />,
            },
            {
              label: "Avg Bid Price",
              value: "1.2 ETH",
              icon: <BarChart2 size={24} className="text-orange-500" />,
            },
          ]}
        />
      </section>

      {/* Input Section */}
      <section className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center w-full gap-2">
          <Input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gray-800 border border-gray-700 hover:bg-blue-600 flex items-center gap-2 cursor-pointer transition duration-300">
                <Filter size={18} /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-800 border border-gray-700"
            >
              <DropdownMenuCheckboxItem className="text-white hover:bg-blue-600 cursor-pointer">
                Active Auctions
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-white hover:bg-blue-600 cursor-pointer">
                Ended Auctions
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-white hover:bg-blue-600 cursor-pointer">
                Highest Bids
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-white hover:bg-blue-600 cursor-pointer">
                Latest Auctions
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ButtonCreateAuction />
      </section>

      {/* Auction Section */}
      <section className="mt-6 space-y-6">
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-700 transition duration-300 cursor-pointer"
          >
            Load more...
          </Button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;

// ===== Dashboard Card =====
function DashboardCard({ title, stats }: any) {
  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden  p-5">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {stats.map((stat: any, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <div className="bg-gray-700 p-3 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ===== Button Create Auction =====
function ButtonCreateAuction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 transition duration-300 shadow-lg cursor-pointer">
          + Create Auction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Create Auction</DialogTitle>
          <DialogDescription>
            Please fill in the form below to create a new auction.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Name..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4 w-full">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              placeholder="Duration in hours..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bid" className="text-right">
              Starting Bid
            </Label>
            <Input
              id="bid"
              placeholder="Starting bid in ETH..."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 transition duration-300 shadow-lg cursor-pointer"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ===== Auction Card =====
function AuctionCard() {
  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Auction Title</CardTitle>
        <CardDescription className="text-gray-400">
          Auction Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">Auction Content</p>
      </CardContent>
      <CardFooter className="border-t pt-5 border-gray-700 flex justify-between items-center text-sm text-gray-400">
        <span>Starting Bid: 0.1 ETH</span>
        <Button className="bg-blue-600 hover:bg-blue-700 transition duration-300 cursor-pointer text-white">
          Bid Now
        </Button>
      </CardFooter>
    </Card>
  );
}
