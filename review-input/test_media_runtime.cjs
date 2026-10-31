// Exercise the actual embed script with stalled/failed third-party responses.
const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const code=readFileSync(__dirname+'/review-media.js','utf8');
function element(){return {dataset:{},children:[],textContent:'',setAttribute(){},append(...xs){this.children.push(...xs)},replaceChildren(...xs){this.children=xs},remove(){this.removed=true},closest(){return null}}}
async function run(mode){
 const host=element();host.dataset.x='123';let callback;
 const document={scripts:[],documentElement:{dataset:{tema:'lys'}},createElement:element,querySelectorAll:s=>s==='[data-x]'?[host]:[],addEventListener(){}};
 const twttr={ready:r=>{if(mode!=='ready-stall')r()},widgets:{createTweet:()=>mode==='null'?Promise.resolve(null):mode==='reject'?Promise.reject(Error('network')):mode==='success'?Promise.resolve({}):new Promise(()=>{})}};
 const context={document,window:{twttr},IntersectionObserver:class{constructor(f){callback=f}observe(){}unobserve(){}},setTimeout:(fn,ms)=>setTimeout(fn,Math.min(ms,15)),clearTimeout};
 vm.runInNewContext(code,context);callback([{isIntersecting:true,target:host}]);
 await new Promise(r=>setTimeout(r,40));
 assert.equal(host.dataset.loading,undefined,mode);
 if(mode==='success')assert.equal(host.dataset.loaded,'true');
 else{assert.match(host.children[0].textContent,/åbne originalen på X/);assert.equal(host.children[1].removed,true);assert.equal(host.dataset.loaded,undefined)}
}
(async()=>{for(const mode of ['success','null','reject','ready-stall','render-stall'])await run(mode);console.log('5 embed runtime cases passed')})().catch(e=>{console.error(e);process.exitCode=1});
