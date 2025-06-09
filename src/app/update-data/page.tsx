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
import { UserCog } from "lucide-react";

// This would typically be a server action
async function updateUserDataOnServer(data: z.infer<typeof formSchema>) {
  console.log("Updating data on server:", data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate success/failure
  if (Math.random() > 0.1) { // 90% success rate
    return { success: true, message: "Data updated successfully." };
  } else {
    return { success: false, message: "Failed to update data. Please try again." };
  }
}

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required. This would typically be pre-filled or from auth."),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
  email: z.string().email("Invalid email address").optional(),
  otherInformation: z.string().optional(),
}).refine(data => data.address || data.phoneNumber || data.email || data.otherInformation, {
  message: "At least one field must be filled to update.",
  path: ["address"], // Show error near the first optional field or a general error field
});

export default function UpdateDataPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "USER123", // Example: pre-filled for an authenticated user
      address: "",
      phoneNumber: "",
      email: "",
      otherInformation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Client-side logic to connect to server (via server action)
    const result = await updateUserDataOnServer(values);
    
    if (result.success) {
      toast({
        title: "Data Update Successful",
        description: result.message,
      });
      form.reset({ ...form.getValues(), address: "", phoneNumber: "", email: "", otherInformation: "" }); // Reset only fields that were updated, keep userId
    } else {
      toast({
        title: "Data Update Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserCog className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Update Personal Information</CardTitle>
        </div>
        <CardDescription>
          Update your personal or case-related data. Enter your User ID and the information you wish to change.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your User ID" {...field} disabled />
                  </FormControl>
                  <FormDescription>Your unique identifier (typically pre-filled).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new street address, city, state, zip" {...field} />
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
                  <FormLabel>New Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new phone number (e.g., +1234567890)" {...field} />
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
                  <FormLabel>New Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter new email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Information to Update (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Specify any other changes" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {form.formState.errors.root && (
              <FormMessage>{form.formState.errors.root.message}</FormMessage>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update Data"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
