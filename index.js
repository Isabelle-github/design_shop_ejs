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
    Shop_Article.find({ "Price": { $lt: 30 } })
        .then((result) => {
            console.log(result)
            res.render('index', { myPageTitle: `${appName}|CHEAP ARTICLES`, dataFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/addItem', (req, res) => {
    Shop_Article.aggregate([{ $sample: { size: 6 } }])
        .then((result) => {
            console.log(result)
            res.render('addItem', { myPageTitle: `${appName}|ADD ARTICLE`, dataFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
    // res.render('add', { myPageTitle: `${appName}|ADD ARTICLE`, dataFound: result })
})
app.get('/index/:id', (req, res) => {
    console.log(req.params)
    Shop_Article.findById(req.params.id)
        .then((result) => {
            console.log(result)
            res.render('detail', { myPageTitle: `${appName}|PRODUCT DETAILS`, objFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/index/:id/edit', (req, res) => {
    console.log(req.params.id)
    Shop_Article.findById(req.params.id)
        .then((result) => {
            console.log(result)
            res.render('edit', { myPageTitle: `${appName}|EDIT`, objFound: result })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.post('/index/:id/edit', (req, res) => {
    console.log(req.params.id)
    // const updatedContact = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     age: req.body.age
    // }
    // Contact.findByIdAndUpdate(req.params.id, updatedContact)

    Shop_Article.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            console.log(result)
            res.render('detail', { myPageTitle: `${appName}|PRODUCT DETAILS`, objFound: result })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})
app.get('/index/:id/delete', (req, res) => {
    console.log(req.params.id)
    Shop_Article.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log(result)
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})

