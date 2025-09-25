const input = document.querySelector("input[type='email']");

// Оставляет только латиницу, цифры, точку и @, убирает лишние @
function sanitize(str) {
  let atSeen = false;
  return str
    .split("")
    .filter((ch) => {
      if (/^[A-Za-z0-9]$/.test(ch) || ch === ".") {
        return true;
      }
      if (ch === "@") {
        if (!atSeen) {
          atSeen = true;
          return true;
        }
      }
      return false;
    })
    .join("");
}

function formatEmail(raw) {
  let s = sanitize(raw);
  const atIndex = s.indexOf("@");

  if (atIndex === -1) {
    if (s.length > 10) {
      s = s.slice(0, 10) + "@" + s.slice(10);
    }
    return s;
  }

  // Разбиваем на левую и правую части (до и после @)
  let left = s.slice(0, atIndex);
  let right = s.slice(atIndex + 1);

  if (!right.includes(".") && right.length > 5) {
    right = right.slice(0, 5) + "." + right.slice(5);
  }

  if (right.includes(".")) {
    const dotPos = right.indexOf(".");
    let domainName = right.slice(0, dotPos);
    let ext = right.slice(dotPos + 1);

    ext = ext.replace(/[^A-Za-z]/g, "").slice(0, 4);
    right = domainName + (ext ? "." + ext : "");
  } else {
    // Доменное имя пока что без точки
    right = right.replace(/[^A-Za-z0-9]/g, "");
  }

  return left + "@" + right;
}

// Сохраняет позицию курсора
function setCursor(el, pos) {
  requestAnimationFrame(() => {
    el.setSelectionRange(pos, pos);
  });
}

input.addEventListener("input", (e) => {
  const el = e.target;
  const oldVal = el.value;
  const oldPos = el.selectionStart;
  const newVal = formatEmail(oldVal);

  el.value = newVal;
  // корректируем позицию курсора
  const diff = newVal.length - oldVal.length;
  setCursor(el, oldPos + diff);
});

input.addEventListener("keypress", (e) => {
  // запрещаем ввод недопустимых символов
  if (!/^[A-Za-z0-9@.]$/.test(e.key)) {
    e.preventDefault();
  }
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
