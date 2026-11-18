import {
  CONSULTATION_SCOPE,
  type ConsultationPrice,
} from "@workspace/api-zod/browser";
import "./saudi-consultation-price.css";

export function consultationPriceLabel(price: ConsultationPrice, isArabic: boolean): string {
  const currencyAr = { SAR: "ريال سعودي", AED: "درهم إماراتي", USD: "دولار أمريكي" };
  return isArabic ? `${price.amount} ${currencyAr[price.currency]}` : `${price.currency} ${price.amount}`;
}

export function ConsultationPriceCard({ price, isArabic }: { price: ConsultationPrice; isArabic: boolean }) {
  return (
    <section className="saudi-consultation-price" aria-label={isArabic ? "سعر الاستشارة القانونية أونلاين" : "Fixed online consultation fee"} data-consultation-category={price.id} data-consultation-price={price.amount} data-consultation-currency={price.currency}>
      <div className="saudi-consultation-price-heading">
        <div>
          <p className="saudi-consultation-price-label">{isArabic ? "استشارة قانونية مكتوبة أونلاين بسعر ثابت" : "Fixed-price written online legal consultation"}</p>
          <p className="saudi-consultation-price-category">{isArabic ? price.titleAr : price.titleEn}</p>
        </div>
        <p className="saudi-consultation-price-amount"><bdi>{consultationPriceLabel(price, isArabic)}</bdi></p>
      </div>
      <p className="saudi-consultation-price-scope">{CONSULTATION_SCOPE[isArabic ? "ar" : "en"]}</p>
    </section>
  );
}
