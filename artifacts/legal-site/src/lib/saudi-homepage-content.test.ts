import assert from 'node:assert/strict';
import test from 'node:test';
import en from '../components/home/saudi/content.en.json';
import ar from '../components/home/saudi/content.ar.json';

test('Saudi homepage retains complete bilingual section and answer coverage', () => {
  assert.equal(en.length,10);
  assert.equal(en.flat().length,129);
  assert.equal(ar.length,en.length);
  en.forEach((section,i)=>{
    assert.equal(ar[i].length,section.length);
    section.forEach((block,j)=>{
      assert.equal(ar[i][j].split('\n').length,block.split('\n').length);
      assert.match(ar[i][j],/[\u0600-\u06ff]/);
    });
  });
  assert.equal(en[8].length,17); // heading plus eight complete question/answer pairs
});
