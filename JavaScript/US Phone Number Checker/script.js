const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

// function to process userInput, determine whether a phone number is valid, output results, clear results

//function to process user input
const processUserInput = () =>{
  if(input.value===""){
    // check if any number is inputted
    alert("Please provide a phone number");
    return;
  }

  let output = "";
  if(testPhoneNumberValidity(input.value)){
    output = `<span class="valid">Valid US number:</span> ${input.value}`;
  }else{
    output = `<span class="invalid">Invalid US number:</span> ${input.value}`;
  }

  showResults(output);
};

const validRegex = [
  /(?:^|\s+)1 \d{3}-\d{3}-\d{4}(?:\s+|$)/,
  // (?:) means non-capturing group
  // (^|\s+) means beginning of string or there is space in front
  // \d{3} means 3 decimals consecutively
  /^1 \(\d{3}\) \d{3}-\d{4}(?:\s+|$)/,
  // \( and \) means () literally
  /^1\(\d{3}\)\d{3}-\d{4}(?:\s+|$)/,
  /^1 \d{3} \d{3} \d{4}(?:\s+|$)/,
  /^\d{10}(?:\s+|$)/,
  /^\d{3}-\d{3}-\d{4}(?:\s+|$)/,
  /^\(\d{3}\)\d{3}-\d{4}(?:\s+|$)/
];

// Check the validity of the phone number
const testPhoneNumberValidity = (number) =>validRegex.some((regexp)=>{
  return regexp.test(number);
});
  // return true if at least one element satisfies the test



//function to output result
const showResults = (content) =>{
  results.innerHTML = `
    <p>${content}</p>
  `
};

//function to clear input
const clearInput = () =>input.value ="";



// check button event listeners
checkBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  processUserInput();
  clearInput();
});

input.addEventListener("keydown", (e)=>{
  if(e.key==="Enter"){
    processUserInput();
  }
});

// clear button event listener
clearBtn.addEventListener("click", ()=>results.innerHTML = "");