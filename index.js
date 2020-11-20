const express = require('express')
const bodyparser = require('body-parser')
const query = require('./db/havainnot')

const port = 3000

const app = express()
app.use(bodyparser.json())

let havikset = [
    {lisatty: '12', pvm: '12.11.2020', laji: 'punavarpunen', paikka: 'Ruissalo'},
    {lisatty: '13', pvm: '15.11.2020', laji: 'kuningaskalastaja', paikka: 'Halinen'}
]


app.get("/api/havainnot", query.haeHavainnot)
app.get("/api/havainto", query.haeHavainto)
app.post('/api/havainnot', query.lisaaHavainto)
app.delete('/api/havainnot/:lisatty', query.poistaHavainto)
app.put('/api/havainnot/:lisatty', query.paivitaHavainto)

app.listen(process.env.PORT || port, () => {
    console.log(`App running on port {port}`)
})