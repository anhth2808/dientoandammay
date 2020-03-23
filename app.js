const express = require("express")
const bodyParser = require('body-parser');
const firebase = require('firebase')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

//
firebase.initializeApp({
  serviceAccount: "./products-fdfda-95d0ad427a8c.json",
  databaseURL: "https://products-fdfda.firebaseio.com"
})
const ProductsRef =  firebase.database().ref('Products')


app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set('views', 'views')

// routes
app.get("/", (req, res) => {
  const data = []
  ProductsRef.once('value')
    .then((snap) => {
      // console.log(snap.key, "\n\n")
      // console.log(snap.ref.toString(), "\n\n")
      snap.forEach(e => {
        data.push(e.val())
      })
      // res.send("123")
      res.render('./product/index', {
        products: data
      })
    })
})


app.get("/create", (req, res) => {
  res.status(500).render('./product/product-create', { 
  });
})

app.post("/create", (req, res) => {
  let title = req.body.title
  let price = req.body.price
  if (title && price) {
    ProductsRef.push({
      title: title,
      price: price
    })
    .then(result => {
      console.log('Created product')
      res.redirect('/')
    })
    .catch(err => {
      console.log(err)
    })
  }
})

app.get("/api", (req, res) => {
  const data = []
  ProductsRef.once('value')
    .then((snap) => {
      snap.forEach(e => {
        data.push(e.val())
      })
      res.json(data)
    })
})

app.listen( process.env.PORT || 6969)