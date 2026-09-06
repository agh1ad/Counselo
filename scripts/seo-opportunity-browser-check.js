async (page) => {
 const origin='http://127.0.0.1:24441';
 await page.bringToFront(); await page.setViewportSize({width:390,height:844});
 await page.addInitScript(()=>{window.__opportunityCls=0;let total=0,start=0,last=0;new PerformanceObserver(list=>{for(const e of list.getEntries()){if(e.hadRecentInput)continue;if(e.startTime-last>1000||e.startTime-start>5000){total=0;start=e.startTime;}total+=e.value;last=e.startTime;window.__opportunityCls=Math.max(window.__opportunityCls,total);}}).observe({type:'layout-shift',buffered:true});});
 await page.goto(origin+'/legal-library');
 const errors=[];const onError=e=>errors.push({route:page.url(),message:String(e)});page.on('pageerror',onError);
 const rows=[];
 const routes=['/legal-library','/ar/legal-library','/blog','/blog/ar','/our-work','/ar/our-work','/blog/en/contract-interpretation-syrian-courts','/blog/ar/contract-interpretation-syrian-courts','/our-work/ray-qanwny-fy-tlb-aflas','/ar/our-work/ray-qanwny-fy-tlb-aflas'];
 for(const preference of ['sa','syr','uae']){
  await page.evaluate(value=>localStorage.setItem('counselo-shared-region',value),preference);
  for(const route of routes){
   await page.goto(origin+route,{waitUntil:'load'});await page.waitForTimeout(1200);
   const expectedRegion=route.includes('/contract-interpretation-syrian-courts')?'syr':route.includes('/ray-qanwny-fy-tlb-aflas')?'sa':preference;
   rows.push({route,preference,expectedRegion,...await page.evaluate(pref=>({language:document.documentElement.lang,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,cls:window.__opportunityCls,visibility:document.visibilityState,correctRegionContact:[...document.querySelectorAll('a[href]')].some(a=>a.getAttribute('href')===`/${pref}${document.documentElement.lang==='ar'?'/ar':''}/contact`),readingLinks:document.querySelectorAll('#reading-by-question a').length,hydratingShell:document.querySelector('#root')?.getAttribute('data-ssr')==='true'}),expectedRegion)});
  }
 }
 page.off('pageerror',onError);return {rows,errors};
}
