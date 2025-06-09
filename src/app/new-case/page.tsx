
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
import { FilePlus2, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect } from "react";

const formSchema = z.object({
  caseType: z.string().min(1, "Case type is required"),
  applicantName: z.string().min(2, "Applicant name must be at least 2 characters"),
  respondentName: z.string().min(2, "Respondent name must be at least 2 characters"),
  caseDetails: z.string().min(10, "Case details must be at least 10 characters"),
  submissionDate: z.string(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (e.g., +1234567890)"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  addressCity: z.string().min(1, "City is required"),
  addressWoreda: z.string().min(1, "Woreda is required"),
  addressKebele: z.string().min(1, "Kebele is required"),
  documentType: z.string().min(1, "Document type is required"),
  documentFile: z.any().optional(), // For file upload
  dateOfCrime: z.string().optional(),
  estimatedValue: z.string().optional(), // Using string for input, can be parsed to number
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
      submissionDate: new Date().toISOString().split('T')[0],
      phoneNumber: "",
      email: "",
      addressCity: "",
      addressWoreda: "",
      addressKebele: "",
      documentType: "",
      documentFile: undefined,
      dateOfCrime: "",
      estimatedValue: "",
    },
  });

  const watchedCaseType = form.watch("caseType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      title: "Case Submitted",
      description: "Your new case has been successfully submitted.",
    });
    form.reset();
     // Re-initialize submissionDate after reset
    form.setValue("submissionDate", new Date().toISOString().split('T')[0]);
  }

  // Effect to set submissionDate on mount if not already set (e.g. after reset)
  useEffect(() => {
    if (!form.getValues("submissionDate")) {
      form.setValue("submissionDate", new Date().toISOString().split('T')[0]);
    }
  }, [form]);

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
              name="submissionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Submission</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-muted/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      <SelectItem value="other_case_type">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedCaseType === "criminal" && (
              <FormField
                control={form.control}
                name="dateOfCrime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Crime</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchedCaseType && watchedCaseType !== "criminal" && (
              <FormField
                control={form.control}
                name="estimatedValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimate of Accused (Money)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter estimated amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +251912345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Address</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="addressCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressWoreda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Woreda</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter woreda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressKebele"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kebele</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter kebele" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="docx">Word Document (DOCX)</SelectItem>
                      <SelectItem value="image">Image (JPG, PNG)</SelectItem>
                      <SelectItem value="other_doc_type">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="documentFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Document (Optional)</FormLabel>
                  <FormControl>
                     <Input 
                        type="file" 
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                  </FormControl>
                  <FormDescription>
                    Upload relevant supporting document.
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

    