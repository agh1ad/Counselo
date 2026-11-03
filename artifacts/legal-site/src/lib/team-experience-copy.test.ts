import assert from "node:assert/strict";
import test from "node:test";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { enSyr } from "../translations/en-syr";
import { arSyr } from "../translations/ar-syr";
import { enUae } from "../translations/en-uae";
import { arUae } from "../translations/ar-uae";
import { aboutContent } from "../components/about/about-content";

const personalExperience = /Omar Al-Baghdadi|عمر البغدادي|1996|30\+|20,000|three decades|ثلاثة عقود/;
const team = /team|فريق/i;

test("all regional translation experience notes describe the team without inheriting personal career claims", () => {
  for (const [locale, copy] of Object.entries({ en, ar, enSyr, arSyr, enUae, arUae })) {
    let notes = 0;
    const walk = (value: unknown, path = "") => {
      if (!value || typeof value !== "object") return;
      for (const [key, item] of Object.entries(value)) {
        const location = `${locale}:${path}.${key}`;
        if ((key === "experienceNote" || key === "experienceBadge") && typeof item === "string") {
          assert.match(item, team, location);
          assert.doesNotMatch(item, personalExperience, location);
          assert.doesNotMatch(item, /undefined|\[object Object\]/, location);
          notes++;
        } else walk(item, `${path}.${key}`);
      }
    };
    walk(copy);
    assert.ok(notes > 20, `${locale}: expected complete service coverage`);
    for (const text of [copy.home.about.p1, copy.home.hero.subDesc, copy.aboutPage.seoDesc]) {
      assert.match(text, team, locale);
      assert.doesNotMatch(text, personalExperience, locale);
    }
  }
});

test("About keeps platform expertise separate from the founder's personal biography", () => {
  for (const copy of Object.values(aboutContent)) {
    assert.match(copy.team, team);
    assert.doesNotMatch(copy.team, personalExperience);
    assert.match(copy.founderExperience, /1996/);
  }
});
