// mask-input email
const formatEmail = (str) => {
  if (str.includes("@")) {
    return str; // уже есть @, не меняем
  }
  if (str.length > 3 && !str.includes("@")) {
    return str + "@"; // автоматически добавляем @ после 3 символов
  }
  return str;
};

let emailInput = document.querySelector("input[type='email']");
emailInput.addEventListener("input", (e) => {
  const value = emailInput.value;

  let result = value;

  // Удаляем лишние символы @ (оставляем только первый)
  const atCount = (value.match(/@/g) || []).length;
  if (atCount > 1) {
    result = value.replace(/@/g, "");
    const firstAtPosition = value.indexOf("@");
    if (firstAtPosition !== -1) {
      result =
        value.substring(0, firstAtPosition) +
        "@" +
        value.substring(firstAtPosition + 1).replace(/@/g, "");
    }
  }

  if (
    result.includes("@") &&
    !result.includes(".") &&
    result.length > result.indexOf("@") + 3
  ) {
    const atPosition = result.indexOf("@");
    const domainPart = result.substring(atPosition + 1);
    if (domainPart.length > 0 && !domainPart.includes(".")) {
      result = result + ".com";
      // Устанавливаем курсор перед .com для удобства редактирования
      setTimeout(() => {
        emailInput.setSelectionRange(result.length - 4, result.length - 4);
      }, 0);
    }
  }

  emailInput.value = result;
});

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
