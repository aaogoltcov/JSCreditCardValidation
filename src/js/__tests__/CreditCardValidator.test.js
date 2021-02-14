import CreditCardValidator from "../CreditCardValidator";
import {afterAll, beforeAll, describe, jest, test} from "@jest/globals";

document.body.innerHTML = '<div class="col-md-5">\n' +
  '  <h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Проверьте номер своей кредитной карты</font></font></h3>\n' +
  '  <ul class="cards list-unstyled">\n' +
  '    <li><span class="card visa" title="Visa"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Visa</font></font></span></li>\n' +
  '    <li><span class="card master" title="Mastercard"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Mastercard</font></font></span></li>\n' +
  '    <li><span class="card amex" title="American Express"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">American Express</font></font></span></li>\n' +
  '    <li><span class="card discover" title="Discover"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Discover</font></font></span></li>\n' +
  '    <li><span class="card jcb" title="JCB"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">JCB</font></font></span></li>\n' +
  '    <li><span class="card diners_club" title="Diners Club"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Diners Club</font></font></span></li>\n' +
  '  </ul>\n' +
  '  <form id="form" class="form-inline" novalidate="novalidate">\n' +
  '    <div class="form-group">\n' +
  '      <input class="form-control col-md-6" id="card_number" name="card_number" type="text" placeholder="Номер кредитной карты" data-original-title="" title="">\n' +
  '      <a id="submitform" class="btn btn-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Подтвердить</font></font></a>\n' +
  '    </div>\n' +
  '  </form>\n' +
  '  <h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Примеры номеров кредитных карт, </font></font><small style="font-size:0.7em"><a href="http://www.getcreditcardnumbers.com" target="_blank"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">нужно больше данных?</font></font></a></small></h3>\n' +
  '  <table class="table table-striped table-bordered" style="width:400px">\n' +
  '    <thead>\n' +
  '    <tr>\n' +
  '      <th><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Тип карты</font></font></th>\n' +
  '      <th><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Номер карты</font></font></th>\n' +
  '    </tr>\n' +
  '    </thead>\n' +
  '    <tbody>\n' +
  '    <tr>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">American Express</font></font></td>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">371449635398431</font></font></td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Diners Club</font></font></td>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">30569309025904</font></font></td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Discover</font></font></td>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">6011111111111117</font></font></td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">JCB</font></font></td>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">3530111333300000</font></font></td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">MasterCard</font></font></td>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">5555555555554444</font></font></td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Visa</font></font></td>\n' +
  '      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">4111111111111111</font></font></td>\n' +
  '    </tr>\n' +
  '    </tbody>\n' +
  '  </table>\n' +
  '</div>\n'

const creditCardValidator = new CreditCardValidator(
  document.getElementById('card_number'),
  document.getElementById('submitform'),
  document.querySelectorAll('.card'),
)

test.each([
  ['true for valid amex', '371449635398431', 'amex'],
  ['true for valid diners_club', '30569309025904', 'diners_club'],
  ['true for valid discover', '6011111111111117', 'discover'],
  ['true for valid jcb', '3530111333300000', 'jcb'],
  ['true for valid master', '5555555555554444', 'master'],
  ['true for valid visa', '4111111111111111', 'visa'],
  ['false for valid insta', '6386704070627946', false]
])(('it should be %s'), (_, input, expected) => {
  document.getElementById('card_number').value = input;
  expect(creditCardValidator.validateCard()).toBe(expected);
});

import puppetteer from 'puppeteer'; jest.setTimeout(30000);
describe('credit card validation form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    browser = await puppetteer.launch({ headless: false,
      devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('credit card validation form', () => {

    test('should amex valid card', async () => {
      await page.goto(baseUrl);
      const form = await page.$('[id=form]');
      const input = await form.$('[id=card_number]');
      await input.type('349230387200275');
      const submit = await form.$('[id=submitform]');
      await submit.click();
      await page.waitForSelector('[class="card amex"]');
    });

    test('should discover valid card', async () => {
      await page.goto(baseUrl);
      const form = await page.$('[id=form]');
      const input = await form.$('[id=card_number]');
      await input.type('6011345865144318');
      const submit = await form.$('[id=submitform]');
      await submit.click();
      await page.waitForSelector('[class="card discover"]');
    });

  });

});
