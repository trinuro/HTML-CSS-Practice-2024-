
const userInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const answer = document.getElementById("output");

const romanNumeralMap = {
  1000:'M',
  900:'CM',
  500:'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
};

const romanNumeraltoDecimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

// Function convertDecToRoman, updateResult, 
// keypress listener, onclick listener

const convertDecToRoman = (decimal) => {
  if(decimal===""){
    return "Please enter a valid number";
  }

  decimal = parseInt(decimal);
  
  if(decimal<0){
    return "Please enter a number greater than or equal to 1";
  }
  if(decimal >= 4000){
    return "Please enter a number less than or equal to 3999"; 
  }

  let output = "";
  let decimalInput = decimal;
  
  console.log(Object.keys(romanNumeralMap).reverse());
  for(const number of Object.keys(romanNumeralMap).reverse()){
    if(decimalInput===0){
      break;
    }

    while(decimalInput>=number){
      decimalInput -= number;
      output += romanNumeralMap[number];
    }
  }

  return output;
};

// This function will loop through the number and return roman numerals
const getNumberOfRomanNumerals = (number, romanNumeral) =>{
  number %= 5;
  return romanNumeral.repeat(number);
};


const updateResult = (input) =>{
  answer.innerHTML = `
    <p>${input}</p>
  `;
  document.getElementById("answer-section").classList.add("border");
};

// Function to remove previous input
const reset = () =>{
  userInput.value = "";
};

// Onclick event listener
convertBtn.addEventListener("click", ()=>{
  updateResult(convertDecToRoman(userInput.value));
  reset();
});
// Press key enter event listener
userInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    updateResult(convertDecToRoman(userInput.value));
    reset();
  }
});
