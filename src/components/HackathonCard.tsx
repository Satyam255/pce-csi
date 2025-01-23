"use client"
import {Badge} from "../components/ui/badge"
import { Button } from "../components/ui/button"

import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Trophy, Users2, DiscIcon as Discord, Twitter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import Link from "next/link"
import React from "react"

interface HackathonCardProps {
  title: string
  startDate: string
  isOnline: boolean
  theme?: string
  participantCount?: number
  participants?: Array<{
    name: string
    image?: string
  }>
  socialLinks?: {
    twitter?: string
    discord?: string
  }
}

export default function HackathonCard({
  title,
  startDate,
  isOnline,
  theme = "NO RESTRICTIONS",
  participantCount,
  participants = [],
  socialLinks,
}: HackathonCardProps) {
  const formattedDate = new Date(startDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">Hackathon</p>
            </div>
          </div>
          {socialLinks && (
            <div className="flex gap-2">
              {socialLinks.twitter && (
                <Link href={socialLinks.twitter} className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {socialLinks.discord && (
                <Link href={socialLinks.discord} className="text-muted-foreground hover:text-primary">
                  <Discord className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">THEME</div>
          <Badge variant="secondary" className="rounded-full">
            {theme}
          </Badge>
        </div>

        {participantCount && participants.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((participant, i) => (
                <Avatar key={i} className="border-2 border-background">
                  <AvatarImage src={participant.image} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-emerald-600">+{participantCount} participating</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-4">
          <Badge variant="outline">{isOnline ? "ONLINE" : "OFFLINE"}</Badge>
          <Badge variant="outline">OPEN</Badge>
          <Badge variant="outline">STARTS {formattedDate}</Badge>
        </div>
        <Button>Apply now</Button>
      </CardFooter>
    </Card>
  )
}

