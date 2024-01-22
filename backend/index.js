const express = require('express')
const cors = require('cors')

const db = require("./database Mysql/index.js")
const routeProduct=require('./route/route.js')

const port = 5001
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', routeProduct)





app.listen(port, () => {
  console.log(`listening on ${port}`)
})
