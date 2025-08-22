const expenditure = document.querySelector(".expenditure");
const container = document.querySelector(".container");
const income = document.querySelector(".inc");
const home = document.querySelector(".home");

function renderTable(type) {
  const data = JSON.parse(localStorage.getItem(type)) || [];
  const table =
    type === "incomes"
      ? document.getElementById("income-data")
      : document.getElementById("expense-data");

  if (!table) return;

  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="5">No records found</td></tr>`;
    return;
  }

  table.innerHTML = `
    <tr>
      <th>Description</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
    ${data
      .map(
        (item, index) => `
        <tr>
          <td>${item.desc}</td>
          <td>${item.amount}</td>
          <td>${item.category}</td>
          <td>${new Date(item.date).toLocaleDateString()}</td>
          <td><button class="delete-btn" data-type="${type}" data-index="${index}">❌ Delete</button></td>
        </tr>
      `
      )
      .join("")}
  `;
}

// Show Income / Expenditure
document.addEventListener("click", (e) => {
  if (e.target.id === "show-income") {
    renderTable("incomes");
  }
  if (e.target.id === "show-expenditure") {
    renderTable("expenses");
  }

 
  if (e.target.classList.contains("delete-btn")) {
    const type = e.target.getAttribute("data-type");
    const index = e.target.getAttribute("data-index");

    let data = JSON.parse(localStorage.getItem(type)) || [];
    data.splice(index, 1); 
    localStorage.setItem(type, JSON.stringify(data));

    renderTable(type); 
    updateHomeUI(); 
  }
});





function getTotalIncome() {
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  return incomes.reduce((sum, inc) => sum + inc.amount, 0);
}

function getTotalExpense() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

function updateHomeUI() {
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const remainingIncome = totalIncome - totalExpense;

  const totalIncomeEl = document.querySelector("#total-income + p");
  const totalExpenseEl = document.querySelector("#total-Expenditure + p");
  const remainingIncomeEl = document.querySelector("#remaining-income + p");

  if (totalIncomeEl) totalIncomeEl.textContent = totalIncome;
  if (totalExpenseEl) totalExpenseEl.textContent = totalExpense;
  if (remainingIncomeEl) remainingIncomeEl.textContent = remainingIncome;
}

function clearContainer() {
  container.innerHTML = "";
}

function showExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

}

expenditure.addEventListener("click", function () {
  clearContainer();

  let expenseForm = document.createElement("div");
  expenseForm.innerHTML = `<form class="form" id="expense-form">
            <h1 class="heading">Add New Expenditure</h1>
            <div class="form-data">
                <div class="inp">
                    <label for="desc">Description</label>
                    <input type="text" name="desc" id="desc" placeholder="e.g vegetables">
                </div>
                <div class="inp">
                    <label for="amt">Amount</label>
                    <input type="number" name="amt" id="amt">
                </div>
                <div class="inp">
                    <p>Category</p>
                    <select name="Category" id="Category">
                        <option value="food">Food</option>
                        <option value="clothing">Clothing</option>
                        <option value="transport">Transport</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="bills">Bills</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>

                </div>
                <button class="btn">Add Expenditure</button>

            </div>
        </form> `;

  container.appendChild(expenseForm);

  const form = document.querySelector("#expense-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const desc = document.getElementById("desc").value.trim();
    const amt = document.getElementById("amt").value.trim();
    const category = document.getElementById("Category").value;

    if (!desc || !amt || !category) {
      alert("Please fill all fields");
      return;
    }

    const expenseData = {
      type: "expense",
      desc,
      amount: Number(amt),
      category,
      date: new Date().toISOString(),
    };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expenseData);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateHomeUI();

    alert("Expenditure added ✅");
    form.reset();
  });
});

income.addEventListener("click", function () {
  clearContainer();
  let incomeForm = document.createElement("div");
  incomeForm.innerHTML = `<form class="form" id="income-form">
            <h1 class="heading">Add Income</h1>
            <div class="form-data">
                <div class="inp">
                    <label for="desc">Description</label>
                    <input type="text" name="desc" id="desc" placeholder="e.g Salary">
                </div>
                <div class="inp">
                    <label for="amt">Amount</label>
                    <input type="number" name="amt" id="amt">
                </div>
                <div class="inp">
                    <p>Category</p>
                    <select name="Category" id="Category">
                        <option value="salary">Salary</option>
                        <option value="business">Business</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="investments">Investments</option>
                        <option value="gifts">Gifts</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button class="btn">Add Income</button>

            </div>
        </form> `;

  container.appendChild(incomeForm);

  const form = document.querySelector("#income-form");
  if (!form) return;


  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const desc = document.getElementById("desc").value;
    const amt = document.getElementById("amt").value;
    const category = document.getElementById("Category").value;

    const incomeData = {
      desc,
      amount: Number(amt),
      category,
      date: new Date().toISOString(),
    };
    console.log(incomeData);

    if (!desc || !amt || !category) {
      alert("Please fill in all fields.");
      return;
    }
    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    incomes.push(incomeData);

    localStorage.setItem("incomes", JSON.stringify(incomes));

    alert("Income added successfully ");
    updateHomeUI();


    form.reset();
  });
});

home.addEventListener("click", function () {
  clearContainer();

  if(document.querySelector(".home-page")) return;

  let homeContent = document.createElement("div");
  homeContent.classList.add("home-page");
  homeContent.innerHTML = `<div class="home-page">
            <div class="total">
                <div class="total-income">
                    <h3 class="total-inc" id="total-income">Total Income</h3>
                    <p>0</p>
                </div>
                <div class="total-income">
                    <h3 class="total-inc" id="remaining-income">Remaining Income</h3>
                    <p>0</p>
                </div>
                <div class="total-income">
                    <h3 class="total-inc" id= "total-Expenditure">Total Expenditure</h3>
                    <p>0</p>
                </div>
            </div>
             <div class="transaction">
                <div class="show-more inc">
                    <button class="btn inc" id="show-expenditure">Show Expenditure</button>
                    <p class="heading">All Expenditure Listed Below<p>
                    <table class="data-generator" id= "expense-data"></table>
                </div>
                <div class="show-more exp">
                    <button class="btn inc"id="show-income">Show Income</button>
                    <p class="heading">All Income Listed Below</p>
                    <table class="data generator" id = "income-data">
                    
                    </table>
                </div>
            </div>
    </div>
  `;    
  container.appendChild(homeContent);
  updateHomeUI();

});
