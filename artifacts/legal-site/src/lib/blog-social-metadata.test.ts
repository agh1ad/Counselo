import assert from "node:assert/strict";
import test from "node:test";
import {
  BLOG_SOCIAL_IMAGE,
  buildBlogSocialMetaTags,
} from "@workspace/api-zod";

test("blog social metadata gives WhatsApp and social crawlers a complete large image card", () => {
  const html = buildBlogSocialMetaTags({
    title: "Contract review & legal guidance",
    description: "A practical article about reviewing commercial contracts.",
    canonical: "https://counselo-legal.com/blog/en/contract-review",
    language: "en",
    reviewerName: "Lawyer and Legal Counsel Omar Al-Baghdadi",
  });

  assert.match(html, /property="og:type" content="article"/);
  assert.match(html, /property="og:locale" content="en_US"/);
  assert.match(html, /property="og:image" content="https:\/\/counselo-legal\.com\/og-image\.png"/);
  assert.match(html, /property="og:image:secure_url"/);
  assert.match(html, /property="og:image:type" content="image\/png"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="twitter:image" content="https:\/\/counselo-legal\.com\/og-image\.png"/);
  assert.match(html, /name="reviewed-by" content="Lawyer and Legal Counsel Omar Al-Baghdadi"/);
  assert.ok(html.includes("Contract review &amp; legal guidance"));
  assert.equal(BLOG_SOCIAL_IMAGE.width / BLOG_SOCIAL_IMAGE.height, 1200 / 630);
});

test("Arabic blog social image alt text includes the Arabic reviewer attribution", () => {
  const html = buildBlogSocialMetaTags({
    title: "مراجعة العقود",
    description: "دليل عملي لمراجعة العقود التجارية.",
    canonical: "https://counselo-legal.com/blog/ar/contract-review",
    language: "ar",
    reviewerName: "المحامي والمستشار القانوني عمر البغدادي",
  });

  assert.match(html, /مقال قانوني من كاونسلو، راجعه المحامي والمستشار القانوني عمر البغدادي/);
  assert.match(html, /property="og:locale" content="ar_SA"/);
});
