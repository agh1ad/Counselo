import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
    console.log(values);
    toast({
      title: "Consultation Request Received",
      description: "Our intake team will contact you within 24 hours.",
    });
    form.reset();
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero — dark green */}
      <section className="relative py-28 border-b border-border">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 60% 50%, hsl(150 60% 25% / 0.4) 0%, transparent 60%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Contact Us</h1>
            <div className="w-20 h-1 bg-white/40 mx-auto mb-8" />
            <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              Discreet, authoritative counsel is a message away. Schedule your secure consultation with a Adlix partner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Contact Information */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8">Firm Details</h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">New York Headquarters</h4>
                      <p className="text-muted-foreground leading-relaxed">100 Legal Plaza, Suite 400<br />New York, NY 10001<br />United States</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">Main Line</h4>
                      <p className="text-muted-foreground">+1 (800) ADLIX-LAW</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">Email</h4>
                      <p className="text-muted-foreground">consult@adlix.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">Office Hours</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Mon–Fri: 8:00 AM – 7:00 PM EST<br />
                        Sat: 9:00 AM – 2:00 PM EST<br />
                        Sun: By appointment only
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Consultation Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border p-10"
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Request a Consultation</h3>
                <div className="w-12 h-1 bg-primary mb-8" />

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} className="border-border focus:border-primary" />
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
                            <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} className="border-border focus:border-primary" />
                            </FormControl>
                            <FormMessage />
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
                            <FormLabel className="text-foreground font-medium">Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 (555) 000-0000" {...field} className="border-border focus:border-primary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Practice Area</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-border">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="family-law">Family Law</SelectItem>
                                <SelectItem value="business-law">Business & Corporate Law</SelectItem>
                                <SelectItem value="criminal-defense">Criminal Defense</SelectItem>
                                <SelectItem value="real-estate">Real Estate Law</SelectItem>
                                <SelectItem value="immigration">Immigration Law</SelectItem>
                                <SelectItem value="personal-injury">Personal Injury</SelectItem>
                                <SelectItem value="employment-law">Employment Law</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">Brief Description of Your Matter</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide a brief overview of your legal situation..."
                              className="min-h-[140px] border-border focus:border-primary resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full py-6 text-lg rounded-none bg-primary text-white hover:bg-primary/90">
                      Submit Consultation Request
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      All submissions are confidential. A member of our team will respond within 24 hours.
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
