//Represent Items
class Item {
  constructor(slNo, date, itemName, amount) {
    this.slNo = slNo;
    this.date = date;
    this.itemName = itemName;
    this.amount = amount;
  }
}

// UI CLass: Handle UI Task
class UI {
  static displayItem() {
    let totalAmount = 0;
    const items = Stores.getItem();
    items.forEach((friend) => UI.addItemToList(friend));
    for (let i = 0; i < items.length; i++) {
      totalAmount += parseInt(items[i].amount);
    }
    document.querySelector(".disabled").innerHTML =
      "Balance Amount : " + (32100 - totalAmount).toString();
    document.querySelector(".totalValue").innerHTML = totalAmount;
  }
  static addItemToList(item) {
    const list = document.getElementById("item-list");
    const row = document.createElement("tr");
    console.log(item);

    row.innerHTML = `
        <td class="slNo">${item.slNo}</td>
      <td>${item.date}</td>
      <td>${item.itemName}</td>
      <td>${item.amount}</td>
        `;
    list.appendChild(row);
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} mt-4 text-center fs-4`;
    div.innerHTML = message;
    const container = document.querySelector(".container");
    const form = document.querySelector("#form-group");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFields() {
    document.getElementById("list").value = "";
    document.getElementById("amount").value = "";
  }
}

// Store Class: Handles Storage
class Stores {
  static getItem() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
      document.querySelector(".totalAmount").style.visibility = "hidden";
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }
  static addItem(item) {
    const items = Stores.getItem();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }
}

// Event: Display Items
document.addEventListener("DOMContentLoaded", UI.displayItem);

// Event : Add a Item
document.querySelector("#form-group").addEventListener("submit", (e) => {
  e.preventDefault();

  const item = document.getElementById("list").value;
  const amount = document.getElementById("amount").value;

  const items = Stores.getItem();

  let date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  date += "/" + month + "/" + year;

  if (item === "" || amount === "") {
    UI.showAlert("Please fill in all fields.", "danger");
  } else {
    const itemList = new Item(items.length + 1, date, item, amount);

    UI.addItemToList(itemList);
    document.querySelector(".totalAmount").style.visibility = "visible";

    //Inserting into Local Storage
    Stores.addItem(itemList);

    UI.showAlert("Item Added.", "success");
    UI.clearFields();
  }
});
