import './build-wiki.mjs';
// Second edition of the guide, re-skinned in uestc_ai's visual language
// (warm paper, coral accent, Georgia headings, sidebar + topbar shell).
//
// One content model, two output targets:
//
//   npm run build:uestc
//     → public/blog/guide/guide-uestc/{zh,en}/
//     Lives inside the repo next to the default edition and shares the guide's
//     assets through '../../'. Deployed together with the rest of the site.
//
//   npm run build:uestc:standalone
//     → dist/guide-uestc-guide/{zh,en}/
//     Pages become the package root's zh/ and en/, and every asset they reach
//     for is copied in, so the directory can be deployed on its own (Pages,
//     Netlify, nginx, a file server) with no sibling files.
//
// Content comes from guide-model.mjs, so anchors, the 60 questions, resource
// ids and the search index cannot drift from the default edition.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGuide, validateGuide, buildSearchData, searchDataJs, filename, QUESTIONS } from './guide-model.mjs';
import { pageShell, redirectPage, vercelConfig, ASSETS } from './guide-shell-uestc.mjs';
import { assertAssetsResolve } from './guide-verify.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const guideRoot=path.join(root,'public/blog/guide');
const STANDALONE=process.argv.includes('--standalone');

const out=STANDALONE?path.join(root,'dist/guide-uestc-guide'):path.join(guideRoot,'guide-uestc');
const assets=STANDALONE?'../':ASSETS;
const skin=assets+'guide-uestc.css';

const {manifest,all}=loadGuide(root,assets);
const report=validateGuide(all,manifest);

// Clear stale output, but keep .vercel/ — the Vercel CLI writes its project
// link there, and wiping it would force a re-link on every local deploy.
if(STANDALONE&&fs.existsSync(out))
 for(const entry of fs.readdirSync(out)){
  if(entry==='.vercel')continue;
  fs.rmSync(path.join(out,entry),{recursive:true,force:true});
 }
for(const lang of ['zh','en']){
 fs.mkdirSync(path.join(out,lang),{recursive:true});
 for(const [index,p] of all[lang].entries())
  fs.writeFileSync(path.join(out,lang,filename(p.id)),pageShell({p,pages:all[lang],index,lang,assets,skin}));
}
fs.writeFileSync(path.join(out,'search-data.js'),searchDataJs(buildSearchData(all)));
fs.writeFileSync(path.join(out,'index.html'),redirectPage);

if(STANDALONE){
 // Everything the pages link to, copied to the depth their markup expects.
 // logo.png is deliberately omitted: nothing references it any more, and it is
 // a 2048px / 3.1MB source that no page should be loading.
 for(const dir of ['figures','brands','chronicle','sources','ai4x','wiki'])
  fs.cpSync(path.join(guideRoot,dir),path.join(out,dir),{recursive:true});
 const files=['favicon.png','logo-mark.png','guide.css','fieldnotes.css','guide-motion.css','guide-uestc.css','guide.js','fieldnotes.js','guide-motion.js','ama.js'];
 for(const file of files)fs.copyFileSync(path.join(guideRoot,file),path.join(out,file));
 // GitHub Pages would otherwise run the output through Jekyll.
 fs.writeFileSync(path.join(out,'.nojekyll'),'');
 // Edge redirect for "/" so the root never renders the meta-refresh page.
 fs.writeFileSync(path.join(out,'vercel.json'),vercelConfig);
 // Vercel does serve dotfiles (/.nojekyll comes back 200), so the local state
 // the CLI drops in here — .env.local carries a VERCEL_OIDC_TOKEN — must be
 // excluded explicitly rather than left to the CLI's default ignore list.
 fs.writeFileSync(path.join(out,'.vercelignore'),['# Local Vercel state and CLI scratch, never part of the deployment.','.vercel','.env.local','.gitignore',''].join('\n'));
 fs.writeFileSync(path.join(out,'README.md'),`# AI 科研入门指南 · uestc 版\n\n自包含的静态站点包,直接以本目录为根发布即可。入口:\`zh/index.html\`(\`en/index.html\` 为英文)。\n\n没有任何构建步骤或服务端依赖;所有资源都已在包内。唯一的外部请求是 \`zh/ama.html\` / \`en/ama.html\` 运行时从 GitHub 拉取讨论区数据。\n\n内容由 \`scripts/build-guide-uestc.mjs --standalone\` 从仓库的 \`content/guide\` 生成,不要直接改这里的 HTML。\n`);
}

// Resolve every local src/href/poster against the filesystem, on the emitted
// HTML rather than the templates — this is what catches a wrong asset prefix.
assertAssetsResolve(out,STANDALONE?'standalone package':'guide-uestc edition');

fs.mkdirSync(path.join(root,'work/guide-review'),{recursive:true});
fs.writeFileSync(path.join(root,`work/guide-review/${STANDALONE?'build-uestc-standalone':'build-uestc'}.json`),JSON.stringify({...report,assets,out:path.relative(root,out)},null,2));

const size=STANDALONE?` (${(dirSize(out)/1048576).toFixed(1)} MB on disk)`:'';
console.log(`Guide (uestc skin${STANDALONE?', standalone':''}) built: ${manifest.length} pages × 2 languages; ${QUESTIONS} questions and ${report.resourceEntries.zh} catalog entries per language; asset references resolve${size}.`);
if(STANDALONE)console.log(`  → ${path.relative(root,out)}/  (deploy this directory as the site root)`);

function dirSize(dir){
 let total=0;
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const full=path.join(dir,entry.name);
  total+=entry.isDirectory()?dirSize(full):fs.statSync(full).size;
 }
 return total;
}
