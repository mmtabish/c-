import {express} from express;


const app =express();

app.get('/api/products', (req, res) => {
    const products= [ 

        {
            name:"john",
            id: 1,
            gmail: "mmts@gmail.com"
            

        }
    ]

    if(req.query.search){
       const filterProducts = products.filter( product => 
        product.name.includes(req.query.search))
        res.send(filterProducts)
        return; 
    }

    setTimeout(() =>{
        res.send(products);
    }, 3000)
})

const  port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});