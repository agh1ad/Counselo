import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareArticleHtml, readingSearchKey } from './article-reading';
test('reading cleanup removes only repeated title and empty paragraphs', () => {
  const analysis = '<p>Notice may be required, subject to exceptions.</p><h2>Exceptions</h2><p><a href="https://example.com/source">Source</a></p><table><tr><td>Rule</td></tr></table><p><img src="/evidence.png" /></p>';
  assert.equal(prepareArticleHtml('<p><br></p><h2><span>Article title</span></h2>' + analysis, 'Article title').replace(/ id="article-section-\d+"/g, ''), analysis);
  assert.equal(prepareArticleHtml('<h2>A different legal question</h2>' + analysis, 'Article title').replace(/ id="article-section-\d+"/g, ''), '<h2>A different legal question</h2>' + analysis);
  assert.equal(prepareArticleHtml(undefined, 'Title'), '');
});
test('Arabic search accepts vowels and alef variants without changing displayed copy', () => {
  assert.equal(readingSearchKey('الأَمَانَة'), readingSearchKey('الامانة'));
});

test('heading targets survive rerenders, preserve existing IDs and avoid collisions', () => {
  const html = '<h2 id="article-section-1">Existing</h2><h3>Notice</h3><p>Analysis.</p>';
  const once = prepareArticleHtml(html, 'Title');
  assert.match(once, /id="article-section-2"/);
  assert.equal(prepareArticleHtml(once, 'Title'), once);
});
