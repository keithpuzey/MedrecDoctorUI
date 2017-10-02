// spec.js
describe('Protractor Doctor Login', function() {
  	browser.ignoreSynchronization = true;
  	browser.get('http://localhost/doctor');
element(by.css('[name="usernameInput"]')).sendKeys('mary@md.com');
element(by.css('[name="passwordInput"]')).sendKeys('weblogic');
element(by.css([value="Login"])).click();
});
// spec.js
describe('Protractor Doctor Login', function() {
  	browser.ignoreSynchronization = true;
  	browser.get('http://localhost/doctor');
element(by.css('[name="usernameInput"]')).sendKeys('mary@md.com');
element(by.css('[name="passwordInput"]')).sendKeys('weblogic');
element(by.css([value="Login"])).click();
});
