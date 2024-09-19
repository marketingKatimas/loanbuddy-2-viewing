const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

// Function to update the loan amount
const updateLoanAmount = (value) => {
  loanAmountInput.value = value;
  refreshInputValues();
  let emi = calculateEMI();
  updateData(emi);
  updateRangeBackground(loanAmountInput, value);
};

// Function to update the loan tenure
const updateLoanTenure = (value) => {
  loanTenureInput.value = value;
  refreshInputValues();
  let emi = calculateEMI();
  updateData(emi);
  updateRangeBackground(loanTenureInput, value);
};

// Function to calculate the EMI
const calculateEMI = () => {
  let emi = (loanAmount * interest) / loanTenure;
  return emi;
};

// Function to update the value
const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);
  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;
  let totalInterest = ((0.015 * loanTenure) + 1).toFixed(2);
  totalInterestValue.innerHTML = totalInterest;
  const loanTenureValueElement = document.querySelector(".loan-tenure-value");
  loanTenureValueElement.innerHTML = loanTenure; 
};

// Function to update the input values
const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = (0.015 * loanTenure) + 1;
};

// Function to initialize the calculations
const init = () => {
  refreshInputValues();
  let emi = calculateEMI();
  updateData(emi);
};

// Function to update the background color of the input ranges
const updateRangeBackground = (input, value) => {
  const percentage = ((value - input.min) / (input.max - input.min)) * 100;

  input.style.background = `linear-gradient(to right, #044BD9 0%, #044BD9 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
};

const range1Inputs = document.querySelectorAll(".calc__input-range1");
const range2Inputs = document.querySelectorAll(".calc__input-range2");

range1Inputs.forEach((input) => {
  input.addEventListener("input", () => {
    updateRangeBackground(input, input.value);
  });
});

range2Inputs.forEach((input) => {
  input.addEventListener("input", () => {
    updateRangeBackground(input, input.value);
  });
});

const mLoanElement = document.getElementById("mLoan");
if (mLoanElement) {
  mLoanElement.addEventListener("input", function() {
    updateLoanAmount(this.value);
  });
}

const mLoan3Element = document.getElementById("mLoan3");
if (mLoan3Element) {
  mLoan3Element.addEventListener("input", function() {
    updateLoanTenure(this.value);
  });
}