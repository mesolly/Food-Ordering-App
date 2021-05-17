import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(food){
    axios.post('/update-cart',food).then(res =>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            text: "Notification text"
        }).show();
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
    })
})