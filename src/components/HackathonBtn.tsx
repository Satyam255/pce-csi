"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { CodeIcon } from "lucide-react";

function HackathonsBtn() {
  return (
    <Link href={"/hackathons"}>
      <Button className="gap-2 font-medium" size={"sm"}>
        <CodeIcon className="size-4" />
        Explore All Hackathons
      </Button>
    </Link>
  );
}

export default HackathonsBtn;
