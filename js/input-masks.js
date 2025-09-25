class EmailMask {
  constructor(inputId) {
    this.input = document.querySelector(inputId);
    this.lastValidValue = "";

    this.init();
  }
  init() {
    this.input.addEventListener("input", this.handleInput.bind(this));
    this.input.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  handleInput(event) {
    let value = event.target.value;
    const cursorPosition = event.target.selectionStart;
    value = value.replace(/[^a-zA-Z0-9@.]/g, "");
    const atCount = (value.match(/@/g) || []).length;
    if (atCount > 1) {
      const firstAt = value.indexOf("@");
      value =
        value.substring(0, firstAt + 1) +
        value.substring(firstAt + 1).replace(/@/g, "");
    }
    const atIndex = value.indexOf("@");
    let leftPart = atIndex === -1 ? value : value.substring(0, atIndex);
    let rightPart = atIndex === -1 ? "" : value.substring(atIndex + 1);
    if (leftPart.length >= 14 && atIndex === -1 && !value.includes("@")) {
      leftPart = value.substring(0, 14);
      rightPart = value.substring(14);
      value = leftPart + "@" + rightPart;
    }
    if (rightPart) {
      rightPart = rightPart.replace(/\.+/g, ".");
      const dotIndex = rightPart.indexOf(".");
      if (dotIndex === -1 && rightPart.length > 5) {
        rightPart = rightPart.substring(0, 5) + "." + rightPart.substring(5);
      }
      const lastDotIndex = rightPart.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        const domainZone = rightPart.substring(lastDotIndex + 1);
        if (domainZone.length > 4) {
          rightPart =
            rightPart.substring(0, lastDotIndex + 1) +
            domainZone.substring(0, 4);
        }
      }
      value = leftPart + "@" + rightPart;
    }
    this.input.value = value;
    const newCursorPosition = this.calculateNewCursorPosition(
      event.target.value,
      value,
      cursorPosition
    );
    event.target.setSelectionRange(newCursorPosition, newCursorPosition);

    this.lastValidValue = value;
  }
  handleKeydown(event) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    if (event.key.length === 1 && !/^[a-zA-Z0-9@.]$/.test(event.key)) {
      event.preventDefault();
    }
  }
  calculateNewCursorPosition(oldValue, newValue, oldCursorPosition) {
    if (oldValue === newValue) {
      return oldCursorPosition;
    }
    let diff = 0;
    const minLength = Math.min(oldValue.length, newValue.length);

    for (let i = 0; i < minLength; i++) {
      if (i >= oldCursorPosition) break;
      if (oldValue[i] !== newValue[i]) {
        diff++;
      }
    }
    return Math.max(0, Math.min(newValue.length, oldCursorPosition + diff));
  }
}
new EmailMask("input[type='email']");

// mask-input-phones
const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};
let phonesInput = document.querySelector("input[type='tel']");
phonesInput.addEventListener("input", (e) => {
  const value = phonesInput.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (phonesInput.value.includes("+8") || phonesInput.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }
  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += " ";
        break;
      default:
        break;
    }
    result += value[i];
  }
  phonesInput.value = result;
});

let submitBtn = document.querySelector(".input.submit button");
let checkBoxes = document.querySelectorAll(".input.checkbox input");

function areAllCheckboxesChecked(checkBoxes) {
  let allChecked = true;
  if (checkBoxes.length === 0) {
    return false;
  }
  checkBoxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      allChecked = false;
    }
  });
  return allChecked;
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("input", function (e) {
    console.log(checkBox.checked);
    if (areAllCheckboxesChecked(checkBoxes) == false) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  });
});
