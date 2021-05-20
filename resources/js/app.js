import axios from 'axios'
import { initAdmin } from './admin'
import moment from 'moment'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(food){
    axios.post('/update-cart',food).then(res =>{
        cartCounter.innerText = res.data.totalQty
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
    })
})

//remove alert

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}
initAdmin()