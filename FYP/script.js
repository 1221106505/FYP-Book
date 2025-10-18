// 🛒 Cart functions
let cart = JSON.parse(localStorage.getItem("cart")) || [
  { movie: "Avengers: Endgame", qty: 2, price: 20 },
  { movie: "Joker", qty: 1, price: 15 }
];

// 🧾 Display Cart
if (document.getElementById("cartItems")) {
  const cartDiv = document.getElementById("cartItems");
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `<p>${item.movie} (x${item.qty}) - RM${item.price * item.qty}</p>`;
    cartDiv.appendChild(itemDiv);
    total += item.price * item.qty;
  });

  document.getElementById("totalAmount").innerText = total.toFixed(2);
  localStorage.setItem("totalAmount", total);
}

// 💳 Payment Page
if (document.getElementById("paymentTotal")) {
  const total = localStorage.getItem("totalAmount");
  document.getElementById("paymentTotal").innerText = total;
}

// ✅ Confirm Payment
function confirmPayment() {
  const name = document.getElementById("cardName").value;
  const card = document.getElementById("cardNumber").value;
  const cvv = document.getElementById("cvv").value;
  const total = localStorage.getItem("totalAmount");

  if (name && card && cvv) {
    const paymentHistory = JSON.parse(localStorage.getItem("history")) || [];
    paymentHistory.push({
      name: name,
      total: total,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("history", JSON.stringify(paymentHistory));
    alert("Payment successful!");
    localStorage.removeItem("cart");
    window.location.href = "History.html";
  } else {
    alert("Please fill in all payment details.");
  }
}

// 📜 Load History
if (document.getElementById("historyList")) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const listDiv = document.getElementById("historyList");

  if (history.length === 0) {
    listDiv.innerHTML = "<p>No payment history found.</p>";
  } else {
    history.forEach((entry) => {
      const item = document.createElement("div");
      item.classList.add("history-item");
      item.innerHTML = `<p><strong>${entry.name}</strong> paid RM${entry.total} on ${entry.date}</p>`;
      listDiv.appendChild(item);
    });
  }
}

// 🔁 Navigation
function goToPayment() {
  window.location.href = "Payment.html";
}

function goBack() {
  window.history.back();
}
