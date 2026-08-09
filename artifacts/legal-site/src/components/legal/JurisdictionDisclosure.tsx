import { BriefcaseBusiness, FileCheck2, Scale, UsersRound } from "lucide-react";
import { useId } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Region } from "@/contexts/RegionContext";

type JurisdictionDisclosureProps = {
  jurisdiction: Region;
  compact?: boolean;
};

type DisclosureCopy = {
  label: string;
  title: string;
  intro: string;
  items: Array<{ title: string; text: string; icon: typeof Scale }>;
};

const copy: Record<Region, { en: DisclosureCopy; ar: DisclosureCopy }> = {
  sa: {
    en: {
      label: "Jurisdiction disclosure",
      title: "Who provides the work, and what is separately scoped",
      intro: "CounselO provides online consultation, document review and preliminary legal analysis for Saudi Arabia matters. The applicable professional and court requirements are confirmed before any service begins.",
      items: [
        { icon: BriefcaseBusiness, title: "Consultation provider", text: "The consultation is provided through CounselO's legal team under the professional direction of Lawyer and Legal Counsel Omar Al-Baghdadi." },
        { icon: FileCheck2, title: "Professional licensing jurisdiction", text: "Saudi-law work is assessed against Saudi professional and procedural requirements. Any reserved activity is assigned to an appropriately licensed Saudi professional or office." },
        { icon: Scale, title: "Court representation", text: "Court filing, attendance and representation in Saudi Arabia are not created by browsing or consultation alone. They require a separate engagement with the professional authorized for that forum." },
        { icon: UsersRound, title: "Cooperating counsel and terms", text: "A cooperating Saudi lawyer or office may be involved where the service requires local rights of audience or another reserved activity. Scope, fees, deliverables and responsible professional may differ by service and are confirmed in the engagement terms." },
      ],
    },
    ar: {
      label: "إفصاح الاختصاص",
      title: "من يقدم العمل وما الذي يحدد بتكليف مستقل",
      intro: "تقدم كاونسلو الاستشارات الإلكترونية ومراجعة المستندات والتحليل القانوني الأولي للمسائل السعودية. ويُتحقق من المتطلبات المهنية والقضائية قبل بدء أي خدمة.",
      items: [
        { icon: BriefcaseBusiness, title: "مقدم الاستشارة", text: "تُقدم الاستشارة من خلال الفريق القانوني في كاونسلو بإشراف المحامي والمستشار القانوني عمر البغدادي." },
        { icon: FileCheck2, title: "اختصاص الترخيص المهني", text: "تُقيّم الأعمال المتعلقة بالقانون السعودي وفق المتطلبات المهنية والإجرائية السعودية. وتُسند الأعمال المحجوزة إلى مهني أو مكتب سعودي مرخص حسب الأصول." },
        { icon: Scale, title: "التمثيل أمام المحاكم", text: "لا ينشئ التصفح أو الاستشارة وحدهما تمثيلاً أو حضوراً أو إيداعاً أمام محكمة سعودية. ويتطلب ذلك تكليفاً مستقلاً مع المهني المخول أمام الجهة المختصة." },
        { icon: UsersRound, title: "المهني المتعاون وشروط العمل", text: "قد يشارك محامٍ أو مكتب سعودي متعاون عندما تتطلب الخدمة حق المرافعة المحلي أو نشاطاً محجوزاً آخر. وقد تختلف النطاقات والرسوم والمخرجات والمهني المسؤول بحسب الخدمة، وتحدد في شروط التكليف." },
      ],
    },
  },
  syr: {
    en: {
      label: "Jurisdiction disclosure",
      title: "Who provides the work, and what is separately scoped",
      intro: "CounselO provides online consultation, document review and preliminary legal analysis for Syria matters. The applicable professional and court requirements are confirmed before any service begins.",
      items: [
        { icon: BriefcaseBusiness, title: "Consultation provider", text: "The consultation is provided through CounselO's legal team under the professional direction of Lawyer and Legal Counsel Omar Al-Baghdadi." },
        { icon: FileCheck2, title: "Professional licensing jurisdiction", text: "Syrian-law work is assessed against Syrian professional and procedural requirements. Any reserved activity is assigned to an appropriately licensed Syrian professional or office." },
        { icon: Scale, title: "Court representation", text: "Court filing, attendance and representation in Syria are not created by browsing or consultation alone. They require a separate engagement with the professional authorized for that forum." },
        { icon: UsersRound, title: "Cooperating counsel and terms", text: "A cooperating Syrian lawyer or office may be involved where the service requires local representation or another reserved activity. Scope, fees, deliverables and responsible professional may differ by service and are confirmed in the engagement terms." },
      ],
    },
    ar: {
      label: "إفصاح الاختصاص",
      title: "من يقدم العمل وما الذي يحدد بتكليف مستقل",
      intro: "تقدم كاونسلو الاستشارات الإلكترونية ومراجعة المستندات والتحليل القانوني الأولي للمسائل السورية. ويُتحقق من المتطلبات المهنية والقضائية قبل بدء أي خدمة.",
      items: [
        { icon: BriefcaseBusiness, title: "مقدم الاستشارة", text: "تُقدم الاستشارة من خلال الفريق القانوني في كاونسلو بإشراف المحامي والمستشار القانوني عمر البغدادي." },
        { icon: FileCheck2, title: "اختصاص الترخيص المهني", text: "تُقيّم الأعمال المتعلقة بالقانون السوري وفق المتطلبات المهنية والإجرائية السورية. وتُسند الأعمال المحجوزة إلى مهني أو مكتب سوري مرخص حسب الأصول." },
        { icon: Scale, title: "التمثيل أمام المحاكم", text: "لا ينشئ التصفح أو الاستشارة وحدهما تمثيلاً أو حضوراً أو إيداعاً أمام محكمة سورية. ويتطلب ذلك تكليفاً مستقلاً مع المهني المخول أمام الجهة المختصة." },
        { icon: UsersRound, title: "المهني المتعاون وشروط العمل", text: "قد يشارك محامٍ أو مكتب سوري متعاون عندما تتطلب الخدمة تمثيلاً محلياً أو نشاطاً محجوزاً آخر. وقد تختلف النطاقات والرسوم والمخرجات والمهني المسؤول بحسب الخدمة، وتحدد في شروط التكليف." },
      ],
    },
  },
  uae: {
    en: {
      label: "Jurisdiction disclosure",
      title: "Who provides the work, and what is separately scoped",
      intro: "CounselO provides online consultation, document review and preliminary legal analysis for United Arab Emirates matters. The relevant Emirate, authority and professional requirements are confirmed before any service begins.",
      items: [
        { icon: BriefcaseBusiness, title: "Consultation provider", text: "The consultation is provided through CounselO's legal team under the professional direction of Lawyer and Legal Counsel Omar Al-Baghdadi." },
        { icon: FileCheck2, title: "Professional licensing jurisdiction", text: "UAE-law work is assessed against the applicable federal, Emirate, mainland or free-zone framework. Any reserved activity is assigned to an appropriately licensed UAE professional or office for the relevant forum." },
        { icon: Scale, title: "Court representation", text: "Court filing, attendance, notarisation and representation in the UAE are not created by browsing or consultation alone. They require a separate engagement with the professional authorized for the relevant forum." },
        { icon: UsersRound, title: "Cooperating counsel and terms", text: "A cooperating UAE lawyer or office may be involved where the service requires local rights of audience or another reserved activity. Scope, fees, deliverables and responsible professional may differ by service and are confirmed in the engagement terms." },
      ],
    },
    ar: {
      label: "إفصاح الاختصاص",
      title: "من يقدم العمل وما الذي يحدد بتكليف مستقل",
      intro: "تقدم كاونسلو الاستشارات الإلكترونية ومراجعة المستندات والتحليل القانوني الأولي للمسائل الإماراتية. ويُتحقق من الإمارة والجهة والمتطلبات المهنية ذات الصلة قبل بدء أي خدمة.",
      items: [
        { icon: BriefcaseBusiness, title: "مقدم الاستشارة", text: "تُقدم الاستشارة من خلال الفريق القانوني في كاونسلو بإشراف المحامي والمستشار القانوني عمر البغدادي." },
        { icon: FileCheck2, title: "اختصاص الترخيص المهني", text: "تُقيّم الأعمال المتعلقة بالقانون الإماراتي وفق الإطار الاتحادي أو المحلي أو البر الرئيسي أو المنطقة الحرة المنطبقة. وتُسند الأعمال المحجوزة إلى مهني أو مكتب إماراتي مرخص للجهة المختصة." },
        { icon: Scale, title: "التمثيل أمام المحاكم", text: "لا ينشئ التصفح أو الاستشارة وحدهما تمثيلاً أو حضوراً أو توثيقاً أو إيداعاً في الإمارات. ويتطلب ذلك تكليفاً مستقلاً مع المهني المخول أمام الجهة المختصة." },
        { icon: UsersRound, title: "المهني المتعاون وشروط العمل", text: "قد يشارك محامٍ أو مكتب إماراتي متعاون عندما تتطلب الخدمة حق المرافعة المحلي أو نشاطاً محجوزاً آخر. وقد تختلف النطاقات والرسوم والمخرجات والمهني المسؤول بحسب الخدمة، وتحدد في شروط التكليف." },
      ],
    },
  },
};

export function JurisdictionDisclosure({ jurisdiction, compact = false }: JurisdictionDisclosureProps) {
  const { lang } = useLanguage();
  const headingId = `jurisdiction-disclosure-${jurisdiction}-${useId().replace(/:/g, "")}`;
  const content = copy[jurisdiction][lang];

  return (
    <section className={`${compact ? "py-10" : "py-14"} border-y border-border bg-card`} aria-labelledby={headingId}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{content.label}</p>
          <h2 id={headingId} className="mb-3 font-serif text-3xl font-bold text-foreground">{content.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{content.intro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-border bg-background p-5">
              <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mb-2 font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
