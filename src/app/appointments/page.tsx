
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Info, Eye } from "lucide-react";
import type React from "react";
import { useMemo } from "react";

type Appointment = {
  id: string;
  date: string; // Should be in YYYY-MM-DD format for easy comparison
  time: string;
  caseId: string;
  purpose: string;
  status: "Scheduled" | "Completed" | "Cancelled";
};

const appointments: Appointment[] = [
  { id: "APP001", date: "2024-08-15", time: "10:00 AM", caseId: "CASEX0123", purpose: "Initial Hearing", status: "Scheduled" },
  { id: "APP002", date: "2024-08-20", time: "02:30 PM", caseId: "CASEY0456", purpose: "Evidence Submission", status: "Scheduled" },
  { id: "APP003", date: "2024-07-10", time: "11:00 AM", caseId: "CASEZ0789", purpose: "Mediation", status: "Completed" },
  { id: "APP004", date: "2024-09-01", time: "09:00 AM", caseId: "CASEX0123", purpose: "Follow-up Hearing", status: "Scheduled" },
  { id: "APP005", date: "2024-07-25", time: "03:00 PM", caseId: "CASEA0321", purpose: "Sentencing", status: "Cancelled" },
  { id: "APP006", date: "2023-12-01", time: "10:00 AM", caseId: "CASEB0001", purpose: "Past Hearing", status: "Completed"},
];

// Helper to format date string
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateString; // fallback
  }
};


export default function AppointmentsPage() {

  const mostRecentAppointment = useMemo(() => {
    if (appointments.length === 0) return null;
    // Filter for scheduled or completed, sort by date descending, take the first.
    // This prioritizes future scheduled, then most recent completed.
    const sortedAppointments = [...appointments]
      .filter(app => app.status === "Scheduled" || app.status === "Completed")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedAppointments.length > 0 ? sortedAppointments[0] : null;
  }, []);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Scheduled Appointments</CardTitle>
        </div>
        <CardDescription>View your upcoming and past court appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        {mostRecentAppointment && (
          <div className="mb-6 p-4 border rounded-lg bg-accent/10">
            <h3 className="text-md font-semibold mb-1">Most Recent Appointment Activity:</h3>
            <p className="text-sm">
              Case ID: {mostRecentAppointment.caseId} - {mostRecentAppointment.purpose}
            </p>
            <div className="flex items-center mt-1">
              <p className="text-sm mr-2">
                Date: {formatDate(mostRecentAppointment.date)} ({mostRecentAppointment.status})
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> View Date Detail
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                  <div className="text-center">
                    <p className="font-semibold">Appointment Date</p>
                    <p className="text-lg">{formatDate(mostRecentAppointment.date)}</p>
                    <p className="text-sm text-muted-foreground">Time: {mostRecentAppointment.time}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {appointments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Case ID</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{formatDate(appointment.date)}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.caseId}</TableCell>
                  <TableCell>{appointment.purpose}</TableCell>
                  <TableCell>
                    <Badge variant={
                      appointment.status === "Scheduled" ? "default" :
                      appointment.status === "Completed" ? "secondary" :
                      "destructive"
                    }>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Info className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Appointments Found</h3>
            <p className="text-muted-foreground">You currently have no scheduled appointments.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    