// 1. Get DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expenseList');
const totalDisplay = document.getElementById('total');

// 2. Load expenses from localStorage or initialize empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// 3. Function to save expenses
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// 4. Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;
  
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenses();
    };
    
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
    total += expense.amount;
  });
  
  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

// 5. Function to add an expense
function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  
  if (!description || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount!');
    return;
  }
  
  expenses.push({ description, amount });
  saveExpenses();
  renderExpenses();
  
  descriptionInput.value = '';
  amountInput.value = '';
}

// 6. Event listeners for Enter key
descriptionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addExpense();
});
amountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addExpense();
});

// 7. Initial render
renderExpenses();