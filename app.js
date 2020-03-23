const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const Info = require("./models/Info")

const MONGODB_URI = require("./utils/configs.js").MONGODB_URI

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

//



app.get("/", (req, res) => {
    Info.find({})
        .then(result => {
            console.log(result)
            res.json({
                data: result
            })
            // result.forEach(info => {
            //     res.write(`<h1>${info.title}</h1>`)
            //     res.write(`<p>${info.content}</p>`)
            // })
            res.end()
        })
        .catch(err => {
            console.log(err)
        })

   
})


app.get("/create", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;


    const info = new Info({
        title: title || "info title",
        content: content || "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quasi incidunt placeat eos at totam repudiandae perferendis aspernatur harum. Quam, distinctio quae. Quidem, officiis dolorem corporis harum aperiam pariatur non!"
    })

    info.save()
        .then(result => {
            console.log("Created an info", result)
            res.json({status: 200, message: "Success created"})
        })
        .catch(err => {
            console.log(err)
        })
})



mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen( process.env.PORT || 6969)
  })
  .catch(err => {
    console.log(err)
  })
