const express = require('express')
const mongoose = require('mongoose');
const app =express();

const cors = require("cors");
const product = require('./model/Productmodel');


const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send ("Server is Running");

});
app.get('/Blog', (req,res)=>{
    res.send ("Server is Running for blog page");

});

//Get Products data 


app.get('/notice' , async(req,res)=>{
    try {

        const Product = await product.find({})
        res.status(200).json({Product});
        
    } catch (error) {
        console.log(error.messege)
        res.status(500).json({messege: error.messege});

        
    }

});

// Get a single product data by id 

app.get('/notice/:id' , async(req,res)=>{
    try {
        const {id} = req.params

        const Product = await product.findById(id)
        res.status(200).json({Product});
        
    } catch (error) {
        console.log(error.messege)
        res.status(500).json({messege: error.messege});

        
    }

});



//post a product data 
app.post('/notice' , async(req,res)=>{
    try {

        const Product = await product.create(req,res)
        res.status(200).json({Product});
        
    } catch (error) {
        console.log(error.messege)
        res.status(500).json({messege: error.messege});

        
    }

});

//update product data 

app.put ('/notice/:id',async(req,res)=>{
    try {
        const {id}= req.params;
    const Product = await product.findById(id , req.body)

    if (!Product){
        return res.status(404).json({messege:`Could not find any Data with this Id ${id}`})
    }

    const updatedata = await product.findById(id)
    res.status(200).json( updatedata)
    
    } catch (error) {
        res.status(500).json({messege: error.messege});
        
    }
});

//delete a product 

app.delete('/notice/:id',async(req, res)=>{
    try {
        const {id}= req.params;
    const Product = await product.findById(id , req.body)

    if (!Product){
        return res.status(404).json({messege:`Could not find any Data with this Id ${id}`})
    }

    
    res.status(200).json(Product)
    
    } catch (error) {
        res.status(500).json({messege: error.messege});
        
    }
})



mongoose.connect(`mongodb+srv://jubairzaman01:MWcY82JN0xeJGt4R@cluster0.rus91qk.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(PORT, () => {
            console.log("Server running at port",PORT);
          });
        console.log("Connected To Mongodb");
    }).catch((error)=>{
        console.log(error)
    });
