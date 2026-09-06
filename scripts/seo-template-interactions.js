async(page)=>{
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await page.setViewportSize({width:390,height:844});
 const attemptedWrites=[];await page.route('**/api/**',async r=>{if(!['GET','HEAD'].includes(r.request().method())){attemptedWrites.push(r.request().url());await r.abort();}else await r.continue();});
 const rows=[];
 try {
 for(const route of ['/sa/contact','/sa/ar/contact','/syr/contact','/syr/ar/contact','/uae/contact','/uae/ar/contact']){
  const response=await page.goto('http://127.0.0.1:24441'+route,{waitUntil:'load'});await page.locator('#consultation-form').waitFor();await page.locator('#consultation-form fieldset:not([disabled])').waitFor();
  await page.locator('#consultation-form button[type=submit]').click();await page.waitForTimeout(400);
  const invalid=await page.locator('#consultation-form [aria-invalid=true]').count();
  const select=page.locator('#consultation-form button[role=combobox]');await select.click();const labels=await page.getByRole('option').allTextContents();const longest=labels.sort((a,b)=>b.length-a.length)[0];await page.getByRole('option',{name:longest,exact:true}).click();
  const selection=await select.innerText();
  const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,invalid:document.querySelectorAll('#consultation-form [aria-invalid=true]').length,selection:document.querySelector('#consultation-form button[role=combobox]')?.textContent}));
  rows.push({route,status:response.status(),invalidFieldsAfterEmptySubmit:invalid,selection,state,pass:response.status()===200&&invalid>=4&&!state.overflow&&!!selection});
 }
 await page.goto('http://127.0.0.1:24441/sa/contact',{waitUntil:'load'});await page.locator('#consultation-form fieldset:not([disabled])').waitFor();await page.getByRole('button',{name:'ع — Switch to Arabic',exact:true}).click();await page.waitForURL('**/sa/ar/contact');rows.push({flow:'Arabic locale switch',pass:page.url().endsWith('/sa/ar/contact')});
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('nav.region-navbar a[href="/ar"]').last().click();await page.waitForURL('**/ar');await page.locator('a[href="/uae/ar"]').first().click();await page.waitForURL('**/uae/ar');rows.push({flow:'mobile region switch',pass:page.url().endsWith('/uae/ar')});
 for(const route of ['/blog','/blog/ar','/our-work','/ar/our-work']){
  await page.goto('http://127.0.0.1:24441'+route,{waitUntil:'load'});await page.waitForTimeout(700);
  const prefix=route.includes('blog')?(route.endsWith('/ar')?'/blog/ar/':'/blog/en/'):(route.startsWith('/ar')?'/ar/our-work/':'/our-work/');
  const link=page.locator(`main a[href^="${prefix}"], #main-content a[href^="${prefix}"]`).first();const target=await link.getAttribute('href');await link.click();await page.waitForURL('**'+target);await page.locator('h1').waitFor();rows.push({flow:'collection-to-detail',route,target,pass:page.url().endsWith(target)&&!!await page.locator('h1').innerText()});
 }
 } catch(error) { await cdp.detach(); return {rows,attemptedWrites,error:String(error),pass:false}; }
 await cdp.detach();return {rows,attemptedWrites,pass:rows.every(r=>r.pass)&&attemptedWrites.length===0};
}
