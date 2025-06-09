"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ListChecks, Search, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ComplaintStatus = {
  id: string;
  status: "Submitted" | "Under Review" | "Investigation" | "Resolved" | "Closed";
  lastUpdated: string;
  nextStep: string;
  progress: number;
  details?: string;
};

const mockComplaintData: Record<string, ComplaintStatus> = {
  "COMP001": { id: "COMP001", status: "Under Review", lastUpdated: "2024-07-28", nextStep: "Assign to investigator", progress: 40, details: "Complaint acknowledged and initial review in progress." },
  "COMP002": { id: "COMP002", status: "Resolved", lastUpdated: "2024-07-25", nextStep: "N/A", progress: 100, details: "Issue addressed and complainant satisfied with the resolution." },
};

export default function TrackComplaintsPage() {
  const [complaintId, setComplaintId] = useState("");
  const [status, setStatus] = useState<ComplaintStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId) {
      setError("Please enter a complaint ID.");
      return;
    }
    setIsLoading(true);
    setStatus(null);
    setError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = mockComplaintData[complaintId.toUpperCase()];
    if (data) {
      setStatus(data);
    } else {
      setError("Complaint ID not found. Please check the ID and try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Track Complaint</CardTitle>
          </div>
          <CardDescription>Enter your complaint ID to check its status.</CardDescription>
        </CardHeader>
        <form onSubmit={handleTrackComplaint}>
          <CardContent className="space-y-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter Complaint ID (e.g., COMP001)"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? "Tracking..." : "Track"}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
        </form>
      </Card>

      {status && (
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Complaint Status: {status.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="text-lg font-semibold">{status.status}</p>
            </div>
            <Progress value={status.progress} className="w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p>{status.lastUpdated}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Step</p>
                <p>{status.nextStep}</p>
              </div>
            </div>
            {status.details && (
               <Alert>
                 <Info className="h-4 w-4" />
                 <AlertTitle>Details</AlertTitle>
                 <AlertDescription>{status.details}</AlertDescription>
               </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
