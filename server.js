const express = require ('express')
const mongoose = require ("mongoose")
const articleRouter =require("./routs/articles")
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog-web', {useNewUrlParser:true, useUnifiedTopology:true})


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
//async 내 붙였음
app.get('/', async (req,res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index',{articles:articles})
})

app.use('/articles', articleRouter)
app.listen(2000)

