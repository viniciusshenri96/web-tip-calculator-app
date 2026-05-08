"use strict";

////////////////////////
// Selecting Elements

const containerBtn = document.querySelector(".calculator__buttons");
const btnAll = document.querySelectorAll(".btn");
const numberPeopleEL = document.querySelector(".people");
const billEl = document.querySelector(".bill");
const calcValue = document.querySelector(".calculator__value");
const calcValueTotal = document.querySelector(".calculator__value-total");
const resetBtn = document.querySelector(".btn__reset");
const btnCuston = document.querySelector(".btn__custom");
// LOGIC CALCULATOR
const init = {
  bill: 0,
  tip: 0,
  numberPeople: 0,
};

const calcTipAmount = function (bill, numberPeople, tip) {
  const person = (bill * tip) / 100 / numberPeople;
  return person.toFixed(2);
};

const calcTotalPerson = function (bill, numberPeople, tip) {
  const person = ((bill * tip) / 100 + bill) / numberPeople;
  return person.toFixed(2);
};

containerBtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    e.preventDefault();

    btnAll.forEach(function (btn) {
      if (btn.classList.contains("focus")) btn.classList.remove("focus");
    });
    e.target.classList.add("focus");

    const value = +e.target.textContent.slice(0, -1);
    init.tip = value;

    if (init.numberPeople > 0) {
      calcValue.textContent = `$${calcTipAmount(init.bill, init.numberPeople, init.tip)}`;
      calcValueTotal.textContent = `$${calcTotalPerson(init.bill, init.numberPeople, init.tip)}`;
    }
  }
});

billEl.addEventListener("keyup", function () {
  if (+billEl.value === 0 || +billEl.value === NaN || +billEl.value < 0) {
    console.log("Valor invalido");
  } else {
    init.bill = +billEl.value;

    if (init.numberPeople > 0) {
      calcValue.textContent = `$${calcTipAmount(init.bill, init.numberPeople, init.tip)}`;
      calcValueTotal.textContent = `$${calcTotalPerson(init.bill, init.numberPeople, init.tip)}`;
    }
  }
});

numberPeopleEL.addEventListener("keyup", function () {
  if (+numberPeopleEL.value === 0 || +numberPeopleEL.value === NaN) {
    console.log("Valor invalido");
  } else {
    init.numberPeople = +numberPeopleEL.value;

    calcValue.textContent = `$${calcTipAmount(init.bill, init.numberPeople, init.tip)}`;
    calcValueTotal.textContent = `$${calcTotalPerson(init.bill, init.numberPeople, init.tip)}`;
  }
});

resetBtn.addEventListener("click", function () {
  init.bill = 0;
  init.numberPeople = 0;
  init.tip = 0;

  calcValue.textContent = "$0.00";
  calcValueTotal.textContent = "$0.00";
  billEl.value = "";
  numberPeopleEL.value = "";

  btnAll.forEach(function (btn) {
    if (btn.classList.contains("focus")) btn.classList.remove("focus");
  });
});
