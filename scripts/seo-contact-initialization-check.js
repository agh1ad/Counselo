async(page)=>{
 await page.route('**/assets/*.js',r=>r.abort());
 const response=await page.goto('http://127.0.0.1:24441/sa/contact',{waitUntil:'load'});
 const result={status:response.status(),formBusy:await page.locator('#consultation-form').getAttribute('aria-busy'),fieldsetDisabled:await page.locator('#consultation-form fieldset').evaluate(e=>e.disabled),submitDisabled:await page.locator('#consultation-form button[type=submit]').isDisabled(),nameDisabled:await page.locator('#consultation-form input[name=name]').isDisabled(),contactAlternatives:await page.locator('a[data-conversion-position=contact-form]').count(),url:page.url()};
 await page.unroute('**/assets/*.js');return {...result,pass:result.status===200&&result.fieldsetDisabled&&result.submitDisabled&&result.nameDisabled&&result.contactAlternatives===2&&!result.url.includes('?')};
}
