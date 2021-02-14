'use strict';

import CreditCardValidator from "./CreditCardValidator";

const creditCardValidator = new CreditCardValidator(
  document.getElementById('card_number'),
  document.getElementById('submitform'),
  document.querySelectorAll('.card'),
)

creditCardValidator.init();
