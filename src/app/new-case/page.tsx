"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FilePlus2 } from "lucide-react";

const formSchema = z.object({
  caseType: z.string().min(1, "Case type is required"),
  applicantName: z.string().min(2, "Applicant name must be at least 2 characters"),
  respondentName: z.string().min(2, "Respondent name must be at least 2 characters"),
  caseDetails: z.string().min(10, "Case details must be at least 10 characters"),
  supportingDocuments: z.string().optional(), // Simplified for now
});

export default function NewCasePage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseType: "",
      applicantName: "",
      respondentName: "",
      caseDetails: "",
      supportingDocuments: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      title: "Case Submitted",
      description: "Your new case has been successfully submitted.",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FilePlus2 className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">New Case Submission</CardTitle>
        </div>
        <CardDescription>Fill in the details below to submit a new case or application.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="caseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a case type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="civil">Civil Case</SelectItem>
                      <SelectItem value="criminal">Criminal Case</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Applicant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter applicant's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="respondentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Respondent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter respondent's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caseDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide a detailed description of the case" {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supportingDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supporting Documents (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription>
                    Upload any relevant documents. (This is a placeholder file input)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit Case"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
