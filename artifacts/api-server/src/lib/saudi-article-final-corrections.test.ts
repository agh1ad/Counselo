import assert from 'node:assert/strict';
import test from 'node:test';
import {correctSaudiArticleFinal} from './saudi-article-final-corrections.js';
import {sanitizeRichText} from './blog-input.js';

test('removes unidentified precedent assertion only from the reviewed article',()=>{
 const html='<p><strong>Judicial precedents issued by the commercial courts</strong></p><p><a href="/case-studies">Preserved case reference</a></p>';
 const first=correctSaudiArticleFinal('Penalty-clause-in-saudi','en',html);
 assert.match(first,/no unidentified precedent/);
 assert.ok(first.endsWith('<p><a href="/case-studies">Preserved case reference</a></p>'));
 assert.equal(correctSaudiArticleFinal('unrelated-post','en',html),html);
 assert.equal(correctSaudiArticleFinal('Penalty-clause-in-saudi','en',first),first);
});

test('updated headings retain semantics and Arabic wording after sanitization',()=>{
 const html='<h2>رابعًا: الاتجاه القضائي السعودي في تطبيق الشرط الجزائي.</h2><p>فقرة أخرى محفوظة.</p>';
 const first=sanitizeRichText(correctSaudiArticleFinal('Penalty-clause-in-saudi','ar',html));
 assert.match(first,/<h2>رابعًا: الضوابط النظامية لتطبيق الشرط الجزائي\.<\/h2>/);
 assert.equal(sanitizeRichText(correctSaudiArticleFinal('Penalty-clause-in-saudi','ar',first)),first);
 assert.ok(first.endsWith('<p>فقرة أخرى محفوظة.</p>'));
});
