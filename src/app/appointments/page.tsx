import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Info } from "lucide-react";

type Appointment = {
  id: string;
  date: string;
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
];

export default function AppointmentsPage() {
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
                  <TableCell>{appointment.date}</TableCell>
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
