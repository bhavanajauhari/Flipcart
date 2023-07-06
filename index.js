const api_url = "https://fakestoreapi.com/products";

var allData = [];
async function getapi(url) {
  const response = await fetch(url);

  var data = await response.json();
  console.log("data", data);
  allData = data;

  let catarray = data
    .map((i) => i.category)
    .filter((item, index, self) => self.findIndex((i) => i == item) == index);
  let ratearry = data.map((i) => i.rating.rate);

  console.log(ratearry);

  if (response) {
    hideloader();
  }
  showdata(catarray);
  cardarry(data);
}

getapi(api_url);

function hideloader() {
  document.getElementById("load").style.display = "none";
}

function showdata(catarray) {
  catarray.map((x) => {
    document.getElementById(
      "option"
    ).innerHTML += `<div class="card"><option>${x}</option></div>`;
  });
}

function cardarry(data) {
  document.getElementById("card").innerHTML = "";
  data.map((i) => {
    // console.log(i);
    document.getElementById( "card").innerHTML += `<div class="carddata"><div ><img  id="cardimage" src="${i.image}" alt="Product" onclick="DetailsGo(${i.id})" ></div>
        <h3>${i.title}</h3><div class="price">Price:${i.price}</div><br><b>Rating:</b><span class="rate">${i.rating.rate}</span><br><div class="button">
        <button onclick="cart(${i.id})" class="btnin">Add to Cart</button></div></div>`;
  });
}

function select(select) {
  let filter = allData.filter((i) => i.category == select);
  cardarry(filter);
}

function search(search) {
  console.log(search);

  let searchdata = allData.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  cardarry(searchdata);
}

function price(value) {
  console.log(value);
  let pricesort = [];

  if (value == "Low to High") {
    pricesort = allData.sort((a, b) => a.price - b.price);
    cardarry(pricesort);
  } else if (value == "High to Low") {
    pricesort = allData.sort((a, b) => b.price - a.price);
    cardarry(pricesort);
  }
}

function DetailsGo(data_id) {
  console.log(data_id);
  localStorage.setItem("itemDetail", data_id);

  window.open(`./detail.html?${data_id}`);
}

function gotoCart(a) {
  let storedata = JSON.parse(localStorage.getItem("cartitem"));
  window.open(`./gotocart.html`);

}
let cartarray = [];
function cart(op) {
  let store = JSON.parse(localStorage.getItem("cartitem"));

  if (store == null) {
    cartarray.push(op);
    localStorage.setItem("cartitem", JSON.stringify(cartarray));
  } else {
    let temp = [...store];

    if (!temp.includes(op)) {
      temp.push(op);
      localStorage.setItem("cartitem", JSON.stringify(temp));
    }
  }
}



