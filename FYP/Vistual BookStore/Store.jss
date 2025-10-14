// --- Store.js ---
// Default books (you can edit or add more)
const defaultBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 39.90, stock: 10 },
  { id: 2, title: "Harry Potter", author: "J.K. Rowling", price: 49.90, stock: 8 },
  { id: 3, title: "The Psychology of Money", author: "Morgan Housel", price: 35.00, stock: 5 },
  { id: 4, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 45.00, stock: 7 }
];

// Load books from localStorage or use default
let books = JSON.parse(localStorage.getItem("books")) || defaultBooks;

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Price: RM ${book.price.toFixed(2)}</p>
      <p>Stock: ${book.stock}</p>
      <button onclick="buyBook(${book.id})">Buy</button>
    `;
    bookList.appendChild(card);
  });
}

function buyBook(id) {
  const book = books.find(b => b.id === id);
  if (book.stock > 0) {
    book.stock--;
    saveBooks();
    alert(`You bought "${book.title}" for RM${book.price.toFixed(2)}.`);
    displayBooks();
  } else {
    alert(`Sorry, "${book.title}" is out of stock!`);
  }
}

function goBack() {
  window.location.href = "Main.html";
}

displayBooks();
