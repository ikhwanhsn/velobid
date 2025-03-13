"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  FaEthereum,
  FaHammer,
  FaShieldAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";

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
        <Link
          href="/dashboard"
          className="mt-6 px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition cursor-pointer"
        >
          Get Started
        </Link>
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

      {/* User & Expert Reviews Section */}
      <section className="bg-gray-800 py-16">
        <h2 className="text-4xl font-semibold text-center mb-10">
          User & Expert Reviews
        </h2>
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-6">
          <ReviewCard
            avatar="/user1.jpg"
            name="Alice Thompson"
            rating={5}
            comment="This platform is a game-changer! The transparency and fairness of the auction system are outstanding."
          />
          <ReviewCard
            avatar="/expert.jpg"
            name="Dr. Blockchain"
            rating={5}
            comment="A top-tier decentralized auction solution with smart contract upgradability. Truly future-proof!"
          />
          <ReviewCard
            avatar="/expert.jpg"
            name="Dr. Blockchain"
            rating={5}
            comment="A top-tier decentralized auction solution with smart contract upgradability. Truly future-proof!"
          />
          <ReviewCard
            avatar="/expert.jpg"
            name="Dr. Blockchain"
            rating={5}
            comment="A top-tier decentralized auction solution with smart contract upgradability. Truly future-proof!"
          />
        </div>
      </section>

      {/* Q&A Section */}
      {/* <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <QAItem
            question="How does the auction process work?"
            answer="Users place bids on items in a fully transparent and decentralized way using Ethereum smart contracts. The highest bidder wins when the auction ends."
          />
          <QAItem
            question="Is my bid secure?"
            answer="Yes, all bids are processed via immutable smart contracts, ensuring security and transparency."
          />
          <QAItem
            question="What cryptocurrencies are supported?"
            answer="Currently, we support ETH and ERC-20 tokens, with plans to expand to multi-chain assets."
          />
        </div>
      </section> */}
      <FAQSection />
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

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      question: "How does the auction work?",
      answer:
        "The auction runs on Ethereum using smart contracts to ensure fairness and transparency.",
    },
    {
      question: "Is my bid secure?",
      answer:
        "Yes, all bids are recorded on-chain, making them tamper-proof and verifiable.",
    },
    {
      question: "What happens if I win?",
      answer:
        "Winners will automatically receive the item or NFT, and the payment will be processed via smart contract.",
    },
    {
      question: "Can I cancel my bid?",
      answer:
        "No, once a bid is placed, it cannot be canceled to maintain auction integrity.",
    },
    {
      question: "What fees are involved?",
      answer:
        "A small gas fee is required for transactions, but there are no hidden platform fees.",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-semibold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-md mt-3 hover:bg-[#676f7c69] transition duration-300"
          >
            <button
              className="w-full text-left flex justify-between items-center text-lg font-semibold cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ avatar, name, rating, comment }: any) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center space-x-4">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full border-2 border-yellow-500"
      />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex text-yellow-500 mb-2">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>
        <p className="text-gray-400">{comment}</p>
      </div>
    </div>
  );
}
