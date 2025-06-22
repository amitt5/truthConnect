"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Calendar, Shield, Star, CheckCircle, Clock, MapPin } from "lucide-react"
import { MatchProfile } from "@/components/match-profile"
import { DateConfirmation } from "@/components/date-confirmation"
import { FlakeDetection } from "@/components/flake-detection"

// Sample data
const sampleUsers = [
  {
    id: 1,
    name: "Alex Chen",
    age: 28,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    dating_count: 1,
    active_matches: 5,
    flake_count: 0,
    photo_accuracy: 5,
    total_dates: 8,
    bio: "Marketing manager looking for genuine connection",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    age: 32,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    dating_count: 2,
    active_matches: 15,
    flake_count: 2,
    photo_accuracy: 4,
    total_dates: 25,
    bio: "Software engineer, loves hiking and cooking",
    verified: true,
  },
  {
    id: 3,
    name: "David Thompson",
    age: 29,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    dating_count: 0,
    active_matches: 3,
    flake_count: 1,
    photo_accuracy: 5,
    total_dates: 12,
    bio: "Teacher passionate about travel and books",
    verified: true,
  },
  {
    id: 4,
    name: "James Wilson",
    age: 31,
    photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    dating_count: 1,
    active_matches: 8,
    flake_count: 0,
    photo_accuracy: 4,
    total_dates: 5,
    bio: "Photographer and fitness enthusiast",
    verified: true,
  },
]

const sampleDates = [
  {
    id: 101,
    user1_id: 1,
    user2_id: 2,
    datetime: "2025-06-25T19:00:00Z",
    location: "Cafe Central, Amsterdam",
    confirmed_by_user1: true,
    confirmed_by_user2: true,
    status: "confirmed" as const,
    verification_score: 4,
  },
  {
    id: 102,
    user1_id: 2,
    user2_id: 3,
    datetime: "2025-06-26T20:00:00Z",
    location: "Park Bistro, Amsterdam",
    confirmed_by_user1: true,
    confirmed_by_user2: false,
    status: "pending_confirmation" as const,
    verification_score: null,
  },
  {
    id: 103,
    user1_id: 1,
    user2_id: 4,
    datetime: "2025-06-23T18:30:00Z",
    location: "Wine Bar Luna, Amsterdam",
    confirmed_by_user1: true,
    confirmed_by_user2: true,
    status: "happened" as const,
    verification_score: 4,
  },
]

export default function TruthConnectApp() {
  const [activeTab, setActiveTab] = useState("matches")
  const [selectedUser, setSelectedUser] = useState<(typeof sampleUsers)[0] | null>(null)
  const [showDateModal, setShowDateModal] = useState(false)
  const [showFlakeModal, setShowFlakeModal] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">TruthConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-slate-800 text-white border-slate-600">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-sm">
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Matches</span>
            </TabsTrigger>
            <TabsTrigger value="conversations" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chats</span>
            </TabsTrigger>
            <TabsTrigger value="dates" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Dates</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
          </TabsList>

          {/* Matches Feed */}
          <TabsContent value="matches" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Discover Genuine Connections</h2>
              <p className="text-slate-600">Transparency-first dating for serious relationships</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sampleUsers.map((user) => (
                <MatchProfile
                  key={user.id}
                  user={user}
                  onViewProfile={() => setSelectedUser(user)}
                  onScheduleDate={() => setShowDateModal(true)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Active Conversations */}
          <TabsContent value="conversations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Active Conversations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleUsers.slice(0, 2).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.photo || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          Dating {user.dating_count}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">Hey! Looking forward to our coffee date...</p>
                    </div>
                    <div className="text-xs text-slate-500">2h ago</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Dates */}
          <TabsContent value="dates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Dates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleDates.map((date) => {
                  const user = sampleUsers.find((u) => u.id === date.user2_id)
                  if (!user) return null

                  return (
                    <div key={date.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.photo || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-slate-600">
                              {new Date(date.datetime).toLocaleDateString()} at{" "}
                              {new Date(date.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                        <Badge variant={date.status === "confirmed" ? "default" : date.status === "happened" ? "outline" : "secondary"}>
                          {date.status === "confirmed" ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Confirmed
                            </>
                          ) : date.status === "happened" ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{date.location}</span>
                      </div>
                      {date.status === "pending_confirmation" && (
                        <Button
                          size="sm"
                          onClick={() => setShowDateModal(true)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Confirm Date
                        </Button>
                      )}
                      {date.status === "happened" && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowFlakeModal(true)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Report No-Show
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-orange-600 border-orange-200 hover:bg-orange-50"
                          >
                            Report Catfish
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Plan Next Date
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-slate-600 border-slate-200 hover:bg-slate-50"
                          >
                            Unmatch
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dating Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Dating Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Currently Dating:</span>
                      <Badge variant="outline">1 person</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Active Matches:</span>
                      <Badge variant="outline">8 conversations</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Reliability Score:</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Excellent
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Photo Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">5.0/5.0</span>
                  </div>
                  <p className="text-sm text-slate-600">Your photos accurately represent how you look</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Standing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">No-Show Reports:</span>
                      <Badge className="bg-green-100 text-green-800">0</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Positive Reviews:</span>
                      <Badge className="bg-blue-100 text-blue-800">12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Member Since:</span>
                      <span className="text-sm text-slate-600">Jan 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transparency Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Dating Count</h4>
                      <p className="text-sm text-slate-600">Let matches see how many people you're currently dating</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Photo Verification</h4>
                      <p className="text-sm text-slate-600">Allow dates to rate photo accuracy</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Flake Reporting</h4>
                      <p className="text-sm text-slate-600">Participate in community accountability</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showDateModal && (
        <DateConfirmation
          isOpen={showDateModal}
          onClose={() => setShowDateModal(false)}
          user={selectedUser || sampleUsers[0]}
        />
      )}

      {showFlakeModal && (
        <FlakeDetection
          isOpen={showFlakeModal}
          onClose={() => setShowFlakeModal(false)}
          date={sampleDates[0]}
          user={sampleUsers[1]}
        />
      )}
    </div>
  )
}
