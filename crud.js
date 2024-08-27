let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(166, 7, 7)";
  }
}

// Create Product
let dataProd;
if (localStorage.getItem("product") != null) {
  dataProd = JSON.parse(localStorage.getItem("product"));
} else {
  dataProd = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataProd.push(newPro);
      }
    } else {
      dataProd.push(newPro);
    }
  } else {
    dataProd[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  localStorage.setItem("product", JSON.stringify(dataProd));

  clearData();
  showData();
};
// clear Data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  let table = "";
  getTotal();
  for (let i = 0; i < dataProd.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${dataProd[i].title}</td>
    <td>${dataProd[i].price}</td>
    <td>${dataProd[i].taxes}</td>
    <td>${dataProd[i].ads}</td>
    <td>${dataProd[i].discount}</td>
    <td>${dataProd[i].total}</td>
    <td>${dataProd[i].count}</td>
    <td>${dataProd[i].category}</td>
    <td><button onclick="updateData(${i})">Update</button></td>
    <td><button onclick=deleteData(${i})>Delete</button></td>
  </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");
  if (dataProd.length > 0) {
    deleteBtn.innerHTML = `<button onclick="deleteAll() ">Delete All (${dataProd.length})</button>`;
  } else {
    deleteBtn.innerHTML = "";
  }
}
showData();

//DELETE

function deleteData(id) {
  dataProd.splice(id, 1);
  localStorage.product = JSON.stringify(dataProd);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataProd.splice(0);
  showData();
}

// UPDATE

function updateData(id) {
  title.value = dataProd[id].title;
  price.value = dataProd[id].price;
  taxes.value = dataProd[id].taxes;
  ads.value = dataProd[id].ads;
  discount.value = dataProd[id].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProd[id].category;
  submit.innerHTML = "UPDATE";
  mood = "update";
  tmp = id;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//Search
let searchMood = "title";
let search = document.getElementById("search");
function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By category";
  }
  //   search.focus();
  search.value = "";
  showData(); 
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].count}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick=deleteData(${i})>Delete</button></td>
          </tr>
            `;
      }
    }
  } else {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
              <tr>
              <td>${i}</td>
              <td>${dataProd[i].title}</td>
              <td>${dataProd[i].price}</td>
              <td>${dataProd[i].taxes}</td>
              <td>${dataProd[i].ads}</td>
              <td>${dataProd[i].discount}</td>
              <td>${dataProd[i].total}</td>
              <td>${dataProd[i].count}</td>
              <td>${dataProd[i].category}</td>
              <td><button onclick="updateData(${i})">Update</button></td>
              <td><button onclick=deleteData(${i})>Delete</button></td>
            </tr>
              `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
