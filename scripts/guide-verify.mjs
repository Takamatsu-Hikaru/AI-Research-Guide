// Build-time and test-time verification helpers.
//
// The asset check exists because the second edition sits one directory deeper
// than the first, and three of its asset paths are authored in places the
// templates cannot reach: `../chronicle/*` is written directly inside
// content/guide/{zh,en}/{home,directions}.md, and fieldnotes/guide-directory
// emit `figures/` and `brands/` refs behind an `assets` prefix. A wrong prefix
// is a silent 404 in a browser and invisible in every other check — so resolve
// every local reference against the real filesystem, on the final HTML.
import fs from 'node:fs';
import path from 'node:path';

export function localRefs(html){
 const refs=new Set();
 for(const m of html.matchAll(/\b(?:src|href|poster)="([^"]+)"/g)){
  const v=m[1];
  if(!v||v.startsWith('#')||v.startsWith('data:'))continue;
  if(/^[a-z][a-z0-9+.-]*:/i.test(v))continue;   // http:, https:, mailto:, tel:
  refs.add(v);
 }
 return [...refs];
}

// Returns the references in `html` that do not resolve relative to `pageFile`.
export function missingRefs(pageFile,html){
 const dir=path.dirname(pageFile);
 return localRefs(html).filter(ref=>{
  const clean=decodeURIComponent(ref.split('#')[0].split('?')[0]);
  if(!clean)return false;
  return !fs.existsSync(path.resolve(dir,clean));
 });
}

// Walks every .html under `dir` and throws listing any unresolvable reference.
export function assertAssetsResolve(dir,label){
 const failures=[];
 const walk=d=>{
  for(const entry of fs.readdirSync(d,{withFileTypes:true})){
   const full=path.join(d,entry.name);
   if(entry.isDirectory())walk(full);
   else if(entry.name.endsWith('.html')){
    for(const ref of missingRefs(full,fs.readFileSync(full,'utf8')))
     failures.push(`${path.relative(dir,full)} → ${ref}`);
   }
  }
 };
 walk(dir);
 if(failures.length)throw Error(`Unresolved asset references in ${label} (${failures.length}):\n  ${failures.join('\n  ')}`);
 return true;
}
