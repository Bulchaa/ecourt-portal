"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { ShieldAlert } from "lucide-react";

const formSchema = z.object({
  complaintType: z.string().min(1, "Complaint type is required"),
  complainantName: z.string().min(2, "Your name must be at least 2 characters"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  details: z.string().min(20, "Complaint details must be at least 20 characters"),
});

export default function FileComplaintPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaintType: "",
      complainantName: "",
      subject: "",
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      title: "Complaint Filed",
      description: "Your complaint has been successfully filed. You will receive updates on its status.",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">File a Complaint</CardTitle>
        </div>
        <CardDescription>Submit a new complaint using the form below.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="complaintType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Complaint</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complaint type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="procedural_issue">Procedural Issue</SelectItem>
                      <SelectItem value="staff_conduct">Staff Conduct</SelectItem>
                      <SelectItem value="delay_in_process">Delay in Process</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complainantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject of Complaint</FormLabel>
                  <FormControl>
                    <Input placeholder="Briefly describe the subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Complaint</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide a full description of your complaint, including dates, names, and specific incidents." {...field} rows={6}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
             {form.formState.isSubmitting ? "Filing..." : "File Complaint"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
