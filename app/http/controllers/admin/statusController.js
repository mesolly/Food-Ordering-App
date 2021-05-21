const {orderSchema} = require('../../../models/order')
function statusController(){
    return{
        update(req,res){
            orderSchema.updateOne({ _id : req.body.orderId }, { status : req.body.status },(err,data)=>{
                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = statusController
