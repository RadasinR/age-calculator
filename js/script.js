const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const maxYear = new Date().getFullYear();
let start = null;
let outputYear, outputMonth, outputDay;


function animateOutput(timestamp) {
  let oYear = document.getElementById("printYears");
  let oMonth = document.getElementById("printMonths");
  let oDay = document.getElementById("printDays");

  let done = false;
  if (!start) {
    start = timestamp;
  }

  const elapsed = timestamp - start;
  if (elapsed >= 300) {
    if (oYear.innerText != outputYear) {
      oYear.innerText = Number(oYear.innerText) + 1;
    } 
    if (oMonth.innerText != outputMonth) {
      oMonth.innerText = Number(oMonth.innerText) + 1;
    } 
    if (oDay.innerText != outputDay) {
      oDay.innerText = Number(oDay.innerText) + 1;
    } 
  }

  if (oDay.innerText == outputDay &&  oMonth.innerText == outputMonth && oYear.innerText == outputYear) {
    return;
  }
  requestAnimationFrame(animateOutput);
}

function leap(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0 && year % 400) {
      return false;
    }
    return true;
  }
  return false;
}

function isEmpty(input) {
  if (input.value) {
    return false;
  }
  return true;
}

function resetError(input) {
  document.getElementById(input.id + "Error").innerText = "";
  input.labels[0].classList.remove("accent--red");
  input.classList.remove("error");
}

function addErrorLook(input) {
  input.labels[0].classList.add("accent--red");
  input.classList.add("error");
}

function validData(day, month, year) {
  let valid = true;
  //error messages
  const neededField = "This field is required.";
  const invalid = "Must be a valid ";
  const yearInvalid = "Must be in the past.";

  if (isEmpty(day)) {
    document.getElementById(day.id + "Error").innerText = neededField;
    addErrorLook(day);
    valid = false;
  }
  if (isEmpty(month)) {
    document.getElementById(month.id + "Error").innerText = neededField;
    addErrorLook(month);
    valid = false;
    if (day.value != "" && (day.value > 31 || day.value <= 0)) {
      addErrorLook(day);
      document.getElementById(day.id + "Error").innerText = invalid + day.id;
    }
  }
  if (isEmpty(year)) {
    document.getElementById(year.id + "Error").innerText = neededField;
    addErrorLook(year);
    valid = false;
  }

  if (
    year.value != "" &&
    (!Number(year.value) || year.value > maxYear || year <= 0)
  ) {
    valid = false;
    addErrorLook(year);
    document.getElementById(year.id + "Error").innerText = yearInvalid;
  }

  if (
    month.value != "" &&
    (!Number(month.value) || month.value < 1 || month.value > 12)
  ) {
    document.getElementById(month.id + "Error").innerText = invalid + month.id;
    addErrorLook(month);
    valid = false;

    if (
      day.value != "" &&
      (!Number(day.value) || day.value > 31 || day.value <= 0)
    ) {
      addErrorLook(day);
      document.getElementById(day.id + "Error").innerText = invalid + day.id;
      return valid;
    }
  }

  let maxDay = 0;
  if (leap(year.value) && month.value == 2) {
    maxDay = 29;
  } else {
    maxDay = months[month.value - 1];
  }
  if (day.value != "" && (day.value > maxDay || day.value <= 0)) {
    valid = false;
    addErrorLook(day);
    document.getElementById(day.id + "Error").innerText = invalid + day.id;
  }

  return valid;
}

function calcAge() {
  let day = document.getElementById("day");
  let month = document.getElementById("month");
  let year = document.getElementById("year");
  //reset output
  document.getElementById("printYears").innerText = "--";
  document.getElementById("printMonths").innerText = "--";
  document.getElementById("printDays").innerText = "--";

  let valid = validData(day, month, year);
  if (!valid) {
    return;
  } else {
    const birthDay = new Date(year.value, month.value - 1, day.value);
    const today = new Date();

    outputYear = today.getFullYear() - birthDay.getFullYear();
    outputMonth = today.getMonth() + 1 - (birthDay.getMonth() + 1);
    outputDay = today.getDate() - birthDay.getDate();

    if (outputMonth < 0) {
      outputYear -= 1;
      outputMonth = today.getMonth() + 1;
      outputDay = today.getDate();
    }
    if (outputMonth == 0) {
      if (outputDay < 0) {
        outputDay = today.getDate();
      }
    }
    //no animation code
    /*  document.getElementById("printYears").innerText = outputYear;
    document.getElementById("printMonths").innerText = outputMonth;
    document.getElementById("printDays").innerText = outputDay; */

    document.getElementById("printYears").innerText = 0;
    document.getElementById("printMonths").innerText = 0;
    document.getElementById("printDays").innerText = 0;
    requestAnimationFrame(animateOutput);
  }
}
