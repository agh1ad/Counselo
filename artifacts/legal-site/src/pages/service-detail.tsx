import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";

const serviceData: Record<string, any> = {
  "family-law": {
    title: "Family Law",
    subtitle: "Protecting what matters most with discretion and resolve.",
    overview: "Family law requires a delicate balance of aggressive advocacy and emotional intelligence. At Lexora Legal, we understand that family disputes are among the most stressful experiences our clients face. We provide strategic, clear-headed counsel to protect your assets, your relationship with your children, and your future.",
    covers: [
      "High-Net-Worth Divorce & Asset Tracing",
      "Contentious Child Custody Disputes",
      "Prenuptial & Postnuptial Agreements",
      "Alimony & Spousal Support Negotiation",
      "Complex Adoption Proceedings"
    ],
    process: [
      { title: "Initial Strategy Session", desc: "A confidential review of your situation to identify immediate vulnerabilities and long-term goals." },
      { title: "Asset & Case Analysis", desc: "Meticulous documentation and forensic accounting to build an unshakeable foundation." },
      { title: "Strategic Negotiation", desc: "Attempting resolution from a position of strength to avoid unnecessary public litigation." },
      { title: "Aggressive Litigation", desc: "When settlement fails, we proceed to court with overwhelming preparation and focus." }
    ]
  },
  "business-law": {
    title: "Business & Corporate Law",
    subtitle: "Strategic legal architecture for modern enterprises.",
    overview: "In today's regulatory environment, a misstep in corporate structuring or contract drafting can cost millions. Lexora Legal acts as outside general counsel to dynamic startups and established enterprises, providing the sophisticated legal architecture required to scale aggressively and safely.",
    covers: [
      "Corporate Formation & Restructuring",
      "Mergers, Acquisitions & Buyouts",
      "Complex Commercial Contracts",
      "Intellectual Property Strategy",
      "Regulatory Compliance Audits"
    ],
    process: [
      { title: "Corporate Audit", desc: "Comprehensive review of your current legal structure, identifying immediate exposure." },
      { title: "Strategic Alignment", desc: "Drafting foundational documents that align perfectly with your business objectives." },
      { title: "Transaction Execution", desc: "Negotiating and closing critical deals with meticulous attention to detail." },
      { title: "Ongoing Counsel", desc: "Proactive legal oversight to prevent disputes before they materialize." }
    ]
  },
  "criminal-defense": {
    title: "Criminal Defense",
    subtitle: "Uncompromising defense when everything is on the line.",
    overview: "The weight of the state's resources against an individual is terrifying. Our criminal defense practice is built on leveling that playing field. Led by former prosecutors, we anticipate the government's strategy and systematically dismantle their case. Your freedom and reputation are our absolute priority.",
    covers: [
      "White-Collar & Financial Crimes",
      "Federal Felony Defense",
      "DUI & Serious Traffic Offenses",
      "Drug Trafficking & Possession",
      "Pre-Indictment Investigations"
    ],
    process: [
      { title: "Immediate Intervention", desc: "Interceding before charges are filed to prevent indictment when possible." },
      { title: "Independent Investigation", desc: "Deploying our own investigators to uncover evidence the prosecution missed or ignored." },
      { title: "Pre-Trial Motions", desc: "Aggressive motion practice to suppress illegally obtained evidence." },
      { title: "Trial Defense", desc: "Commanding courtroom advocacy designed to secure acquittals." }
    ]
  },
  "real-estate": {
    title: "Real Estate Law",
    subtitle: "Securing and protecting high-value property transactions.",
    overview: "Real estate transactions involve massive capital and complex regulations. A single overlooked clause can unravel a deal or lead to years of litigation. Lexora Legal brings exacting precision to commercial and residential real estate, ensuring your investments are legally sound and fiercely protected.",
    covers: [
      "Commercial Lease Negotiation",
      "High-Value Residential Closings",
      "Zoning & Land Use Disputes",
      "Construction Defect Litigation",
      "Complex Landlord-Tenant Disputes"
    ],
    process: [
      { title: "Due Diligence", desc: "Exhaustive review of title, zoning, and encumbrances to ensure a clean transaction." },
      { title: "Contract Drafting", desc: "Creating airtight agreements that anticipate and neutralize future disputes." },
      { title: "Closing Execution", desc: "Flawless management of the transaction timeline and escrow mechanics." },
      { title: "Litigation Strategy", desc: "Swift, decisive action when real estate disputes cannot be resolved via negotiation." }
    ]
  },
  "immigration": {
    title: "Immigration Law",
    subtitle: "Strategic navigation of a complex federal bureaucracy.",
    overview: "U.S. Immigration law is a labyrinth of shifting policies and rigid deadlines. Whether securing critical international talent for your corporation or fighting to keep your family together, Lexora Legal provides clear, authoritative guidance through a system designed to be confusing.",
    covers: [
      "Employment-Based Visas (H-1B, L-1, O-1)",
      "Investor Visas (EB-5, E-2)",
      "Family-Based Green Cards",
      "Deportation & Removal Defense",
      "Asylum & Refugee Applications"
    ],
    process: [
      { title: "Eligibility Assessment", desc: "A realistic, unvarnished evaluation of your immigration options." },
      { title: "Strategic Planning", desc: "Charting the fastest, most secure path to your desired immigration status." },
      { title: "Meticulous Preparation", desc: "Compiling exhaustive documentation to preempt requests for evidence (RFEs)." },
      { title: "Agency Interface", desc: "Acting as your unwavering advocate before USCIS, ICE, and immigration courts." }
    ]
  },
  "personal-injury": {
    title: "Personal Injury",
    subtitle: "Relentless pursuit of justice following devastating harm.",
    overview: "When you are injured by negligence, insurance companies deploy massive resources to minimize your compensation. Lexora Legal counters with overwhelming preparation and trial readiness. We do not accept lowball settlements; we demand full restitution for your suffering, lost wages, and future care.",
    covers: [
      "Catastrophic Injury Litigation",
      "Medical Malpractice",
      "Wrongful Death Claims",
      "Commercial Trucking Accidents",
      "Defective Product Liability"
    ],
    process: [
      { title: "Immediate Preservation", desc: "Securing critical evidence before it disappears or is destroyed." },
      { title: "Medical Coordination", desc: "Ensuring you receive top-tier care while documenting the full extent of your injuries." },
      { title: "Demand & Negotiation", desc: "Presenting an unassailable demand backed by expert testimony and economic analysis." },
      { title: "Trial Execution", desc: "Taking the fight to a jury when insurers refuse to offer fair compensation." }
    ]
  },
  "employment-law": {
    title: "Employment Law",
    subtitle: "Protecting professional reputations and enforcing corporate accountability.",
    overview: "The balance of power in the workplace is inherently unequal. Lexora Legal exists to correct that imbalance. We represent executives negotiating complex severance packages and aggressively litigate claims of systemic discrimination, retaliation, and wrongful termination against major corporations.",
    covers: [
      "Executive Severance Negotiation",
      "Wrongful Termination Litigation",
      "Workplace Discrimination & Harassment",
      "Non-Compete Agreement Disputes",
      "Wage & Hour Class Actions"
    ],
    process: [
      { title: "Claim Evaluation", desc: "Assessing the strength of your case and the potential exposure of the employer." },
      { title: "Evidence Gathering", desc: "Securing communications, performance reviews, and witness statements." },
      { title: "Strategic Leverage", desc: "Using the threat of public litigation to force favorable early settlements." },
      { title: "Federal & State Litigation", desc: "Relentless prosecution of your claims in court or before the EEOC." }
    ]
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const data = serviceData[id];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Service Not Found</h1>
          <Link href="/services" className="text-primary hover:underline">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/services" className="inline-flex items-center text-primary mb-8 hover:underline underline-offset-4 text-sm font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to all services
              </Link>
              
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">{data.title}</h1>
              <p className="text-2xl text-primary font-serif italic mb-10">{data.subtitle}</p>
              
              <div className="prose prose-invert max-w-none mb-16">
                <p className="text-lg text-muted-foreground leading-relaxed drop-cap">
                  {data.overview}
                </p>
              </div>

              <h2 className="text-3xl font-serif font-bold text-white mb-8 border-b border-border pb-4">What We Cover</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-16">
                {data.covers.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-serif font-bold text-white mb-8 border-b border-border pb-4">Our Process</h2>
              <div className="space-y-8">
                {data.process.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== data.process.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-px bg-border -ml-px" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-primary font-serif font-bold text-xl relative z-10">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 bg-card border border-border p-8"
            >
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Need immediate counsel?</h3>
              <div className="w-12 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Time is often the most critical factor in legal matters. Schedule a secure, confidential consultation with our {data.title.toLowerCase()} team today.
              </p>
              <Link href={`/contact?service=${id}`}>
                <Button className="w-full py-6 text-lg rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                  Request Consultation
                </Button>
              </Link>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Or call us directly at:</p>
                <p className="text-white font-mono font-medium text-lg">+1 (800) LEXORA-LAW</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
