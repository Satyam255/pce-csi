"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UsersIcon } from "lucide-react";

function TeamBtn() {
  return (
    <Link href={"/team/create"}>
      <Button className="gap-2 font-medium" size={"sm"}>
        <UsersIcon className="size-4" />
        Create Team
      </Button>
    </Link>
  );
}

export default TeamBtn;
