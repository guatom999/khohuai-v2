const {firestore } = require('../firebaseDB');

const Invoice = require("../Models/Invoice");
const omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
})

const checkoutCreditCard = async (req, res, next) => {
  // console.log("เข้ามาแล้ว")
    const { email, uid ,macart,amount,token } = req.body;
    console.log("Test =========>" , email)
    try {
      const customer = await omise.customers.create({
        email,
        description: uid,
        card: token,
      })
      const charge = await omise.charges.create({
        amount,
        currency: "thb",
        customer: customer.id
      })
      createinvoice(charge,macart,uid)
      console.log("Charge ========> " , charge)
      res.send({
        amount : charge.amount,
        status: charge.status,
      })
      
    } catch (err) {
      console.log("ตรงนี้")
      console.log(err)
    }
    next()
}

const createinvoice = async (data,doto,idUser) => {
  const charge = data;
  const Mycart = doto;
  const uid = idUser;
  console.log("charge +++++++++++++++++++++", charge)
  try{
    if(charge.status === "successful"){
      console.log("เข้ามานะ")
      const invoice = firestore.collection("invoices").doc(charge.id);
      await invoice.set({
        invoiceid: charge.id,
        userid:uid,
        lottery:Mycart.cart
      }).then((res) => {
        console.log("invoice เพิ่มแล้ว")
      })
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = {
    checkoutCreditCard,
    createinvoice
}