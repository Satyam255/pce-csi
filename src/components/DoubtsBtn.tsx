"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UsersIcon } from "lucide-react";

function DoubtsBtn() {
    return (
        <Link href={"/qa"}>
            <Button className="gap-2 font-medium" size={"sm"}>
                <UsersIcon className="size-4" />
                Doubts
            </Button>
        </Link>
    );
}

export default DoubtsBtn;