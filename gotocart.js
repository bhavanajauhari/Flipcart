
const api_url = "https://fakestoreapi.com/products";
var allData = [];
var main=[];
var CartItem=[]
async function getapi() {
    // let cartdata = JSON.parse(localStorage.getItem("cartdata"));
    // console.log(cartdata)
 allData = await fetch(api_url).then(car=>car.json()).then(car=>car);

   await gotoCart()
}

let date= new Date().toDateString()




const ShowList  =(CartItem)=>{
  console.log("op");
  totalsum()
  document.getElementById("goto").innerHTML=""
  CartItem.map((a=>{
    document.getElementById("goto").innerHTML += `<div class="cart"><div class="main"><div class="detailcarddata"><div class="detailimage"><img  id="detailcardimage" src="${a.image}" alt="Product" ></div>
    <div class="details"><h3>${a.title}</h3><div class="date">${date}</div><br><div class="detailprice">Price:  <div class="cutprice">$${a.price} </div> <div class="newprice"> $${a.price-1}</div></div><br><b>
    Rating:</b><span class="detailrate">${a.rating.rate}</span><br><br></div></div><br><br><div class="quantity"><div class="minusbtn"><button class="minus" onclick="sub(${a.id})">-</button></div><div class="textbtn">
    <input value="${a.quantity}" type="text" class="num" id="${a.id}"></div><div class="plusbtn"><button class="plus" onclick="sum(${a.id})">+</button></div><b class="save">SAVE FOR LATER</b> 
    <b class="remove">REMOVE</b></div></div></div>`;
})) 

}
function gotoCart() {
    let storedata = JSON.parse(localStorage.getItem("cartitem"));
 main=allData.filter(a=>storedata.includes(a.id))
   CartItem  = main.map(i=>{
    return {...i,quantity:1}
  })
  console.log(CartItem);
  ShowList(CartItem)


  }


  function sum(id){

    let select = CartItem.findIndex(i=>i.id==id);
    let quantities = CartItem[select].quantity
    CartItem.splice(select,1,{...CartItem[select],quantity:++quantities })

    ShowList(CartItem)

  }

  function sub(id){
    let select = CartItem.findIndex(i=>i.id==id);


    let quantities = CartItem[select].quantity
    CartItem.splice(select,1,{...CartItem[select],quantity:--quantities })
    ShowList(CartItem)

  }
function totalsum(){
  let count=1
 var totalamount= document.getElementById('price').innerHTML=CartItem.map(i=>i.price*i.quantity).reduce((total,num)=>{
  count++;
    return total+=num
    
  } )
  document.getElementById('itemnum').innerText=`Price(${count} item):`
 let discounted=document.getElementById('total').innerHTML=Math.ceil(totalamount*95/100)
 document.getElementById('saving').innerHTML=document.getElementById('discount').innerHTML=Math.ceil(totalamount-discounted)

  
}
  

  getapi()