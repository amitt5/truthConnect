"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Clock, Star, CheckCircle } from "lucide-react"

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

interface DateConfirmationProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function DateConfirmation({ isOpen, onClose, user }: DateConfirmationProps) {
  const [step, setStep] = useState<"schedule" | "confirm" | "post-date">("schedule")
  const [dateTime, setDateTime] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [photoRating, setPhotoRating] = useState(0)
  const [continueDecision, setContinueDecision] = useState<"continue" | "end" | null>(null)

  const handleScheduleDate = () => {
    setStep("confirm")
  }

  const handleConfirmDate = () => {
    setStep("post-date")
  }

  const handlePostDateSubmit = () => {
    onClose()
    setStep("schedule")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>
              {step === "schedule" && "Schedule Date"}
              {step === "confirm" && "Confirm Date"}
              {step === "post-date" && "Post-Date Verification"}
            </span>
          </DialogTitle>
        </DialogHeader>

        {step === "schedule" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <Avatar className="w-12 h-12">
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
                <Badge variant="outline" className="text-xs">
                  Dating {user.dating_count} {user.dating_count === 1 ? "person" : "people"}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="datetime">Date & Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Cafe Central, Amsterdam"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Both parties must confirm before the date is official
              </p>
            </div>

            <Button
              onClick={handleScheduleDate}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!dateTime || !location}
            >
              Send Date Request
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Date Request Sent!</h3>
              <p className="text-sm text-green-700">Waiting for {user.name} to confirm</p>
            </div>

            <div className="space-y-3 p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm">
                  {dateTime && new Date(dateTime).toLocaleDateString()} at{" "}
                  {dateTime && new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span className="text-sm">{location}</span>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                <Clock className="w-4 h-4 inline mr-1" />
                You'll receive a reminder 1 hour before your date
              </p>
            </div>

            <Button onClick={handleConfirmDate} variant="outline" className="w-full">
              Simulate Date Completion
            </Button>
          </div>
        )}

        {step === "post-date" && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold mb-2">How was your date?</h3>
              <p className="text-sm text-slate-600">Your feedback helps keep our community authentic</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Did they look like their photos?</Label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setPhotoRating(star)} className="focus:outline-none">
                      <Star
                        className={`w-6 h-6 ${
                          star <= photoRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">1 = Very different, 5 = Exactly the same</p>
              </div>

              <div>
                <Label className="text-sm font-medium">What's next?</Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant={continueDecision === "continue" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContinueDecision("continue")}
                    className="flex-1"
                  >
                    Continue Dating
                  </Button>
                  <Button
                    variant={continueDecision === "end" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContinueDecision("end")}
                    className="flex-1"
                  >
                    End Connection
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-600">Your feedback is anonymous and helps maintain community trust</p>
            </div>

            <Button
              onClick={handlePostDateSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={photoRating === 0 || !continueDecision}
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
