"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageCircle, Shield, Star, AlertTriangle, CheckCircle, Calendar } from "lucide-react"

interface User {
  id: number
  name: string
  age: number
  photo: string
  dating_count: number
  active_matches: number
  flake_count: number
  photo_accuracy: number
  total_dates: number
  bio: string
  verified: boolean
}

interface MatchProfileProps {
  user: User
  onViewProfile: () => void
  onScheduleDate: () => void
}

export function MatchProfile({ user, onViewProfile, onScheduleDate }: MatchProfileProps) {
  const [totalDatesState, setTotalDatesState] = useState<'hidden' | 'requesting' | 'revealed'>('hidden')

  const getFlakeStatusBadge = (flakeCount: number) => {
    if (flakeCount <= 1) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Reliable
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Non Reliable
        </Badge>
      )
    }
  }

  const getTotalDatesRange = (totalDates: number) => {
    if (totalDates <= 10) return "0-10"
    if (totalDates <= 20) return "11-20"
    if (totalDates <= 30) return "21-30"
    if (totalDates <= 50) return "31-50"
    return "50+"
  }

  const handleTotalDatesClick = () => {
    if (totalDatesState === 'hidden') {
      setTotalDatesState('requesting')
      setTimeout(() => {
        setTotalDatesState('revealed')
      }, 3000)
    }
  }

  const getTotalDatesDisplay = () => {
    switch (totalDatesState) {
      case 'hidden':
        return (
          <button 
            onClick={handleTotalDatesClick}
            className="text-blue-600 hover:text-blue-800 underline cursor-pointer text-sm"
          >
            View total dates
          </button>
        )
      case 'requesting':
        return (
          <div className="text-sm text-amber-600 animate-pulse">
            Requesting permission...
          </div>
        )
      case 'revealed':
        return (
          <Badge variant="outline" className="bg-white">
            {getTotalDatesRange(user.total_dates)} dates
          </Badge>
        )
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader className="p-0">
        <div className="relative">
          <Avatar className="w-full h-64 rounded-none">
            <AvatarImage src={user.photo || "/placeholder.svg"} className="object-cover" />
            <AvatarFallback className="rounded-none h-64 text-2xl">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {user.verified && (
            <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-slate-900">
              {user.name}, {user.age}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= user.photo_accuracy ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Photo accuracy: {user.photo_accuracy}/5 stars</p>
                  <p className="text-xs">Based on date feedback</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-slate-600 text-sm mb-3">{user.bio}</p>
        </div>

        {/* Transparency Stats */}
        <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Currently dating:</span>
            <Badge variant="outline" className="bg-white">
              {user.dating_count} {user.dating_count === 1 ? "person" : "people"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Active conversations:</span>
            <Badge variant="outline" className="bg-white">
              {user.active_matches} matches
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Total dates:</span>
            {getTotalDatesDisplay()}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Photo accuracy:</span>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= user.photo_accuracy ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">({user.photo_accuracy}/5)</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Flakes: {user.flake_count}</span>
            {getFlakeStatusBadge(user.flake_count)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
