let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const valueOfNotes = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}
const priceShown = document.getElementById("price");
const cashPaid = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashDue = document.getElementById("change-due");


// We need a function to process user input, update cash in drawer (cid), determine how many notes is needed, update results

// function to process user input
const processUserInput = () =>{
  const output = processNotesNeeded(parseFloat(cashPaid.value)); // parse input 

  // checks if output is undefined (falsy)
  if(output){
    updateCashDue(output);
  }

}

// function to process notes needed. 
// Accepts integer as input
const processNotesNeeded = (cashGiven) =>{

  // check if cash given is enough
  if(cashGiven<price){
    alert("Customer does not have enough money to purchase the item");
    return;
  }else if(isDecimalsEqual(cashGiven,price)){
    // check if cash given is equal to amount due
    //console.log(cashGiven+" "+price+" "+Math.abs(cashGiven-price))
    return "No change due - customer paid with exact cash";
  }

  const totalCashInDrawer = cid.reduce(
    (acc, currentArr) => acc+currentArr[1],0
  );
  let cashDueFloat = convertToTwoDecimals(cashGiven - price); // In this case, cashGiven must be more than price (Refer line 49)

  console.log(cashDueFloat);
    let output = `Status: OPEN `;

  if(cashDueFloat > totalCashInDrawer){
    // Check whether amount due to customer is more than available cash 
    //console.log("Checkpoint 2");
    return "Status: INSUFFICIENT_FUNDS";
  }else if (isDecimalsEqual(cashDueFloat,totalCashInDrawer)){
    output = `Status: CLOSED `;
  }

  let notesDue = {};
  const updateNotesDue = (noteType,amount) =>{
    // stores the cash that will be returned to customer
    notesDue[noteType] = (notesDue[noteType] || 0) + amount;
  }

  cid.reverse().forEach((element)=>{
    const name = element[0];
    let amount = element[1];

    if(cashDueFloat>=amount){
      cashDueFloat -= amount;
      cashDueFloat = convertToTwoDecimals(cashDueFloat,0);
      updateNotesDue(name, amount);
    }else{
      const valueOfNote = valueOfNotes[name];
      const multiple = Math.floor(cashDueFloat/ valueOfNote);
      cashDueFloat %= valueOfNote;
      amount -= convertToTwoDecimals(multiple*valueOfNote);
      updateNotesDue(name, multiple*valueOfNote); 
      //console.log(valueOfNote+ ": "+cashDueFloat);
    }
    console.log(cashDueFloat)
  })
  cid.reverse();
  
  cashDueFloat = convertToTwoDecimals(cashDueFloat,0);
  //console.log("Checkpoint 4: "+cashDueFloat);

  if(cashDueFloat===0){
    cid.forEach((array)=>{
      array[1] -= notesDue[array[0]] || 0;
    })
  }else{
    return "Status: INSUFFICIENT_FUNDS";
  }

  for(const key of Object.keys(notesDue)){
    output += `${key}: \$${notesDue[key].toFixed(2)} `;
  }
  
  return output;

}

// function to determine whether two decimals are equal (accuracy up to 2 decimal points)
const isDecimalsEqual = (a,b) => Math.abs(a-b)<0.005;

// function to convert two decimals
const convertToTwoDecimals = (input) => {
  const lastDigit = input*1000%10;
  let output = Math.floor(input*100)/100;
  if(lastDigit<5){
    return output;
  }else{
    return output+0.01;
  }
}



// function to output result
const updateCashDue = (result) =>{
  cashDue.innerHTML = `${result}`;
  document.querySelector("#cash-in-drawer").textContent = cid.reduce(
    (acc, currentArr) => acc+currentArr[1],0
  ).toFixed(2);
}


// Show current price of item
priceShown.innerText = `\$${price}`;

document.querySelector("#cash-in-drawer").textContent = cid.reduce(
    (acc, currentArr) => acc+currentArr[1],0
  ).toFixed(2);

// Purchase button listener
purchaseBtn.addEventListener("click", processUserInput);

cashPaid.addEventListener("keydown",(e)=>{
  console.log(e);
  if(e.key==="Enter"){
    processUserInput();
  }
})