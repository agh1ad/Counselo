import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness } from "lucide-react";
import { Link } from "wouter";
import "./home-latest-content.css";

export type HomeContentItem = {
  href: string;
  title: string;
  summary: string;
  category: string;
  meta: string;
  isArabic: boolean;
};

export function HomeLatestContent({ isArabic, posts, work }: {
  isArabic: boolean;
  posts: HomeContentItem[];
  work: HomeContentItem[];
}) {
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const panels = [
    { key: "articles", icon: BookOpen, title: isArabic ? "أحدث المقالات" : "Latest articles", href: isArabic ? "/blog/ar" : "/blog", link: isArabic ? "جميع المقالات" : "All articles", items: posts },
    { key: "work", icon: BriefcaseBusiness, title: isArabic ? "أعمالنا المنشورة" : "Published work", href: isArabic ? "/ar/our-work" : "/our-work", link: isArabic ? "جميع الأعمال" : "All work", items: work },
  ];

  return <section className="home-latest" aria-labelledby="latest-content-heading" dir={isArabic ? "rtl" : "ltr"}>
    <div className="home-latest__inner">
      <header className="home-latest__heading">
        <div>
          <p className="home-latest__eyebrow">{isArabic ? "من فريق كاونسلو" : "From the CounselO team"}</p>
          <h2 id="latest-content-heading">{isArabic ? "معرفة قانونية. ورؤية عملية." : "Legal insight. Practical perspective."}</h2>
          <p className="home-latest__intro">{isArabic ? "اطّلع على أحدث مقالاتنا ونماذج أعمالنا المنشورة." : "Explore our latest articles and published work."}</p>
        </div>
        <Link className="home-latest__library" href={isArabic ? "/ar/legal-library" : "/legal-library"}>{isArabic ? "المكتبة القانونية" : "Legal library"}<Arrow size={18} aria-hidden="true" /></Link>
      </header>
      <div className="home-latest__grid">
        {panels.map(({ key, icon: Icon, title, href, link, items }) => <section key={key} className={`home-latest-panel home-latest-panel--${key}`} aria-labelledby={`home-latest-${key}`}>
          <div className="home-latest-panel__heading">
            <h3 id={`home-latest-${key}`}><Icon size={23} aria-hidden="true" />{title}</h3>
            <Link href={href}>{link}<Arrow size={16} aria-hidden="true" /></Link>
          </div>
          {items.length > 0 ? <ul className="home-latest-list">
            {items.slice(0,3).map((item, index) => {
              const ItemArrow = item.isArabic ? ArrowLeft : ArrowRight;
              return <li key={item.href} className={index === 0 ? "home-latest-item home-latest-item--featured" : "home-latest-item"} dir={item.isArabic ? "rtl" : "ltr"}>
                <Link href={item.href} aria-label={item.title}>
                  <div className="home-latest-item__copy">
                    <span className="home-latest-item__category">{item.category}</span>
                    <h4 dir="auto">{item.title}</h4>
                    {index === 0 && <><p dir="auto">{item.summary}</p>{item.meta && <span className="home-latest-item__meta">{item.meta}</span>}</>}
                  </div>
                  <ItemArrow className="home-latest-item__arrow" size={20} aria-hidden="true" />
                </Link>
              </li>;
            })}
          </ul> : <p className="home-latest-panel__empty">{isArabic ? "تصفّح المكتبة للاطلاع على المحتوى القانوني المتاح." : "Browse the library for available legal content."}</p>}
        </section>)}
      </div>
    </div>
  </section>;
}
