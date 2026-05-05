const express= require('express');
const fs= require('fs');
const app=express();

app.use(express.static('public'));

app.get('/api/products',(req,res)=>{
   
    const products= JSON.parse(fs.readFileSync('products.json','utf8'));
    res.json(products);
});


app.listen(3000, ()=>{
  console.log('Server Running at http://localhost:3000');
});