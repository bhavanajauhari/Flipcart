
const api_url = "https://fakestoreapi.com/products";
var allData = [];
async function getapi() {
    let itemdata = JSON.parse(localStorage.getItem("itemDetail"));
console.log(itemdata);
 let res = await fetch(api_url).then(res=>res.json()).then(res=>res);
let clickitem = res.filter(i=>i.id==itemdata)
console.log(clickitem);
clickitem.map((i) => {
    document.getElementById("demo").innerHTML += `<div class="detailcarddata" onclick="DetailsGo(${i.id})"><div class="detailimage"><img  id="detailcardimage" src="${i.image}" alt="Product" ></div>
    <div class="details"><h3>${i.title}</h3><div class="detailprice">Price:${i.price}</div><br><b>Rating:</b><span class="detailrate">${i.rating.rate}</span><br><br><b>Details:</b> ${i.description}</div>
    </div><br><br><button onclick=cart(${i.id})>Add to Cart</button>    <button onkeypress="gotoCart()">Go to Cart</button>`;
  });
 
}
getapi()


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


