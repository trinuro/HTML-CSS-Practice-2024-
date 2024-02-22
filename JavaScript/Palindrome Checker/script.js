// Get all important elements

const textInput = document.getElementById("text-input");
const submitButton = document.getElementById("check-btn");
const result = document.getElementById("result");

// We need one function to cleanInput, isPalindrome, processInput, updateResult

/*cleanInput receives a string as input and 
removes all non-alphanumeric characters and 
converts all characters to lowercase*/
const cleanInput = (input) => {
  // toLowerCase changes all characters to lowercase
  return input.toLowerCase().split("").filter((character)=>{
    // This function will retain only alphanumeric characters
    const regex = /[a-z0-9]/;
    return regex.test(character);
  }).join("");
  // alphanumeric contains only alphanumeric strings
};

/*
isPalindrome will accept a string as input and 
return the boolean result of whether the string is palindrome
*/
const isPalindrome = (stringInput) => {
  const inputArray = stringInput.split("");

    // If length of inputArray is even
    for(let i = 0; i<inputArray.length/2; i++){
      if(inputArray[i]!==inputArray[inputArray.length-1-i]){
        // return false if the two characters at the same distance from the end is false
        return false;
      }
    }
    return true;
};

/*
Accepts two parameter: the user input and result of isPalindrome()
Show the users the result
*/
const updateResult = (input, palindromeResult) => {
  if(palindromeResult){
    result.innerHTML = `
    <p class="output">${input} is a palindrome</p>
    `;
  }else{
    result.innerHTML = `
    <p class="output">${input} is not a palindrome</p>
    `;
  }

};

/*
Process input
*/
const processInput = () => {
  const input = document.getElementById("text-input").value;
  // receives input from user
  if(input!==""){
    updateResult(input, isPalindrome(cleanInput(input)));
  }else{
    alert("Please input a value");
  }
  
};

//console.log(cleanInput("#abc123"));

submitButton.onclick = processInput;