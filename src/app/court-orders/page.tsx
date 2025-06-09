
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";

type CourtOrder = {
  id: string;
  caseId: string;
  orderDate: string;
  summary: string;
  documentUrl: string; // Placeholder for download link
};

const courtOrders: CourtOrder[] = [
  { id: "CO001", caseId: "CASEX0123", orderDate: "2024-07-20", summary: "Court order regarding evidence submission deadlines.", documentUrl: "/path/to/courtorder001.pdf" },
  { id: "CO002", caseId: "CASEY0456", orderDate: "2024-07-22", summary: "Order for discovery of documents.", documentUrl: "/path/to/courtorder002.pdf" },
  { id: "CO003", caseId: "CASEZ0789", orderDate: "2024-06-15", summary: "Scheduling order for upcoming hearings.", documentUrl: "/path/to/courtorder003.pdf" },
];

export default function CourtOrdersPage() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Court Orders</CardTitle>
        </div>
        <CardDescription>View and download court orders related to your cases.</CardDescription>
      </CardHeader>
      <CardContent>
        {courtOrders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courtOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.caseId}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell className="max-w-sm truncate">{order.summary}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={order.documentUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Order
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Info className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Court Orders Found</h3>
            <p className="text-muted-foreground">There are no court orders available for your cases at this time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    