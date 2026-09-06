import { createHash } from "node:crypto";
import { ARTICLE_CONTEXT, containsPublishingPlaceholder } from "@workspace/api-zod";
import { correctArticleSnippets } from "./article-snippet-corrections.js";
import { correctArticleBody } from "./article-body-corrections.js";
import { CLAIM_EVIDENCE_ARTICLE } from "./article-claim-evidence.js";

type PublicBlogRecord = {
  slug: string;
  bodyEn?: string | null;
  bodyAr?: string | null;
  contentEn?: Array<{ heading?: string; body?: string }> | null;
  seoTitleAr?: string | null;
  seoTitleEn?: string | null;
};

/** Link the existing plain-text bibliography without nesting links or editing attributes. */
function linkPublishedReferences(html: string | null | undefined): string | null | undefined {
  if (!html) return html;
  let anchorDepth = 0;
  return html.split(/(<[^>]+>)/g).map(part => {
    if (part.startsWith("<")) {
      if (/^<a\b/i.test(part)) anchorDepth++;
      if (/^<\/a\b/i.test(part)) anchorDepth = Math.max(0, anchorDepth - 1);
      return part;
    }
    if (anchorDepth) return part;
    return part.replace(/https:\/\/www\.wipo\.int\/wipolex\/ar\/legislation\/details\/10917|https:\/\/arab-ency\.com\.sy\/law(?=\s|$|[.،])/g, url => `<a href="${url}">${url}</a>`);
  }).join("");
}

const CONTRACT_INTERPRETATION_ENGLISH_BODY = `
<p><strong>Contract Interpretation Before Syrian Courts</strong></p>
<p><strong>The legal rules courts use in contractual disputes</strong></p>
<p>Contracts are the foundation of civil and commercial transactions because they define the parties’ rights and obligations. Many disputes, however, arise not because there is no contract, but because the parties disagree about the meaning of its wording or the scope of their mutual obligations.</p>
<p>Syrian civil law therefore gives contract interpretation an important role. Interpretation is intended to identify the parties’ true common intention while preserving contractual stability. It is not a licence for a court to rewrite the agreement.</p>
<h2>What does contract interpretation mean?</h2>
<p>Contract interpretation is the process of determining the true meaning of contractual language and the obligations agreed by the parties when a clause is ambiguous, conflicting or reasonably capable of more than one meaning. Where the wording is clear and admits only one meaning, the starting point is to respect that wording.</p>
<h2>The starting rule: the contract binds the parties</h2>
<p>Syrian civil law starts from the principle that the contract is the law of the parties. It may not be revoked or altered except by mutual agreement or in circumstances permitted by law. Performance must also be consistent with good faith.</p>
<p>A judge does not replace the parties’ intention with a personal view or redraft the bargain. The judicial task is limited to identifying what the parties agreed when interpretation is genuinely necessary. This protects stability in both civil and commercial dealings.</p>
<h2>When may a court interpret a contract?</h2>
<p>Interpretation may become necessary where:</p>
<ul>
  <li>a clause is ambiguous;</li>
  <li>two provisions conflict;</li>
  <li>the wording supports more than one plausible meaning;</li>
  <li>the scope of an obligation is uncertain; or</li>
  <li>the text and the parties’ conduct during performance appear inconsistent.</li>
</ul>
<p>If the contractual language is clear and has only one reasonable meaning, a party should not normally use interpretation to search for a different intention.</p>
<h2>How does a judge identify the intended meaning?</h2>
<h3>1. The parties’ common intention</h3>
<p>The court may look beyond a purely literal reading to identify the common intention that existed when the contract was made. Relevant material can include pre-contract negotiations, correspondence, the parties’ relationship, the commercial purpose of the transaction, conduct after signature and established trade usage.</p>
<h3>2. The contract as a whole</h3>
<p>A clause should not be read in isolation. Each provision is interpreted in the context of the entire contract because removing a sentence from its setting can produce a meaning inconsistent with the agreement as a whole.</p>
<h3>3. The nature of the transaction</h3>
<p>The legal and commercial nature of the contract matters. A construction agreement, sale, agency, investment arrangement and supply contract create different expectations and obligations. The type and purpose of the transaction therefore help define what a disputed clause was meant to achieve.</p>
<h3>4. Custom and established usage</h3>
<p>If the contract does not regulate a point, or its terms do not resolve the issue, an established civil or commercial custom may assist. Any alleged custom must be proved where required and cannot override public order, a mandatory rule or an express agreement between the parties.</p>
<h2>How is unresolved doubt treated?</h2>
<p>If uncertainty remains after the applicable interpretation rules are used, doubt is generally interpreted in favour of the debtor because an obligation is not presumed or expanded without a legal basis. This principle is not absolute. In an adhesion contract, for example, doubt may be interpreted in favour of the adhering party as protection against terms that party did not negotiate.</p>
<h2>Good faith and contractual meaning</h2>
<p>Good faith affects both performance and interpretation. It can exclude a reading that would amount to an abuse of right, impose an obligation inconsistent with the transaction, or give one party an illegitimate advantage at the other’s expense. The facts and the specific contractual setting remain decisive.</p>
<h2>Practical examples</h2>
<p><strong>Delivery “within one month”.</strong> A seller says the period starts on manufacture, while the buyer says it starts when the contract was signed. The court may examine correspondence, purchase orders, prior dealings and commercial usage to identify the parties’ common intention.</p>
<p><strong>Removal of construction waste.</strong> A construction contract does not expressly allocate responsibility after completion. If a settled and applicable practice places that task on the contractor, the practice may help interpret the parties’ obligations, subject to the contract and mandatory law.</p>
<h2>Common drafting problems that cause disputes</h2>
<ul>
  <li>general or undefined wording;</li>
  <li>inaccurate translation;</li>
  <li>conflicting clauses;</li>
  <li>copying a template without adapting it to the transaction;</li>
  <li>failing to define technical terms; and</li>
  <li>omitting the governing law or dispute-resolution mechanism.</li>
</ul>
<p>Clear drafting is the first practical protection against an interpretation dispute.</p>
<h2>How can the risk of disagreement be reduced?</h2>
<ul>
  <li>Use clear and precise legal language.</li>
  <li>Define material commercial and technical terms.</li>
  <li>Avoid wording that reasonably supports several meanings.</li>
  <li>Set out rights, obligations, dates and acceptance procedures in detail.</li>
  <li>Identify the governing law and dispute forum.</li>
  <li>Obtain a legal review before signing a contract of material value or risk.</li>
</ul>
<h2>Conclusion</h2>
<p>Contract interpretation before Syrian courts is intended to reveal the parties’ true common intention, not to replace it. The analysis may consider the clarity of the words, the contract as a whole, good faith, custom, the nature of the transaction and the evidence surrounding formation and performance.</p>
<p>Precise drafting remains the best way to reduce uncertainty. The clearer the rights, duties, dates and remedies, the less room there is for a dispute over meaning.</p>
<p><strong>Notice:</strong> This article is a general overview of contract interpretation under Syrian law and is not advice on a specific case. The outcome may differ according to the contract, facts, evidence, operative law and the competent court’s assessment.</p>
<h2>References</h2>
<ul>
  <li><a href="https://www.wipo.int/wipolex/ar/legislation/details/10917" target="_blank" rel="noopener noreferrer">Syrian Civil Code, Legislative Decree No. 84 of 1949</a>, including the rules concerning contractual force, good-faith performance and interpretation.</li>
  <li><a href="https://arab-ency.com.sy/law" target="_blank" rel="noopener noreferrer">Syrian Legal Encyclopedia</a>, contract theory and contract interpretation.</li>
</ul>`.trim();

/**
 * Repairs a verified legacy production defect at the public read boundary.
 * The database backfill command uses the same replacement so this safety net
 * can later become dormant without changing the published article.
 */
export function repairPublicBlogPost<T extends PublicBlogRecord>(post: T): T {
  // Limit the complete rewrite to the audited duplicate; preserve later CMS authoring.
  if (post.slug === "almswwlyh-alaqdyh-fy-almaamlat-altjaryh"
    && createHash("sha256").update(post.bodyEn ?? "").digest("hex") === "94715648f45be7cbca3ba194d28b87bfe4b9b643c7fe751f150a5ceb9882e823"
    && createHash("sha256").update(post.bodyAr ?? "").digest("hex") === "df0b04549adff1ba949d28804129f520f70a42cef32a467f8158721272df612f") post = {
    ...post,
    ...CLAIM_EVIDENCE_ARTICLE,
    contentEn: [],
    contentAr: [],
    seoTitleEn: CLAIM_EVIDENCE_ARTICLE.titleEn,
    seoTitleAr: CLAIM_EVIDENCE_ARTICLE.titleAr,
    seoDescriptionEn: CLAIM_EVIDENCE_ARTICLE.excerptEn,
    seoDescriptionAr: CLAIM_EVIDENCE_ARTICLE.excerptAr,
  };
  if (post.slug === "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh") {
    const repairs = {
  "titleEn": {
    "before": "When Is a Petition for Reconsideration Accepted? Three Important Judicial Approaches",
    "after": "When Is a Saudi Petition for Reconsideration Accepted?"
  },
  "titleAr": {
    "before": "متى يقبل التماس اعادة النظر؟ ٣ اتجاهات قضائية مهمة.",
    "after": "متى يقبل التماس إعادة النظر في السعودية؟"
  },
  "excerptEn": {
    "before": "Petitions for reconsideration in Saudi Arabia: three judicial rulings explain when a petition may be accepted, particularly where decisive papers or influential new documents emerge.",
    "after": "A review of the cited Saudi rulings on reconsideration, decisive documents and the limits of presenting new evidence after judgment."
  },
  "excerptAr": {
    "before": "التماس إعادة النظر في السعودية: 3 أحكام قضائية توضح متى يُقبل الطلب قراءة قانونية في ثلاثة أحكام سعودية تكشف الحالات التي يمكن أن تؤدي إلى قبول التماس إعادة النظر، خصوصاً عند ظهور أوراق قاطعة أو مستندات جديدة مؤثرة في الحكم. التماس إعادة النظر ليس مر",
    "after": "قراءة في الأحكام السعودية المشار إليها بشأن التماس إعادة النظر والأوراق القاطعة وحدود تقديم أدلة جديدة بعد الحكم."
  },
  "seoTitleAr": {
    "before": "متى يقبل التماس اعادة النظر؟ ٣ اتجاهات قضائية مهمة.",
    "after": "متى يقبل التماس إعادة النظر في السعودية؟"
  },
  "seoDescriptionEn": {
    "before": "Three Saudi judicial rulings explain when petitions for reconsideration may be accepted, especially when decisive or influential new documents emerge.",
    "after": "Saudi reconsideration petitions: assessing decisive documents, the cited rulings and the distinction between new evidence and ordinary disagreement with a judgment."
  },
  "seoDescriptionAr": {
    "before": "التماس إعادة النظر في السعودية: 3 أحكام قضائية توضح متى يُقبل الطلب قراءة قانونية في ثلاثة أحكام سعودية تكشف الحالات التي يمكن أن تؤدي إلى قبول التماس إعادة الن",
    "after": "التماس إعادة النظر في السعودية: تقييم الأوراق القاطعة والأحكام المشار إليها والتمييز بين الدليل الجديد ومجرد الاختلاف مع الحكم."
  }
};
    const record = post as Record<string, unknown>;
    post = { ...post, ...Object.fromEntries(Object.entries(repairs).filter(([key, value]) => record[key] === value.before).map(([key, value]) => [key, value.after])) };
  }
  post = correctArticleSnippets(post);
  const context = ARTICLE_CONTEXT[post.slug];
  if (context) post = {
    ...post,
    relatedServiceSlugs: [context.serviceSlug],
    relatedWorkSlugs: context.relatedWorkSlugs,
    relatedBlogSlugs: context.relatedBlogSlugs ?? [],
    ...(context.categoryEn ? { categoryEn: context.categoryEn, categoryAr: context.categoryAr } : {}),
  };
  if (post.bodyEn || post.bodyAr) post = {
    ...post,
    bodyEn: linkPublishedReferences(correctArticleBody(post.slug, "en", post.bodyEn)),
    bodyAr: linkPublishedReferences(correctArticleBody(post.slug, "ar", post.bodyAr)),
  };
  if (post.slug === "contractual-liability-in-commercial-transactions" && post.seoTitleAr === "المسؤولية العقدية في المعاملات التجارية") {
    return {
      ...post,
      seoTitleAr: "المسؤولية العقدية في المعاملات التجارية: دليل عملي",
    };
  }
  if (post.slug !== "contract-interpretation-syrian-courts" || !containsPublishingPlaceholder(post.bodyEn)) return post;
  return {
    ...post,
    bodyEn: CONTRACT_INTERPRETATION_ENGLISH_BODY,
    contentEn: [],
    seoTitleEn: "Contract Interpretation Before Syrian Courts",
  };
}

export { CONTRACT_INTERPRETATION_ENGLISH_BODY };
