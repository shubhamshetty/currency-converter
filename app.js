const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")


// To generate currency option dropdowns
for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name =="from" && currCode =="USD"){
            newOption.selected=true
        }else if (select.name =="to" && currCode =="INR"){
            newOption.selected=true}
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

// To update flag image along with currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// To get the exchange rate from API and display
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if (amtVal === ' ' || amtVal < 1){
        amtVal = 1
        amount.value ="1"
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalamt = (amtVal * rate);
    let roundfamt = Number(finalamt.toFixed(3)); // round and convert to nearest decimal
    msg.innerText = `${amtVal} ${fromCurr.value} = ${roundfamt} ${toCurr.value}`;
}

// To perform action on button
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });

// To default load the first currency conversion
window.addEventListener("load", () => {
    updateExchangeRate();
  });