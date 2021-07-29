console.log('hi')
// require('dotenv').config()
const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
// const dataArticle = require('./data.json')
const random = Math.floor(Math.random() * (13 - 0 + 1) + 0)
app.use(express.json()) // Um die Daten in json Format umzuwandeln
app.use(express.urlencoded({ extended: true }))
const appName = 'DESIGN SHOP'
const currentDay = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
const fileSyst = require('fs')
// ...rest of the initial code omitted for simplicity.
// const { body, validationResult } = require('express-validator');
// const nodemail = require('nodemailer')
const fetch = require('node-fetch');
const Shop_Article = require('./models/shop_article')

const dBuri = 'mongodb+srv://SuperCoder:supercode@clustershop.wsfrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dBuri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log('connected to mongodb')
        app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })
    })
    .catch((err) => {
        res.end()
    })



app.use(express.static('public'))
app.set('view engine', 'ejs')
// console.log(process.env.dBurl)

app.get('/', (req, res) => {
    Shop_Article.find()
        .then((result) => {
            console.log(result)
            res.render('index', { myPageTitle: `${appName}|HOME`, dataFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/add', (req, res) => {
    res.render('add', { myPageTitle: `${appName}|ADD ARTICLE` })
})
app.post('/add', (req, res) => {
    console.log(req.body)
    const shop_article = new Shop_Article({
        ProductName: req.body.ProductName,
        Company: req.body.Company,
        Price: req.body.Price,
        ProductLink: req.body.ProductLink,
        LinkShop: req.body.LinkShop
    })
    shop_article.save()
        .then((result) => {
            console.log('added article to db');
            res.redirect('/add');
        })
        .catch((err) => { console.log(err) })
})

app.get('/cheap', (req, res) => {
    Shop_Article.find()
        .then((result) => {
            console.log(result)
            res.render('/', { myPageTitle: `${appName}|HOME`, dataFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/add', (req, res) => {
    Shop_Article.find()
        .then((result) => {
            console.log(result)
            res.render('/add', { myPageTitle: `${appName}|ADD ARTICLE`, dataFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

// app.get('/ginMenu', (req, res) => {
//     fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`)
//         .then(result => result.json())
//         .then(data => {
//             console.log(data)
//             res.end()
//         });
// })

// app.post('/', (req, res) => {
//     console.log(req.body)
//     dataArticle.push({
//         id: dataArticle.length,
//         url: req.body.urlPicture,
//         title: req.body.title,
//         body: req.body.text,
//         published_at: currentDay,
//         author: req.body.author,
//         author_bild: req.body.authorPic
//     })
//     console.log(dataArticle)
//     fileSyst.writeFile('./data.json', JSON.stringify(dataArticle), 'utf8', (err) => {
//         if (err) throw err
//     })
//     res.redirect('/newArticle')
// })

