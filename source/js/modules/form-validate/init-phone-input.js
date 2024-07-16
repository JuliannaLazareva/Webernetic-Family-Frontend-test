const modal = document.querySelector('.modal');
const form = modal.querySelector('.form');
const modalInput = modal.querySelector('#login');

let getInputNumbersValue = function (input) {
  return input.value.replace(/\D/g, '');
};

let onPhoneInput = function (e) {
  let input = e.target;
  let inputNumbersValue = getInputNumbersValue(input);
  let formattedInputValue = '';
  let selectionStart = input.selectionStart;

  if (!inputNumbersValue) {
    input.value = '';
    return;
  }

  if (input.value.length !== selectionStart) {
    if (e.data && /\D/g.test(e.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (inputNumbersValue.indexOf(inputNumbersValue[0]) > -1) {
    formattedInputValue = '+375' + ' ';
    if (inputNumbersValue.length > 3) {
      formattedInputValue += '(' + inputNumbersValue.substring(3, 5);
    }
    if (inputNumbersValue.length >= 6) {
      formattedInputValue += ') ' + inputNumbersValue.substring(5, 8);
    }
    if (inputNumbersValue.length >= 9) {
      formattedInputValue += '-' + inputNumbersValue.substring(8, 10);
    }
    if (inputNumbersValue.length >= 11) {
      formattedInputValue += '-' + inputNumbersValue.substring(10, 12);
    }
  }

  input.value = formattedInputValue;

  form.onsubmit = function () {
    if (input.value.length < 18) {
      return false;
    } else {
      return true;
    }
  };
};

let onPhoneKeyDown = function (e) {
  let inputValue = e.target.value.replace(/\D/g, '');
  if (e.keyCode === 8 && inputValue.length === 1) {
    e.target.value = '';
  }
};

let onPhonePaste = function (e) {
  let pasted = e.clipboardData || window.clipboardData;
  let input = e.target;
  let inputNumbersValue = getInputNumbersValue(input);

  if (pasted) {
    let pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      input.value = inputNumbersValue;
    }
  }
};

export const initPhoneInput = () => {
  modalInput.addEventListener('keydown', onPhoneKeyDown);
  modalInput.addEventListener('input', onPhoneInput, false);
  modalInput.addEventListener('paste', onPhonePaste, false);
};
