"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity, Search, CheckCircle, Clock, AlertCircle, Info } from "lucide-react";

type CaseEvent = {
  date: string;
  event: string;
  details?: string;
  statusIcon: React.ElementType;
};

type CaseStatus = {
  id: string;
  status: "Filed" | "Hearing Scheduled" | "In Progress" | "Decision Pending" | "Closed";
  nextHearingDate?: string;
  assignedJudge?: string;
  progress: number;
  history: CaseEvent[];
};

const mockCaseData: Record<string, CaseStatus> = {
  "CASEX0123": { 
    id: "CASEX0123", 
    status: "Hearing Scheduled", 
    nextHearingDate: "2024-08-15", 
    assignedJudge: "Hon. Jane Doe", 
    progress: 30,
    history: [
      { date: "2024-07-01", event: "Case Filed", details: "Initial documents submitted.", statusIcon: CheckCircle },
      { date: "2024-07-05", event: "Review Complete", details: "Case accepted for hearing.", statusIcon: CheckCircle },
      { date: "2024-07-10", event: "Hearing Scheduled", details: "Initial hearing set for 2024-08-15.", statusIcon: Clock },
    ]
  },
  "CASEY0456": { 
    id: "CASEY0456", 
    status: "Decision Pending", 
    assignedJudge: "Hon. John Smith", 
    progress: 85,
    history: [
      { date: "2024-06-10", event: "Case Filed", statusIcon: CheckCircle },
      { date: "2024-06-20", event: "First Hearing", statusIcon: CheckCircle },
      { date: "2024-07-05", event: "Evidence Submitted", statusIcon: CheckCircle },
      { date: "2024-07-15", event: "Final Arguments", statusIcon: CheckCircle },
      { date: "2024-07-20", event: "Decision Reserved", details: "Judge to review and issue decision.", statusIcon: Clock },
    ]
  },
};

export default function TrackCasePage() {
  const [caseId, setCaseId] = useState("");
  const [status, setStatus] = useState<CaseStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackCase = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!caseId) {
      setError("Please enter a case ID.");
      return;
    }
    setIsLoading(true);
    setStatus(null);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = mockCaseData[caseId.toUpperCase()];
    if (data) {
      setStatus(data);
    } else {
      setError("Case ID not found. Please verify the ID and try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Case Tracking</CardTitle>
          </div>
          <CardDescription>Enter your case ID to view its current status and history.</CardDescription>
        </CardHeader>
        <form onSubmit={handleTrackCase}>
          <CardContent className="space-y-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter Case ID (e.g., CASEX0123)"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
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
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Case Status: {status.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="text-xl font-semibold">{status.status}</p>
            </div>
            <Progress value={status.progress} className="w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {status.nextHearingDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Next Hearing Date</p>
                  <p>{status.nextHearingDate}</p>
                </div>
              )}
              {status.assignedJudge && (
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Judge</p>
                  <p>{status.assignedJudge}</p>
                </div>
              )}
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Case History</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4">
                    {status.history.map((event, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <event.statusIcon className={`mt-1 h-5 w-5 ${
                          event.statusIcon === CheckCircle ? 'text-green-500' : 
                          event.statusIcon === Clock ? 'text-yellow-500' : 
                          'text-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{event.event} - <span className="text-sm text-muted-foreground">{event.date}</span></p>
                          {event.details && <p className="text-sm text-muted-foreground">{event.details}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              <Info className="inline h-3 w-3 mr-1"/>
              This information is updated regularly. For urgent queries, please contact the court registry.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
