import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";

type Decision = {
  id: string;
  caseId: string;
  decisionDate: string;
  summary: string;
  documentUrl: string; // Placeholder for download link
};

const decisions: Decision[] = [
  { id: "DEC001", caseId: "CASEX0123", decisionDate: "2024-07-20", summary: "Judgement in favor of the plaintiff.", documentUrl: "/path/to/decision001.pdf" },
  { id: "DEC002", caseId: "CASEY0456", decisionDate: "2024-07-22", summary: "Case dismissed due to lack of evidence.", documentUrl: "/path/to/decision002.pdf" },
  { id: "DEC003", caseId: "CASEZ0789", decisionDate: "2024-06-15", summary: "Settlement reached between parties.", documentUrl: "/path/to/decision003.pdf" },
];

export default function DecisionsPage() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Court Decisions</CardTitle>
        </div>
        <CardDescription>View and download decisions related to your cases.</CardDescription>
      </CardHeader>
      <CardContent>
        {decisions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Decision Date</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {decisions.map((decision) => (
              <TableRow key={decision.id}>
                <TableCell>{decision.caseId}</TableCell>
                <TableCell>{decision.decisionDate}</TableCell>
                <TableCell className="max-w-sm truncate">{decision.summary}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={decision.documentUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
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
            <h3 className="text-xl font-semibold">No Decisions Found</h3>
            <p className="text-muted-foreground">There are no decisions available for your cases at this time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
