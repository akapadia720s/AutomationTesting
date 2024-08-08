import { test, expect } from '@playwright/test';


/*test case 1: Finding broken iamges
Test Scenario: To find broken images on loading screen
Test Steps:
  Navigate to https://magento.softwaretestingboard.com/
  Gather all images
  Check if src exists
Prerequisites: none
Browser: Chrome 
Test Data: Images
Expected/Intended Results: No broken images are found
Actual Results: 14 broken images failed to load
Test Status – Pass/Fail: Fail
*/

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


/*test case 2: Creating an account
Test Scenario: Creating an account with a gmail and password
Test Steps:
  Navigate to https://magento.softwaretestingboard.com/
  Enter first name in "first name" field
  Enter last name in "last name" field
  Enter a registered email address in the email address input box (akapadia720sl@gmail.com)
  Enter password (thisisaTest123!)
  Confirm password (thisisaTest123!)
  Click create account
Prerequisites: A valid email address
Browser: Chrome
Test Data: email address (akapadia720sl@gmail.com), first name (Ameen), last name (Kapadia), password (thisisaTest123!)
Expected/Intended Results: User is registered and returns to main page
Actual Results: As Intended
Test Status – Pass/Fail: Pass
*/


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
  await page.locator("(//input[@id='email_address'])[1]").type("akapadia720sl@gmail.com");
  await page.locator("(//input[@id='password'])[1]").type("thisisaTest123!");
  await page.locator("(//input[@id='password-confirmation'])[1]").type("thisisaTest123!");
  
  await page.waitForTimeout(5000);

  //create account click
  await page.locator("(//span[contains(text(),'Create an Account')])[1]").click();
  await page.waitForTimeout(5000);

})

/*test case 3: Signing into an account
Test Scenario: Signing into an account with a gmail and password
Test Steps:
  Navigate to https://magento.softwaretestingboard.com/
  Click on the sign in link
  Enter a registered email address (akapadia720sl@gmail.com) in the email address input box
  Enter a registered password (thisisaTest123!)
  Click sign in
  Brought back to the main page
Prerequisites: A valid email address and password
Browser: Chrome
Test Data: email (akapadia720sl@gmail.com) and password (thisisaTest123!)
Expected/Intended Results: User is signed in successfully and returns to main page
Actual Results: As Intended
Test Status – Pass/Fail: Pass
*/

test('Signing into an Account', async ({ page }) => {
  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");

  //getting first occurence of sign on text
  await page.locator(':nth-match(:text("Sign In"), 1)').click();

  //gettong index x path of user input, and entering details, signing in
  await page.locator("(//input[@id='email'])[1]").type("akapadia720sl@gmail.com");
  await page.locator("(//input[@id='pass'])[1]").type("thisisaTest123!");
  await page.locator("(//span[contains(text(),'Sign In')])[1]").click();
  await page.waitForTimeout(5000);

  //clicking drop down through xpath and logging out
  await page.locator("(//button[@type='button'])[1]").click()
  await page.locator("(//a[normalize-space()='Sign Out'])[1]").click();
  await page.waitForTimeout(5000);

})

/*test case 4: change password 
Test Scenario: Change password for registered account
Test Steps:
  Navigate to https://magento.softwaretestingboard.com/
  Click on the sign in link
  Enter a registered email address in the email address input box (akapadia720sl@gmail.com)
  Enter a registered password (thisisaTest123!)
  Click sign in
  Brought back to the main page
  Navigate to "my account"
  Click change password
  Verify the name, address, and all fields are not empty
  Verify that change password is checked
  Enter new password (test12242#W)
  Confirm new password (test12242#W)
  Click save
  Sign out automatically
  Enter email (akapadia720sl@gmail.com)
  Enter new password (test12242#W)
  Click sign in
Prerequisites: A valid registered account
Browser: Chrome
Test Data: email address (akapadia720sl@gmail.com), password (thisisaTest123!), new password (test12242#W)
Expected/Intended Results: User changes password and signs in successfully after being logged out upon password change
Actual Results: As Intended
Test Status – Pass/Fail: Pass
*/

test('change password', async ({ page }) => {

  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForTimeout(2000);

  //check if signed in, if not sign in with valid user credentials

  //assume user is signed in
  await page.locator("(//a[contains(text(),'Sign In')])[1]").click();
  await page.locator("(//input[@id='email'])[1]").type("akapadia720sl@gmail.com")
  await page.locator("(//input[@id='pass'])[1]").type("thisisaTest123!")

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
  await page.locator("(//button[@title='Save'])[1]").type("akapadia720sl@gmail.com");
  await page.locator("(//input[@id='pass'])[1]").type("test12242#W")
  await page.locator("(//button[@id='send2'])[1]").click();

})

/*test case 5: adding clothes to cart
Test Scenario: Change password for registered account
Test Steps:
  Navigate to https://magento.softwaretestingboard.com/
  Click on mens
  Click tops
  Select a color and size
  Add item to cart
  Click view cart
  Verify that the subtotal and total item cost are matching
  Go back to mens clothing
  Add new item
  Click on view and edit cart
  Ensure price is updated
Prerequisites: None
Browser: Chrome
Test Data: Mens jacket
Expected/Intended Results: User adds item to cart and price is matching
Actual Results: As Intended
Test Status – Pass/Fail: Pass
*/

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

/*test case 6: using search box 
Test Scenario: Search for clothing
Test Steps:
  Navigates to https://magento.softwaretestingboard.com/
  Enters "women's tee" into search box
  Press enter
  Verifies womens t shirts are loaded onto web page
Prerequisites: Women's t shirts available
Browser: Chrome
Test Data: Women's clothing items available
Expected/Intended Results: User searches for women's t shirts, resulting in new web page of only women's t shirts
Actual Results: As Intended
Test Status – Pass/Fail: Pass
*/

test('searching for clothes', async ({ page }) => {

  //load page and wait for its content
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.waitForTimeout(2000);

  //entering into search input
  await page.locator("(//input[@id='search'])[1]").type("women's tee");
  await page.keyboard.press("Enter");
  //check for items to be loaded onto page, consisting of women's t shirts or related items
  
 
})



//FUTURE TESTS

/*test case 7: only display clothes based on gender searched (search mens -> only mens clothing)
Test Scenario: Search for a gender's clothing, resulting only in the specified gender's clothing items
Test Steps:
  Navigates to https://magento.softwaretestingboard.com/
  Enters "women's clothing" into search box
  Press enter
  Verifies only womens clothing is loaded
Prerequisites: None
Browser: Chrome
Test Data: Womens clothing available
Expected/Intended Results: User searches for women's clothing items, displaying only women's clothing items
Actual Results: N/A
Test Status – Pass/Fail: N/A
*/

/*test case 8: advanced search feature
Test Scenario: Searching for specific item through advanced search feature
Test Steps:
  Navigates to https://magento.softwaretestingboard.com/
  Click on advanced search
  Enter product name in "product name" field
  Enter SKU in 'SKU" field
  Enter description in "description" field
  Enter short description in "short description" field
  Enter low end of price in first price input box
  Enter high end of price in second price input box
Prerequisites: An existing item
Browser: Chrome
Test Data: N/A
Expected/Intended Results: User specifies item to be searched for with above descriptions and is resulted in a valid item or does not exist message
Actual Results: N/A
Test Status – Pass/Fail: N/A
*/
