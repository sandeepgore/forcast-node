const geocode=require('./util/geocode')
const infotoday=require('./util/infoToday')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const pubDirPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//to show path from current directory
//hbs directory initialization

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialPath)
//console.log(pubDirPath)
//console.log(partialPath)

//app static view from this it becomes root file
app.use(express.static(pubDirPath))
//console.log(__dirname,'../public')
// app.set('view engine','hbs')


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "sandeep"
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: " helping you ",
        name: "sandeep"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'sandeep'
    })

})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'please provide address'})
    }

           geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
                   if(error){
                       return res.send({error})
                   }

                   infotoday(longitude,latitude,(error,data)=>{
                        if(error)
                        {
                            return res.send({error})
                        }

                        res.send({
                            forcast:data,
                            location,
                            address:req.query.address
                        })
                   })
           })







    // res.send({
    //     forcast: 'no cchange',
    //     location: 'pune',
    //     address:req.query.address,
    //     geocode(address,callback)
    // })
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send('please provide search term')
//     }
//           console.log(req.query)
//     res.send({
//         products: []
//     })
// })


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'help artical not found',
        name: 'sandeep'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'page not found',
        name: 'sandeep'
    })
})

app.listen(3000, () => {
    console.log("i'm in port 3000")
})

