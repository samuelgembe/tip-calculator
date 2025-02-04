const totalBill = document.querySelector('#total-bill');
const numOfPeople = document.querySelector('#numOfPeople');
const customTip = document.querySelector('.custom-tip');
const noTipButton = document.querySelector('#notip-button');
const tip10Button = document.querySelector('#tip10-button');
const tip15Button = document.querySelector('#tip15-button');
const tip25Button = document.querySelector('#tip25-button');
const tip50Button = document.querySelector('#tip50-button');
const plusButton = document.querySelector('.plus-button');
const minusButton = document.querySelector('.minus-button');
const tipPerPerson = document.querySelector('#tip-per-person');
const billPerPerson = document.querySelector('#bill-per-person');
const totalPerPerson = document.querySelector('#total-per-person');
const resetButton = document.querySelector('#reset-button');
const tipButtons = document.querySelectorAll('.tip-button'); // Uses the existing class
let customTipAmount = 0; // Track custom dollar amount

let tipPercentage = 0;

function calculate() {
    const billAmount = parseFloat(totalBill.value) || 0;
    const peopleCount = parseInt(numOfPeople.value) || 1;

    let totalTip;

    if (customTip.value) {
        totalTip = parseFloat(customTip.value) || 0;
      } else {
        totalTip = billAmount * (tipPercentage / 100);
      }

    const tipPerPersonAmmount = totalTip / peopleCount;
    const billPerPersonAmmount = billAmount / peopleCount;

    tipPerPerson.textContent = `$${tipPerPersonAmmount.toFixed(2)}`;
    billPerPerson.textContent = `$${billPerPersonAmmount.toFixed(2)}`;
    totalPerPerson.textContent = `$${(billPerPersonAmmount + tipPerPersonAmmount).toFixed(2)}`;
}


function handleTipButton(percent, clickedButton){
    tipButtons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
    
    tipPercentage = percent;
    customTip.value = ''; // Clear dollar input
    customTipAmount = 0; // Reset dollar amount
    calculate();
}

noTipButton.addEventListener('click', () => handleTipButton(0, noTipButton));
tip10Button.addEventListener('click', () => handleTipButton(10, tip10Button));
tip15Button.addEventListener('click', () => handleTipButton(15, tip15Button));
tip25Button.addEventListener('click', () => handleTipButton(25, tip25Button));
tip50Button.addEventListener('click', () => handleTipButton(50, tip50Button));

customTip.addEventListener('input', () => {
    tipButtons.forEach(button => button.classList.remove('active'));
    customTipAmount = parseFloat(customTip.value) || 0;
    calculate();
});

plusButton.addEventListener('click', () => {
    numOfPeople.value = parseInt(numOfPeople.value) + 1;
    calculate();
});

minusButton.addEventListener('click', () => {
    const currentValue = parseInt(numOfPeople.value) || 1;
    numOfPeople.value = Math.max(1, currentValue -1);
    calculate();
});

totalBill.addEventListener('input', calculate);
numOfPeople.addEventListener('input', calculate);

resetButton.addEventListener('click', () => {
    tipButtons.forEach(button => button.classList.remove('active'));
    totalBill.value = '';
    numOfPeople.value = 1;
    tipPercentage = 0;
    customTip.value = '';
    calculate();
});