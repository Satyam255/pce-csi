"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import  { ChartColumn } from "lucide-react";

function LeaderBoardBtn() {
  return (
    <Link href={"/leaderboard"}>
      <Button className="flex items-center gap-2 bg-[#00FF90] text-black px-4 py-2 rounded-md hover:opacity-90 transition-opacity" size={"lg"}>
        <ChartColumn className="size-6" />
        Leaderboard
      </Button>
    </Link>
  );
}

export default LeaderBoardBtn;