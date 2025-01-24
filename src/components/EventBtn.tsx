"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

function EventsBtn() {
  return (
    <Link href={"/projects"}>
      <Button className="gap-2 font-medium" size={"sm"}>
        <CalendarIcon className="size-4" />
        Project 
      </Button>
    </Link>
  );
}

export default EventsBtn;
