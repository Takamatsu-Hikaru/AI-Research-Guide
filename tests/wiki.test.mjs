import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import '../scripts/build-wiki.mjs';
const base=new URL('../public/blog/guide/wiki/',import.meta.url);
const context=vm.createContext({Intl,console});
context.window=context;context.globalThis=context;
for(const f of ['vendor/minisearch.min.js','data.js','search.js'])vm.runInContext(fs.readFileSync(new URL(f,base),'utf8'),context);
test('wiki lookup handles abbreviations, aliases, typos and Chinese',()=>{
 const {entries,categories}=context.WIKI_DATA;
 const engine=context.WikiSearch.createSearch(entries,categories);
 for(const [query,id] of [['ckpt','checkpoint'],['nips','neurips'],['tpmai','tpami'],['harnes','agent-harness'],['model based','model-based-rl'],['检查点','checkpoint']]){
  const matches=engine.search(query);
  assert.ok(matches.slice(0,3).some(e=>e.id===id),query);
 }
});
test('wiki introduction uses the requested wording',()=>{
 const html=fs.readFileSync(new URL('index.html',base),'utf8');
 assert.ok(html.includes('在这里查询你没听懂或者感兴趣的术语吧。'));
 assert.ok(!html.includes('total-count'));
});
