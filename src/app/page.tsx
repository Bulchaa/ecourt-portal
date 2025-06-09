import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FilePlus2, CalendarDays, Activity, ShieldAlert, ArrowRight } from "lucide-react";

export default function HomePage() {
  const quickLinks = [
    { title: "Submit New Case", href: "/new-case", icon: FilePlus2, description: "Start a new legal proceeding." },
    { title: "View Appointments", href: "/appointments", icon: CalendarDays, description: "Check your upcoming court dates." },
    { title: "Track Your Case", href: "/track-case", icon: Activity, description: "Monitor the status of your case." },
    { title: "File a Complaint", href: "/file-complaint", icon: ShieldAlert, description: "Raise concerns or grievances." },
  ];

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-64 w-full">
          <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Courthouse" 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint="courthouse building"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold font-headline text-white">Welcome to the E-Court Portal</h1>
            <p className="text-lg text-gray-200 mt-2">Your gateway to efficient and accessible justice.</p>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Card key={link.title} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">{link.title}</CardTitle>
                <link.icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={link.href}>
                    Go to {link.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Important Notices</CardTitle>
            <CardDescription>Stay updated with the latest announcements from the court.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">System Maintenance Scheduled</h3>
              <p className="text-sm text-muted-foreground">The portal will be unavailable on July 30th from 2 AM to 4 AM for scheduled maintenance.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">New E-Filing Guidelines</h3>
              <p className="text-sm text-muted-foreground">Please review the updated e-filing guidelines effective August 1st.</p>
            </div>
             <Button variant="link" className="p-0 h-auto">View all notices</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
