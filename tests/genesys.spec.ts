import { test, expect } from '@playwright/test';


//test case 1: Finding broken iamges
test('Find Broken Images', async ({ page }) => {
  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForLoadState("domcontentloaded");
  
  //storing images
  const images = page.locator("img");
  console.log(await images.count());

  //waiting for all images
  const allImages = await images.all();
  //for each image, get src
  for await (const img of allImages){
    const imgSrc = await img.getAttribute("src");
    //check to see if src exists
    expect.soft(imgSrc?.length).toBeGreaterThan(1);
    //@ts-ignore

    //processing status if src exists
    if (imgSrc?.length > 1){
      const res = await page.request.get("https://magento.softwaretestingboard.com/" + imgSrc)
      expect.soft(res.status()).toBe(200);
    }
  }
})


//test case 2: Creating an account
test('Creating an account', async ({ page }) => {
  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForTimeout(5000);
  //getting first occurence of create account
  await page.locator("(//a[normalize-space()='Create an Account'])[1]").click();
  await page.waitForTimeout(5000);
  //getting index x path of required fields
  await page.locator("(//input[@id='firstname'])[1]").type("Bob");
  await page.locator("(//input[@id='lastname'])[1]").type("Joe");
  await page.locator("(//input[@id='email_address'])[1]").type("akapadia720s@gmail.com");
  await page.locator("(//input[@id='password'])[1]").type("thisisaTest123!");
  await page.locator("(//input[@id='password-confirmation'])[1]").type("thisisaTest123!");
  
  await page.waitForTimeout(5000);

  //create account click
  await page.locator("(//span[contains(text(),'Create an Account')])[1]").click();
  await page.waitForTimeout(5000);

})

//test case 3: Signing into an account
test('Signing into an Account', async ({ page }) => {
  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");

  //getting first occurence of sign on text
  await page.locator(':nth-match(:text("Sign In"), 1)').click();

  //gettong index x path of user input, and entering details, signing in
  await page.locator("(//input[@id='email'])[1]").type("ameenkapadia1@gmail.com");
  await page.locator("(//input[@id='pass'])[1]").type("Desk2018$");
  await page.locator("(//span[contains(text(),'Sign In')])[1]").click();
  await page.waitForTimeout(5000);

  //clicking drop down through xpath and logging out
  await page.locator("(//button[@type='button'])[1]").click()
  await page.locator("(//a[normalize-space()='Sign Out'])[1]").click();
  await page.waitForTimeout(5000);

})

//test case 4: change password 
test('change password', async ({ page }) => {

  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForTimeout(2000);

  //check if signed in, if not sign in with valid user credentials

  //assume user is signed in
  await page.locator("(//a[contains(text(),'Sign In')])[1]").click();
  await page.locator("(//input[@id='email'])[1]").type("ameenkapadia1@gmail.com")
  await page.locator("(//input[@id='pass'])[1]").type("Desk2018$")

  //view account
  await page.locator("(//button[@type='button'])[1]").click();
  await page.locator("(//a[normalize-space()='My Account'])[1]").click();
  await page.waitForTimeout(2000);

  //change password
  await page.locator("(//a[normalize-space()='Change Password'])[1]").click();
  //check for empty fields and only change password is checked
  
  //enter new password
  await page.locator("(//input[@id='password'])[1]").type("test12242#W");
  await page.locator("(//input[@id='password-confirmation'])[1]").type("test12242#W");
  await page.locator("(//button[@title='Save'])[1]").click();
  await page.waitForTimeout(2000);

  //sign in with new password
  await page.locator("(//button[@title='Save'])[1]").type("ameenkapadia1@gmail.com");
  await page.locator("(//input[@id='pass'])[1]").type("test12242#W")
  await page.locator("(//button[@id='send2'])[1]").click();

})

//test case 5: adding clothes to cart

test('add to cart', async ({ page }) => {

  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForTimeout(2000);
  //navigating to mens clothigs page
  await page.locator("(//span[@class='ui-menu-icon ui-icon ui-icon-carat-1-e'])[4]").hover();
  await page.locator("(//a[@id='ui-id-17'])[1]").hover();
  await page.locator("(//span[contains(text(),'Jackets')])[2]").click();
  await page.waitForTimeout(2000);

  //selecting and adding item to cart
  await page.locator("(//div[@id='option-label-size-143-item-170'])[1]").click();
  await page.locator("(//div[@id='option-label-color-93-item-50'])[1]").click();
  await page.locator("(//span[contains(text(),'Add to Cart')])[1]").click();
  await page.waitForTimeout(2000);
  
  //view cart
  await page.locator("(//a[@class='action showcart'])[1]").click();
  await page.locator("(//span[normalize-space()='View and Edit Cart'])[1]").click();
  await page.waitForTimeout(2000);
  
  //ensure that subtotal and cart total match each other
  //add new mens item and ensure that total is updated properly
})

//test case 6: using search box 
test('searching for clothes', async ({ page }) => {

  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForTimeout(2000);

  //entering into search input
  await page.locator("(//input[@id='search'])[1]").type("women's tee");
  await page.keyboard.press("Enter");
  //check for items to be loaded onto page, only consisting of women's t shirts or related items
 
})



//FUTURE TESTS

//test case 7: only display clothes based on gender searched (search mens -> only mens clothing)
//test case 8: advanced search feature
//test case 9: ensure pricing changes upon quantity increase in view cart display mode