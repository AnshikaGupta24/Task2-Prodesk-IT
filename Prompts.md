Questions I asked Chat GPT / AI for this mission:
1)give me an overview of how to add these functionalities in my webpage
Data Persistence (LocalStorage):
If I refresh the page, my data should NOT disappear.
You must save the Salary and Expense List to the browser's localStorage.
On page load, check if data exists and display it.
Delete Functionality: Add a "Trash" icon next to each expense in the list. Clicking it should remove the item and update the Remaining Balance immediately.
Visualization: Use Chart.js (a free library) to display a Pie Chart showing "Remaining Balance vs. Total Expenses".

2) What is Chart.js , why do we use, how does it help, what does it help in?

3)Is there any function that can be used to update the webpage/UI automatically when some changes are made by the user in input fields using simple vanilla JS,
if not how can we make a function like that using simple Js?

4)this is my javascript code, try to add these data persistence functionalities in this code in the simpleast way possible and also explain me what did you do and what code of line helps in what part,
const salaryInput = document.getElementById("one");
const expensenameInput = document.getElementById("two");
const expenseamtInput = document.getElementById("three");
const Btn = document.getElementById("btn");
const salaryDisplay = document.querySelector(".salary p");
const expenseDisplay = document.querySelector(".expenses p");
const balanceDisplay = document.querySelector(".balance p");
const expenseList = document.querySelector(".expense-list");

let salary =0;
let expenses =[];

salaryInput.addEventListener("input", function () {
    salary = Number(salaryInput.value);
    update_page();
  });

Btn.addEventListener("click", function () {
    const name = expensenameInput.value.trim();
    const amount = Number(expenseamtInput.value);
    if (name === "" || amount <= 0 || isNaN(amount)) {
      alert("Please enter valid expense details");
      return;
    }
    expenses.push({ name, amount });
    expensenameInput.value = "";
    expenseamtInput.value = "";

    update_page();
  });

function update_page(){
    let totalExpenses = 0;
    for (let i = 0; i < expenses.length; i++) {
      totalExpenses += expenses[i].amount;
    }
    const balance = salary - totalExpenses;
    salaryDisplay.textContent = salary + " Rs.";
    expenseDisplay.textContent = totalExpenses + " Rs.";
    balanceDisplay.textContent = balance + " Rs.";
    
    expenseList.innerHTML = "";
    expenses.forEach(function (exp) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${exp.name}</span>
        <span>${exp.amount} Rs.</span>
      `;
      expenseList.appendChild(li);
    });
  } 

5)how to decrease the size of chart
