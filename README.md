# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [github](https://github.com/RadasinR/age-calculator.git)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Figma

### What I learned

I learned how to use request animation frame.

```js
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
```
## Author

- Frontend Mentor - [@Radasin](https://www.frontendmentor.io/profile/Radasin)
