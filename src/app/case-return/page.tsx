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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SendHorizonal } from "lucide-react";

const formSchema = z.object({
  caseId: z.string().min(5, "Case ID must be at least 5 characters"),
  returnReason: z.string().min(1, "Reason for return is required"),
  details: z.string().min(10, "Details must be at least 10 characters"),
});

export default function CaseReturnPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseId: "",
      returnReason: "",
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      title: "Case Return Sent",
      description: `Case return for ID ${values.caseId} has been submitted.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SendHorizonal className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Send Case Return</CardTitle>
        </div>
        <CardDescription>Complete the form to send a case return.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="caseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the Case ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="returnReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Return</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Incorrect Information, Missing Documents" {...field} />
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
                  <FormLabel>Detailed Explanation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide a detailed explanation for the case return" {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending..." : "Send Return"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
