const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/sample').then(() => {
    console.log('Connected to database');
    const Schema =mongoose.Schema
    const orderSchema = new Schema({ name: String,qty:Number,price:Number,desc:String})
    const ordermodel = mongoose.model('orders',orderSchema);
    app.use(express.json());
app.get('/getOrders',async (req, res) =>{
    try {
        const orders = await ordermodel.find();
        res.send(orders);
    } 
    catch (err) {
        console.log("Data not Found");
    }
    
});
app.post("/addorder", async (req, res) => { 
    //const order = new ordermodel(req.body);
    try {
        await ordermodel.create(req.body);
        res.send("order created");
    } 
    catch (err) {
        console.log("No data");
    }
});
});

 
app.get('/start', (req, res) => {
console.log('start');
res.end('Welcome');
});
app.listen(7000,()=>{
    console.log("started");

});
