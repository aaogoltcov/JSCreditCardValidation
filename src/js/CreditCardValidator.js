'use strict';

export default class CreditCardValidator {
  constructor(inputField, submitButton, cardsList) {
    this.inputField = inputField;
    this.submitButton = submitButton;
    this.cardsList = cardsList;
  }

  init() {
    this.newCardEventListener();
    this.clearInputFieldEventListener();
  }

  newCardEventListener() {
    this.submitButton.addEventListener('click', event => {
      event.preventDefault();
      let cardName = this.validateCard();
      if (this.inputField.value.length > 0 && cardName) {
        this.cardsListUpdate(cardName);
      } else {
        return false;
      }
    })
  }

  clearInputFieldEventListener() {
    this.inputField.addEventListener('input', event => {
      event.preventDefault();
      if (this.inputField.value.length === 0) {
        this.clearCardsLists();
      }
    })
  }

  validateCard() {
    if (this.inputField.value.match(/^(?:3[47][0-9]{13})$/)) {
      return 'amex';
    } else if (this.inputField.value.match(/^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/)) {
      return 'diners_club';
    } else if (this.inputField.value.match(/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/)) {
      return 'discover';
    } else if (this.inputField.value.match(/^(?:(?:2131|1800|35\d{3})\d{11})$/)) {
      return 'jcb';
    } else if (this.inputField.value.match(/^(?:5[1-5][0-9]{14})$/)) {
      return 'master';
    } else if (this.inputField.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/)) {
      return 'visa';
    } else {
      return false;
    }
  }

  cardsListUpdate(cardName) {
    Array.from(this.cardsList).forEach(card => {
      if (card.classList.contains(cardName)) {
        if (card.classList.contains('cdisabled')) {
          card.classList.remove('cdisabled');
        }
      } else {
        if (!card.classList.contains('cdisabled')) {
          card.classList.add('cdisabled');
        }
      }
    })
  }

  clearCardsLists() {
    Array.from(this.cardsList).forEach(card => {
      if (card.classList.contains('cdisabled')) {
        card.classList.remove('cdisabled');
      }
    })
  }

}
