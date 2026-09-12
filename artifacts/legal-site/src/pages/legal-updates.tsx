import { Link, useLocation } from "wouter";
import { getLegalProblemPage } from "@/lib/legal-problem-pages";
import {
  getServiceDefinition,
  officialSources,
  updateContext,
  updateArchivePath,
  OMAR_OFFICIAL_PROFILE_URL,
  OMAR_CANONICAL_ENTITY_ID,
  legalUpdatesPath,
  legalUpdatesDefaultReviewer,
  updateRegionNames,
  updateRegions,
  updateSections,
  updateSectionLabels,
  type UpdateRegion,
  type LegalUpdate,
} from "@workspace/api-zod/browser";
import {
  useLegalUpdates,
  LegalUpdatesFeed,
} from "@/components/content/legal-updates-feed";
import { SEOHead } from "@/components/seo/SEOHead";
export default function LegalUpdates() {
  const [path] = useLocation();
  const lang = path.split("/").includes("ar") ? "ar" : "en";
  const ar = lang === "ar";
  const context = updateContext(path);
  const region = context?.region;
  const slug = context?.kind === "article" ? context.slug : undefined;
  const page = context?.page || 1;
  const service = context?.service;
  const { data, isLoading, isError } = useLegalUpdates();
  const post = data?.article || undefined;
  const serviceLabel =
    service && region
      ? getServiceDefinition(service, region)?.[ar ? "titleAr" : "titleEn"]
      : undefined;
  const base = updateArchivePath(region, lang);
  const home = region ? `/${region}${ar ? "/ar" : ""}` : ar ? "/ar" : "/";
  const title = post
    ? post.draft[lang].title
    : `${ar ? "المستجدات القانونية" : "Legal Updates"}${region ? ` — ${updateRegionNames[region][lang]}` : ""}${serviceLabel ? ` — ${serviceLabel}` : ""}${page > 1 ? ` — ${ar ? "الصفحة" : "Page"} ${page}` : ""}`;
  const summary = post
    ? post.draft[lang].summary
    : ar
      ? `مستجدات قانونية مختارة ${region ? `في ${updateRegionNames[region].ar}` : "في السعودية والإمارات وسوريا"}${serviceLabel ? ` — ${serviceLabel}` : ""}، مع المصادر الرسمية وتواريخ النفاذ والآثار العملية بعد المراجعة.${page > 1 ? ` الصفحة ${page}.` : ""}`
      : `Selected legal updates ${region ? `in ${updateRegionNames[region].en}` : "across Saudi Arabia, the UAE and Syria"}${serviceLabel ? ` — ${serviceLabel}` : ""}, with official sources, effective dates and reviewed practical implications.${page > 1 ? ` Page ${page}.` : ""}`;
  const canonical = post
    ? legalUpdatesPath(post.region, lang, post.slug)
    : updateArchivePath(region, lang, service, page);
  const alternate = (l: "en" | "ar") =>
    post
      ? legalUpdatesPath(post.region, l, post.slug)
      : updateArchivePath(region, l, service, page);
  const reviewerIsOmar = post?.reviewer === legalUpdatesDefaultReviewer.en;
  const articleUrl = `https://counselo-legal.com${canonical}`;
  const schema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: summary,
        datePublished: post.publishedAt,
        dateModified: post.modifiedAt,
        inLanguage: lang,
        ...(post.editorial?.imageUrl
          ? { image: { "@type": "ImageObject", url: post.editorial.imageUrl } }
          : {}),
        "@id": `${articleUrl}#article`,
        mainEntityOfPage: `https://counselo-legal.com${canonical}`,
        author: {
          "@type": "Organization",
          name: "CounselO Editorial",
          url: "https://counselo-legal.com",
        },
        publisher: {
          "@type": "Organization",
          name: "CounselO",
          "@id": "https://counselo-legal.com/#organization",
          url: "https://counselo-legal.com",
        },
        citation: post.sourceUrl,
        articleSection: post.draft.practiceArea,
        spatialCoverage: {
          "@type": "Place",
          name: updateRegionNames[post.region][lang],
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${articleUrl}#webpage`,
        url: articleUrl,
        name: title,
        description: summary,
        inLanguage: lang,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: (data?.items || []).map((p, i) => ({
            "@type": "ListItem",
            position: (page - 1) * 20 + i + 1,
            url: `https://counselo-legal.com${legalUpdatesPath(p.region, lang, p.slug)}`,
            name: p.draft[lang].title,
          })),
        },
      };
  return (
    <div dir={ar ? "rtl" : "ltr"}>
      <SEOHead
        title={title}
        description={summary}
        ogType={post ? "article" : "website"}
        ogImageUrl={post?.editorial?.imageUrl || undefined}
        ogImageAlt={
          post?.editorial?.[ar ? "imageAltAr" : "imageAltEn"] || undefined
        }
        noIndex={Boolean(slug && !post)}
        reviewedBy={
          post
            ? reviewerIsOmar
              ? legalUpdatesDefaultReviewer[lang]
              : post.reviewer
            : undefined
        }
        articlePublishedTime={post?.publishedAt}
        articleModifiedTime={post?.modifiedAt}
        articleAuthor={post ? "CounselO Editorial" : undefined}
        canonical={canonical}
        noRegionPrefix
        sharedLanguageAlternates={{ en: alternate("en"), ar: alternate("ar") }}
        schema={schema}
        extraSchemas={[
          ...(post
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "@id": `${articleUrl}#webpage`,
                  url: articleUrl,
                  mainEntity: { "@id": `${articleUrl}#article` },
                  ...(reviewerIsOmar
                    ? {
                        reviewedBy: {
                          "@type": "Person",
                          "@id": OMAR_CANONICAL_ENTITY_ID,
                          name: ar ? "عمر البغدادي" : "Omar Baghdadi",
                          jobTitle: ar
                            ? "محامٍ ومستشار قانوني"
                            : "Lawyer and Legal Counsel",
                          url: `${OMAR_OFFICIAL_PROFILE_URL}${ar ? "/ar" : "/"}`,
                        },
                      }
                    : {}),
                },
              ]
            : []),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: ar ? "الرئيسية" : "Home",
                item: `https://counselo-legal.com${home}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: ar ? "المستجدات القانونية" : "Legal Updates",
                item: `https://counselo-legal.com${base}`,
              },
              ...(service
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: serviceLabel,
                      item: `https://counselo-legal.com${updateArchivePath(region, lang, service)}`,
                    },
                  ]
                : []),
              ...(post
                ? [
                    {
                      "@type": "ListItem",
                      position: service ? 4 : 3,
                      name: title,
                      item: `https://counselo-legal.com${canonical}`,
                    },
                  ]
                : []),
            ],
          },
        ]}
      />
      <header className="bg-[#073e32] text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <nav
            className="text-sm text-white/75 mb-8"
            aria-label={ar ? "مسار التنقل" : "Breadcrumb"}
          >
            <Link
              href={region ? `/${region}${ar ? "/ar" : ""}` : ar ? "/ar" : "/"}
            >
              {ar ? "الرئيسية" : "Home"}
            </Link>{" "}
            /{" "}
            <Link href={base}>
              {ar ? "المستجدات القانونية" : "Legal Updates"}
            </Link>
            {serviceLabel && (
              <>
                {" "}
                /{" "}
                <Link href={updateArchivePath(region, lang, service)}>
                  {serviceLabel}
                </Link>
              </>
            )}
            {post && (
              <>
                {" "}
                / <span aria-current="page">{title}</span>
              </>
            )}
          </nav>
          <p
            className={`text-[#dec88d] text-xs mb-4 ${ar ? "" : "uppercase tracking-widest"}`}
          >
            {ar ? "كاونسلو | رصد قانوني" : "CounselO | Legal developments"}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight max-w-4xl">
            {slug && !post
              ? ar
                ? "المستجد غير متاح"
                : "Update unavailable"
              : title}
          </h1>
          <p className="max-w-3xl mt-6 text-white/80 leading-relaxed">
            {summary}
          </p>
        </div>
      </header>
      <nav
        className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-3"
        aria-label={ar ? "الاختصاص القضائي" : "Jurisdiction"}
      >
        {updateRegions.map((r) => (
          <Link
            key={r}
            href={legalUpdatesPath(r, lang)}
            aria-current={r === region ? "page" : undefined}
            className={`border px-4 py-2 rounded-sm ${r === region ? "bg-primary text-white" : "hover:border-primary"}`}
          >
            {updateRegionNames[r][lang]}
          </Link>
        ))}
      </nav>
      {post ? (
        <UpdateArticle post={post} lang={lang} />
      ) : slug ? (
        <p role="status" className="max-w-5xl mx-auto px-6 py-12">
          {isLoading
            ? ar
              ? "جارٍ التحميل…"
              : "Loading…"
            : isError
              ? ar
                ? "تعذّر تحميل المستجد. يرجى المحاولة مجددًا."
                : "The update could not be loaded. Please try again."
              : ar
                ? "هذا المستجد غير منشور أو غير موجود."
                : "This update is unpublished or does not exist."}
        </p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto px-6 text-muted-foreground leading-7">
            <p>{hubDescription(region, ar)}</p>
            <details className="mt-5 border p-4">
              <summary className="cursor-pointer font-medium text-foreground">
                {ar
                  ? "المصادر الرسمية ونطاق الرصد"
                  : "Official sources and coverage"}
              </summary>
              <p className="my-3">
                {ar
                  ? "هذه قائمة المصادر المعتمدة للرصد. قد تتعذر إتاحة بعض المصادر أو تتطلب مراجعة يدوية؛ ولا يعني إدراج جهة تغطية جميع إصداراتها."
                  : "These are the approved sources for discovery. Availability varies and some material requires manual review; listing an authority does not mean every publication is covered."}
              </p>
              <ul className="space-y-2">
                {officialSources
                  .filter((s) => !region || s.region === region)
                  .map((s) => (
                    <li key={s.id}>
                      <a
                        className="underline text-primary"
                        href={s.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {ar ? s.nameAr : s.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </details>
            {region && !!data?.services.length && (
              <nav
                aria-label={ar ? "المجالات القانونية" : "Practice areas"}
                className="flex flex-wrap gap-3 mt-5"
              >
                <Link className="underline" href={base}>
                  {ar ? "جميع المجالات" : "All practice areas"}
                </Link>
                {data.services.map((s) => (
                  <Link
                    key={s}
                    className="underline text-primary"
                    aria-current={s === service ? "page" : undefined}
                    href={updateArchivePath(region, lang, s)}
                  >
                    {getServiceDefinition(s, region)?.[
                      ar ? "titleAr" : "titleEn"
                    ] || s}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          <LegalUpdatesFeed
            region={region}
            isArabic={ar}
            limit={20}
            items={data?.items}
          />
          <nav
            className="max-w-5xl mx-auto px-6 pb-10 flex gap-6"
            aria-label={ar ? "صفحات المستجدات" : "Updates pagination"}
          >
            {page > 1 && (
              <Link
                rel="prev"
                className="underline"
                href={updateArchivePath(region, lang, service, page - 1)}
              >
                {ar ? "الصفحة السابقة" : "Previous page"}
              </Link>
            )}
            {(page > 1 || data?.hasMore) && (
              <span>
                {ar ? "الصفحة" : "Page"} {page}
              </span>
            )}
            {data?.hasMore && (
              <Link
                rel="next"
                className="underline"
                href={updateArchivePath(region, lang, service, page + 1)}
              >
                {ar ? "الصفحة التالية" : "Next page"}
              </Link>
            )}
          </nav>
        </>
      )}
      <aside className="max-w-5xl mx-auto px-6 py-10 border-t border-border text-sm leading-7 text-muted-foreground">
        <h2 className="font-semibold text-foreground">
          {ar ? "منهجية النشر" : "Editorial method"}
        </h2>
        <p>
          {ar
            ? "يراجع فريقنا التحريري المصادر الرسمية ويعدّ المستجدات القانونية للنشر. نميّز بين الإعلان الرسمي والنص التشريعي النافذ، ونوضح ما لم يتأكد بعد. المحتوى معلومات عامة، ولا يغني عن المشورة القانونية بشأن وقائع محددة."
            : "Our editorial team reviews official sources and prepares legal updates for publication. We distinguish official announcements from operative legislation and identify unresolved points. These updates provide general information, not advice on a specific matter."}
        </p>
      </aside>
    </div>
  );
}
function UpdateArticle({
  post,
  lang,
}: {
  post: LegalUpdate;
  lang: "en" | "ar";
}) {
  const ar = lang === "ar";
  const copy = post.draft[lang];
  return (
    <article className="max-w-5xl mx-auto px-6 pb-12">
      <div className="border-y py-5 text-sm text-muted-foreground space-y-2">
        <p>
          {ar
            ? "إعداد: فريق تحرير كاونسلو"
            : "Prepared by the CounselO editorial team"}
        </p>
        <p>
          {ar ? "المراجع" : "Reviewer"}:{" "}
          {post.reviewer === legalUpdatesDefaultReviewer.en ? (
            <a
              className="underline text-primary"
              href={`${OMAR_OFFICIAL_PROFILE_URL}${ar ? "/ar" : "/"}`}
            >
              {legalUpdatesDefaultReviewer[lang]}
            </a>
          ) : (
            post.reviewer
          )}
        </p>
        <p>
          {ar ? "النشر" : "Published"}:{" "}
          <time dateTime={post.publishedAt}>
            {post.publishedAt.slice(0, 10)}
          </time>{" "}
          · {ar ? "آخر تعديل" : "Modified"}:{" "}
          <time dateTime={post.modifiedAt}>{post.modifiedAt.slice(0, 10)}</time>
        </p>
        {post.sourceCheckedAt && (
          <p>
            {ar
              ? "آخر فحص لإتاحة المصدر وتغيّر نصه"
              : "Last source availability/text check"}
            :{" "}
            <time dateTime={post.sourceCheckedAt}>
              {post.sourceCheckedAt.slice(0, 10)}
            </time>{" "}
            {post.sourceCheckStatus === "unavailable"
              ? ar
                ? "— تعذر الوصول إلى المصدر"
                : "— source unavailable"
              : ""}
          </p>
        )}
        <p>
          {ar ? "تاريخ المصدر الرسمي" : "Official source date"}:{" "}
          {post.draft.sourceDate}
        </p>
      </div>
      <div className="max-w-3xl">
        {post.editorial?.imageUrl && (
          <figure className="mt-8">
            <img
              src={post.editorial.imageUrl}
              alt={ar ? post.editorial.imageAltAr : post.editorial.imageAltEn}
              width="1200"
              height="630"
              className="w-full h-auto rounded"
            />
          </figure>
        )}
        {post.editorial?.status === "superseded" && (
          <aside className="border border-amber-300 bg-amber-50 text-amber-950 p-5 mt-6">
            <strong>
              {ar
                ? "تجاوزته مستجدات لاحقة"
                : "Superseded by later developments"}
            </strong>
            <p>
              {ar
                ? "هذا المستجد سجل تاريخي، ويجب الاطلاع على التطورات اللاحقة قبل الاعتماد عليه."
                : "This update is a historical record. Read the later development before relying on it."}
            </p>
            {post.editorial.successorSlug && (
              <Link
                className="underline"
                href={legalUpdatesPath(
                  post.region,
                  lang,
                  post.editorial.successorSlug,
                )}
              >
                {ar ? "اقرأ المستجد اللاحق" : "Read the later update"}
              </Link>
            )}
          </aside>
        )}
        {post.editorial?.correctionEn && (
          <aside className="border-s-4 border-primary ps-5 mt-6">
            <h2 className="font-semibold">
              {ar ? "ملاحظة تحريرية وتصحيح" : "Editorial correction"}
            </h2>
            <p>
              {ar ? post.editorial.correctionAr : post.editorial.correctionEn}
            </p>
          </aside>
        )}
        {!!post.corrections?.length && (
          <details className="mt-6 border p-4">
            <summary>
              {ar
                ? "سجل التصحيحات والمراجعات"
                : "Correction and revision history"}
            </summary>
            <ol className="space-y-4 mt-4">
              {post.corrections.map((c, i) => (
                <li key={`${c.date}-${i}`}>
                  <time dateTime={c.date}>{c.date.slice(0, 10)}</time>
                  <p>{ar ? c.ar : c.en}</p>
                </li>
              ))}
            </ol>
          </details>
        )}
        {post.sourceCheckStatus === "changed" && (
          <p className="mt-6 p-4 bg-amber-50 text-amber-950">
            {ar
              ? "تغيّر المصدر الرسمي منذ المراجعة. يجري التحقق من أثر التغيير؛ يُرجى الرجوع إلى المصدر الحالي."
              : "The official source has changed since review. Its implications need verification; please consult the current source."}
          </p>
        )}
        <p className="mt-6 text-sm text-muted-foreground">
          {ar
            ? "يعرض هذا المستجد الوضع الذي تمت مراجعته بتاريخ نشره أو تعديله؛ لا يُفترض أن غياب مستجد أحدث يعني عدم تغيّر القانون."
            : "This update reflects the position reviewed at publication or revision. The absence of a newer update does not establish that the law is unchanged."}
        </p>
        {updateSections.map((key, i) => (
          <section key={key} className="mt-9">
            <h2 className="font-serif text-2xl mb-3">
              {updateSectionLabels[lang][i]}
            </h2>
            <p className="whitespace-pre-line leading-8 text-foreground/85">
              {copy[key]}
            </p>
          </section>
        ))}
        <section className="mt-10 border-s-4 border-primary ps-5">
          <h2 className="font-semibold">
            {ar
              ? "الأساس القانوني والمصدر الرسمي"
              : "Legal basis and official source"}
          </h2>
          <p className="my-3">{post.draft.instrument}</p>
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {post.sourceName}
          </a>
        </section>
        <section className="mt-10">
          <h2 className="font-serif text-2xl mb-3">
            {ar ? "خدمات قانونية ذات صلة" : "Related legal services"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {post.draft.serviceSlugs.map((slug) => (
              <Link
                key={slug}
                className="text-primary underline"
                href={`/${post.region}${ar ? "/ar" : ""}/services/${slug}`}
              >
                {getServiceDefinition(slug, post.region)?.[
                  ar ? "titleAr" : "titleEn"
                ] || slug}
              </Link>
            ))}
          </div>
          {!!post.editorial?.relatedMatterPaths?.length && (
            <div className="mt-5">
              <h3 className="font-semibold">
                {ar ? "مسائل قانونية ذات صلة" : "Related legal matters"}
              </h3>
              {post.editorial.relatedMatterPaths.map((p) => (
                <Link
                  className="block underline mt-2"
                  key={p}
                  href={
                    ar
                      ? p.replace(`/${post.region}/`, `/${post.region}/ar/`)
                      : p
                  }
                >
                  {getLegalProblemPage(
                    post.region,
                    p.split("/")[3],
                    p.split("/")[4],
                  )?.[ar ? "titleAr" : "titleEn"] ||
                    (ar ? "دليل المسألة القانونية" : "Legal matter guide")}
                </Link>
              ))}
            </div>
          )}
          <Link
            className="inline-block mt-5 border border-primary px-5 py-3 text-primary"
            href={`/${post.region}${ar ? "/ar" : ""}/contact`}
          >
            {ar
              ? "ناقش أثر المستجد على حالتك"
              : "Discuss how this affects your situation"}
          </Link>
        </section>
      </div>
      <LegalUpdatesFeed region={post.region} isArabic={ar} related />
    </article>
  );
}

function hubDescription(region: UpdateRegion | undefined, ar: boolean) {
  if (region === "sa")
    return ar
      ? "مستجدات سعودية مختارة في الشركات والعمل والزكاة والضرائب والأسواق المالية. نبيّن الفرق بين الإعلان الرسمي والتشريع النافذ ونطاق التطبيق وتاريخ النفاذ عندما يكون مؤكدًا. الرصد انتقائي ولا يشمل كل الجهات أو القرارات."
      : "Selected Saudi developments affecting companies, employment, zakat and tax, and capital markets. Each update distinguishes official announcements from operative law and explains scope and confirmed commencement dates. Coverage is selective, not a complete register of authorities or decisions.";
  if (region === "uae")
    return ar
      ? "مستجدات إماراتية مختارة في التشريعات والأعمال والضرائب والتنظيم المالي. يجب التحقق في كل مستجد من نطاقه الاتحادي أو المحلي أو المتعلق بمنطقة حرة؛ ولا يُفترض تطبيقه في جميع الإمارات والمناطق الحرة."
      : "Selected UAE legislative, business, tax and financial-regulatory developments. Each update must identify whether its scope is federal, emirate-specific or limited to a free zone; applicability across all emirates and free zones must not be assumed.";
  if (region === "syr")
    return ar
      ? "مستجدات سورية مختارة انطلاقًا من الإعلانات الرسمية المتاحة. لا يُعامل الإعلان الإعلامي بوصفه النص التشريعي الكامل؛ ونوضح متى يتطلب تاريخ النفاذ أو النطاق أو الأحكام الانتقالية الرجوع إلى أداة قانونية إضافية."
      : "Selected Syrian developments drawn from accessible official announcements. An announcement is not treated as the full legal instrument; updates identify when commencement, scope or transitional provisions require an additional primary legal source.";
  return ar
    ? "تصفح المستجدات بحسب السعودية أو الإمارات أو سوريا، ثم انتقل إلى المجال القانوني المناسب. تُنشر المواد بعد المراجعة، مع روابط المصادر وحدود النطاق؛ ولا يُعد هذا الأرشيف سجلًا شاملًا لكل التغييرات القانونية."
    : "Browse Saudi Arabia, the UAE or Syria, then choose the relevant practice area. Updates are published after review with source links and scope limitations. This archive is not an exhaustive register of legal changes.";
}
