"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Calendar, MapPin, Shield } from "lucide-react"

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

interface DateInfo {
  id: number
  user1_id: number
  user2_id: number
  datetime: string
  location: string
  confirmed_by_user1: boolean
  confirmed_by_user2: boolean
  status: "confirmed" | "pending_confirmation" | "happened"
  verification_score: number | null
}

interface FlakeDetectionProps {
  isOpen: boolean
  onClose: () => void
  date: DateInfo
  user: User
}

export function FlakeDetection({ isOpen, onClose, date, user }: FlakeDetectionProps) {
  const [step, setStep] = useState<"report" | "submitted">("report")
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")

  const handleSubmitReport = () => {
    setStep("submitted")
  }

  const handleClose = () => {
    onClose()
    setStep("report")
    setReason("")
    setDetails("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span>
              {step === "report" && "Report No-Show"}
              {step === "submitted" && "Report Submitted"}
            </span>
          </DialogTitle>
        </DialogHeader>

        {step === "report" && (
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
                  {user.flake_count} previous reports
                </Badge>
              </div>
            </div>

            <div className="space-y-3 p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm">
                  {new Date(date.datetime).toLocaleDateString()} at{" "}
                  {new Date(date.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span className="text-sm">{date.location}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="reason">What happened?</Label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select a reason</option>
                <option value="no-show">Didn't show up at all</option>
                <option value="late-cancel">Cancelled last minute (less than 2 hours)</option>
                <option value="very-late">Showed up very late (30+ minutes)</option>
                <option value="left-early">Left within 15 minutes</option>
              </select>
            </div>

            <div>
              <Label htmlFor="details">Additional details (optional)</Label>
              <Textarea
                id="details"
                placeholder="Any additional context about what happened..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                <Shield className="w-4 h-4 inline mr-1" />
                Reports are reviewed and the other person can dispute if needed
              </p>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReport}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                disabled={!reason}
              >
                Submit Report
              </Button>
            </div>
          </div>
        )}

        {step === "submitted" && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Report Submitted</h3>
              <p className="text-sm text-green-700">Thank you for helping keep our community accountable</p>
            </div>

            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• {user.name} will be notified of the report</li>
                  <li>• They can dispute or acknowledge the incident</li>
                  <li>• Their reliability score will be updated accordingly</li>
                  <li>• Future matches will see updated transparency info</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Forgiveness Option</h4>
                <p className="text-sm text-blue-700">You can forgive this incident later if circumstances change</p>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full bg-blue-600 hover:bg-blue-700">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
