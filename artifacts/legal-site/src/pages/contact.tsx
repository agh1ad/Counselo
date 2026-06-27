import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service area"),
  message: z.string().min(10, "Please provide a brief overview of your situation")
});

export default function Contact() {
  const { toast } = useToast();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultService = searchParams.get("service") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: defaultService,
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send data to an API
    console.log(values);
    toast({
      title: "Consultation Request Received",
      description: "Our intake team will contact you within 24 hours.",
    });
    form.reset();
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 60% 50%, hsl(38 70% 20% / 0.3) 0%, transparent 70%), linear-gradient(135deg, hsl(220 30% 8%) 0%, hsl(220 25% 12%) 100%)" }} />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Contact Us</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discreet, authoritative counsel is a message away. Schedule your secure consultation with a Lexora Legal partner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Contact Information */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-bold text-white mb-8">Firm Details</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0 border border-border">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">New York Headquarters</h4>
                      <p className="text-muted-foreground leading-relaxed">100 Legal Plaza, Suite 400<br />New York, NY 10001<br />United States</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0 border border-border">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Direct Line</h4>
                      <p className="text-muted-foreground leading-relaxed">+1 (800) LEXORA-LAW<br />+1 (212) 555-0199 (Intl)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0 border border-border">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Electronic Mail</h4>
                      <p className="text-muted-foreground leading-relaxed">consult@lexoralegal.com<br />press@lexoralegal.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0 border border-border">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Operating Hours</h4>
                      <p className="text-muted-foreground leading-relaxed">Monday - Friday<br />8:00 AM - 6:00 PM EST<br /><span className="text-xs italic mt-1 block">Emergency counsel available 24/7 for existing clients.</span></p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card border border-border p-8 md:p-12"
              >
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Request Consultation</h3>
                <p className="text-muted-foreground mb-8">All information submitted is strictly confidential.</p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" className="bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 000-0000" type="tel" className="bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Practice Area of Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background border-border rounded-none focus:ring-primary">
                                  <SelectValue placeholder="Select a practice area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="family-law">Family Law</SelectItem>
                                <SelectItem value="business-law">Business & Corporate Law</SelectItem>
                                <SelectItem value="criminal-defense">Criminal Defense</SelectItem>
                                <SelectItem value="real-estate">Real Estate Law</SelectItem>
                                <SelectItem value="immigration">Immigration Law</SelectItem>
                                <SelectItem value="personal-injury">Personal Injury</SelectItem>
                                <SelectItem value="employment-law">Employment Law</SelectItem>
                                <SelectItem value="other">Other / Not Sure</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Brief Description of Your Matter</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide a brief overview without sharing highly sensitive details before attorney-client privilege is established." 
                              className="min-h-[150px] bg-background border-border rounded-none focus-visible:ring-primary resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full py-6 text-lg rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                      Submit Request
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Submitting this form does not establish an attorney-client relationship.
                    </p>
                  </form>
                </Form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
