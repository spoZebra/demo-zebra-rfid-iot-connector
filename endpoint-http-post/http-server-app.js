const express = require('express')
const app = express()
const port = 3000

// Body parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

// Endpoint hostname to configure on IoT Connector => http://local_ip_address:3000/fx
app.post('/fx/', (req, res) => {
  console.log(req.body)
  res.send()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})