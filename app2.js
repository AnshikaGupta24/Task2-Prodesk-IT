const salaryInput = document.getElementById("one");
const expensenameInput = document.getElementById("two");
const expenseamtInput = document.getElementById("three");
const Btn = document.getElementById("btn");
const salaryDisplay = document.querySelector(".salary p");
const expenseDisplay = document.querySelector(".expenses p");
const balanceDisplay = document.querySelector(".balance p");
const expenseList = document.querySelector(".expense-list");
const cht = document.getElementById("Chart");

let salary =0;
let expenses =[];
let chart;
window.addEventListener("load", function () {
  const savedSalary = localStorage.getItem("salary");
  const savedExpenses = localStorage.getItem("expenses");
  if (savedSalary) salary = Number(savedSalary);
  if (savedExpenses) expenses = JSON.parse(savedExpenses);
  salaryInput.value = salary;
  update_page();
});

salaryInput.addEventListener("input", function () {
    salary = Number(salaryInput.value);
    localStorage.setItem("salary", salary);
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
    localStorage.setItem("expenses", JSON.stringify(expenses));
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
    expenses.forEach(function (exp, index) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${exp.name}</span>
        <span>${exp.amount} Rs.</span>
        <button class="delete-btn" data-index="${index}">🗑️</button>
      `;
      expenseList.appendChild(li);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      update_page();
    });
  });

  updateChart(totalExpenses, balance);
}
function updateChart(totalExpenses, balance) {
  const chartCtx = cht.getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(chartCtx, {
    type: "pie",
    data: {
      labels: ["Total Expenses", "Remaining Balance"],
      datasets: [{
        data: [totalExpenses, balance],
        backgroundColor: ["red", "green"],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}