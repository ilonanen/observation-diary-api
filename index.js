const express = require('express')
const app = express()
const bodyparser = require('body-parser')

const port = 3000

app.use(bodyparser.json())

let havikset = [
    {lisatty: '12', pvm: '12.11.2020', laji: 'punavarpunen', paikka: 'Ruissalo'},
    {lisatty: '13', pvm: '15.11.2020', laji: 'kuningaskalastaja', paikka: 'Halinen'}
]

// Hae kaikki havainnot
app.get("/api/havainnot", (req, res) => {
    res.json(havikset)
})

// Lisää havainto
app.post('/api/havainnot', (req, res) => {
    const havis = {'lisatty': Date.now(), ...req.body}
    havikset = [havis, ...havikset]

    res.json(havis)
})

// Poista havainto
app.delete('/api/havainnot/:lisatty', (req, res) => {
    const lisatty = req.params.lisatty
    havikset = havikset.filter(havis => havis.lisatty != lisatty)
    res.status(204).end()
})

// Päivitä havainto
app.put('/api/havainnot/:lisatty', (req, res) => {
    const lisatty = req.params.lisatty
    const paivitettyHavis = {'lisatty': lisatty, ...req.body}

    const index = havikset.findIndex(havis => havis.lisatty === lisatty)
    havikset.splice(index, 1, paivitettyHavis)

    res.json(paivitettyHavis)

})

app.listen(process.env.PORT || port, () => {
    console.log(`App running on port {port}`)
})