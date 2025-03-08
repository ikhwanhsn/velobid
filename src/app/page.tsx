import Head from "next/head";
import { FaEthereum, FaHammer, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>Auction Smart Contract | Decentralized Bidding</title>
        <meta
          name="description"
          content="A fully decentralized auction system built on Ethereum with upgradable smart contracts."
        />
      </Head>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-blue-600 to-purple-800 min-h-screen">
        <h1 className="text-5xl font-bold mb-4">
          Decentralized Auction Platform
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl">
          A secure, transparent, and efficient way to bid on-chain. Powered by
          Ethereum and upgradable smart contracts.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-center mb-10">
          Why Choose Our Auction?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<FaHammer />}
            title="Decentralized & Secure"
            description="Built on Ethereum with smart contracts ensuring complete transparency and security."
          />
          <FeatureCard
            icon={<FaUsers />}
            title="User-Centric System"
            description="Ranked leaderboards, statistics tracking, and reputation-based rewards."
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Upgradable & Future-Proof"
            description="UUPS Upgradable Contracts for seamless updates and improvements."
          />
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-gray-800 py-16 text-center">
        <h2 className="text-4xl font-semibold mb-6">Technology Stack</h2>
        <p className="text-gray-300 mb-6">
          Our auction platform leverages cutting-edge blockchain technology.
        </p>
        <div className="flex justify-center gap-6 text-4xl">
          <FaEthereum />
          <FaHammer />
          <FaShieldAlt />
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="container mx-auto px-6 py-16 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-center mb-10">Roadmap 🚀</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <RoadmapItem
            title="Q1 2025 - MVP Launch"
            description="Initial deployment on Ethereum mainnet, testing, and security audits."
          />
          <RoadmapItem
            title="Q2 2025 - Advanced Features"
            description="Batch auctions, enhanced bidding strategies, and governance implementation."
          />
          <RoadmapItem
            title="Q3 2025 - Multi-Chain Expansion"
            description="Deploying to Solana, Polygon, and other EVM-compatible chains."
          />
          <RoadmapItem
            title="Q4 2025 - Full DAO Governance"
            description="Decentralized decision-making with community voting."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg flex flex-col items-center">
      <div className="text-5xl mb-4 text-yellow-500">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function RoadmapItem({ title, description }: any) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
