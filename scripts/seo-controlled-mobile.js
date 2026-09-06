async (page) => {
 const routes = __ROUTES__;
 const coldCache = __COLD_CACHE__;
 const cdp = await page.context().newCDPSession(page);
 await page.setViewportSize({width:390,height:844});
 await cdp.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,isMobile:true,mobile:true});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await cdp.send('Network.enable');
 await cdp.send('Network.setCacheDisabled',{cacheDisabled:coldCache});
 await cdp.send('Network.setBlockedURLs',{urls:['*google-analytics.com/*collect*','*analytics.google.com/*collect*']});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750,connectionType:'cellular4g'});
 await page.addInitScript(()=>{
  if (window !== window.top || window.__seoMobile) return;
  localStorage.clear();sessionStorage.clear();
  window.__seoMobile={lcp:null,lcpElement:null,cls:0,longTasks:[],events:[]};let sum=0,start=0,last=0;
  new PerformanceObserver(l=>{for(const e of l.getEntries()){window.__seoMobile.lcp=e.startTime;window.__seoMobile.lcpElement={tag:e.element?.tagName,text:e.element?.textContent?.slice(0,100),url:e.url};}}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries()){if(e.hadRecentInput)continue;if(e.startTime-last>1000||e.startTime-start>5000){sum=0;start=e.startTime;}sum+=e.value;last=e.startTime;window.__seoMobile.cls=Math.max(sum,window.__seoMobile.cls);}}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries())window.__seoMobile.longTasks.push({start:e.startTime,duration:e.duration});}).observe({type:'longtask',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.interactionId)window.__seoMobile.events.push({name:e.name,duration:e.duration,id:e.interactionId});}).observe({type:'event',buffered:true,durationThreshold:16});
 });
 const rows=[];
 for(const route of routes){
  const errors=[]; const handler=e=>errors.push(String(e));page.on('pageerror',handler);
  const row={route,cacheMode:coldCache ? "cold" : "warm-navigation",at:new Date().toISOString(),errors};
  try{
   await page.bringToFront();if(coldCache) await cdp.send('Network.clearBrowserCache');await page.context().clearCookies();
   const response=await page.goto('http://127.0.0.1:24441'+route,{waitUntil:'load',timeout:90000});row.status=response.status();
   await page.waitForTimeout(coldCache ? 3500 : 1400);
   row.load=await page.evaluate(()=>({ ...window.__seoMobile,visibility:document.visibilityState,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,ttfb:performance.getEntriesByType('navigation')[0].responseStart,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,resources:performance.getEntriesByType('resource').map(e=>({url:e.name,start:e.startTime,duration:e.duration,bytes:e.transferSize})).filter(e=>!e.url.includes('collect?'))}));
   const menu=page.getByRole('button',{name:'Open menu',exact:true});
   if(await menu.count()){
    await menu.click({timeout:15000});await page.getByRole('button',{name:'Close menu',exact:true}).waitFor({timeout:15000});
    await page.getByRole('button',{name:'Close menu',exact:true}).click();await menu.waitFor();row.menu='opened-and-closed';
   }else row.menu='not-present';
   const detail=page.locator('main details summary, #root details summary').first();
   if(await detail.count()){
    await detail.scrollIntoViewIfNeeded();await detail.click();
    row.disclosure=await detail.evaluate(e=>e.parentElement.open?'opened':'failed');await detail.click();
   }else row.disclosure='not-present';
   await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(coldCache ? 1000 : 350);
   row.final=await page.evaluate(()=>({cls:window.__seoMobile.cls,events:window.__seoMobile.events,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,contactLinks:[...document.querySelectorAll('a[href]')].filter(a=>/contact|wa.me|tel:/.test(a.getAttribute('href'))).length,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc)}));
  }catch(e){row.failure=String(e);}
  page.off('pageerror',handler);rows.push(row);
 }
 await cdp.detach();return rows;
}
