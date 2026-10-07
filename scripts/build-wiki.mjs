import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'content/wiki');
const read=file=>JSON.parse(fs.readFileSync(path.join(source,file),'utf8'));
const categories=read('categories.json');
const entries=categories.flatMap(c=>read(c.id+'.json'));
const ids=new Set(entries.map(e=>e.id));
if(ids.size!==entries.length)throw Error('Duplicate wiki IDs');
for(const e of entries){
 for(const key of ['id','term','zh','category','summary','detail','sources']){
  if(!e[key]?.length)throw Error(`Wiki entry ${e.id} is missing ${key}`);
 }
 if(!categories.some(c=>c.id===e.category))throw Error(`Unknown wiki category: ${e.category}`);
 for(const id of e.related)if(!ids.has(id))throw Error(`Unknown related term: ${e.id} → ${id}`);
}
const out=path.join(root,'public/blog/guide/wiki');
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'data.js'),'window.WIKI_DATA = '+JSON.stringify({categories,entries}).replace(/</g,'\\u003c')+';\n');
console.log(`Wiki built: ${entries.length} entries.`);
