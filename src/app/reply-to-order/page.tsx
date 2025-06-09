
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
import { SendHorizonal, UploadCloud } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  orderNumber: z.string().min(3, "Order Number must be at least 3 characters"),
  replyDetails: z.string().min(10, "Reply details must be at least 10 characters"),
  submissionDate: z.string(),
  replyFile: z.any().optional(),
});

export default function ReplyToOrderPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: "",
      replyDetails: "",
      submissionDate: new Date().toISOString().split('T')[0],
      replyFile: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      title: "Reply Sent",
      description: `Reply for order ${values.orderNumber} has been submitted.`,
    });
    form.reset();
    form.setValue("submissionDate", new Date().toISOString().split('T')[0]);
  }
  
  useEffect(() => {
    if (!form.getValues("submissionDate")) {
      form.setValue("submissionDate", new Date().toISOString().split('T')[0]);
    }
  }, [form]);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SendHorizonal className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Send Reply to Court Order</CardTitle>
        </div>
        <CardDescription>Complete the form to send your reply regarding a court order.</CardDescription>
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
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Court Order Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the Court Order Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="replyDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Reply</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide your detailed reply to the court order" {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="replyFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Supporting File (Optional)</FormLabel>
                  <FormControl>
                     <div className="flex items-center gap-2">
                        <UploadCloud className="h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="file" 
                          onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                          className="border-dashed border-2 p-2"
                        />
                      </div>
                  </FormControl>
                   <FormDescription>Attach any relevant document for your reply.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending Reply..." : "Send Reply"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

    