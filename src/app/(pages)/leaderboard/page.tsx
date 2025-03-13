"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Users, DollarSign } from "lucide-react";

const LeaderboardPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-12 px-6">
      {/* Page Title */}
      <section className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Auction Leaderboard</h1>
        <p className="text-gray-400">
          Top bidders and spenders in the auction system
        </p>
      </section>

      {/* Leaderboard Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeaderboardCard
          title="Top Bidders"
          description="Users with the most bids placed"
          icon={<Users size={32} className="text-blue-500" />}
          data={Array.from({ length: 100 }, (_, i) => ({
            rank: i + 1,
            name: `User ${i + 1}`,
            bids: Math.floor(Math.random() * 200),
          }))}
        />
        <LeaderboardCard
          title="Top Spenders"
          description="Users who spent the most in auctions"
          icon={<DollarSign size={32} className="text-yellow-500" />}
          data={Array.from({ length: 100 }, (_, i) => ({
            rank: i + 1,
            name: `User ${i + 1}`,
            spent: `${(Math.random() * 50).toFixed(2)} ETH`,
          }))}
        />
      </section>
    </main>
  );
};

export default LeaderboardPage;

function LeaderboardCard({ title, description, icon, data }: any) {
  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden  p-5">
      <CardHeader className="flex items-center gap-3">
        <div className="bg-gray-700 p-3 rounded-full">{icon}</div>
        <div>
          <CardTitle className="text-lg font-semibold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                {title.includes("Spenders") ? "Spent" : "Bids"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={index} className="border-gray-700">
                <TableCell className="font-bold flex items-center gap-2">
                  {item.rank === 1 && (
                    <Trophy size={16} className="text-yellow-500" />
                  )}{" "}
                  {item.rank === 2 && (
                    <Trophy size={16} className="text-sky-500" />
                  )}{" "}
                  {item.rank === 3 && (
                    <Trophy size={16} className="text-amber-500" />
                  )}
                  {item.rank}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.bids || item.spent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
