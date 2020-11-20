const db = require('./dbconfig')

// Hae kaikki havainnot
const haeHavainnot = (req, res) => {
    db.query('SELECT * FROM havainnot', (err, result) => {
        if (err)
            {console.error(err)}
        else
            {res.json(result.rows)}
    })
}

// Hae havainto lajin perusteella
const haeHavainto = (req, res) => {
    const query = {
        text: 'SELECT * FROM havainnot WHERE laji = $1',
        values: [req.params.laji],
    }

    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        else {
            if (result.rows.length > 0) {
                res.json(result.rows)
            }
            else {
                res.status(404).end()
            }
        }
    })
}

// Lisää havainto
const lisaaHavainto = (req, res) => {
    const uusiHavis = req.body

    const query = {
        text: 'INSERT INTO havainnot (pvm, laji, paikka) VALUES ($1, $2, $3)',
        values: [uusiHavis.pvm, uusiHavis.laji, uusiHavis.paikka],
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
    res.json(uusiHavis)
}

// poista havainto
const poistaHavainto = (req, res) => {
    const query = {
        text: 'DELETE FROM havainnot WHERE id = $1',
        values: [req.params.lisatty],
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
    res.status(204).end()
}

// Muokkaa havaintoa
const paivitaHavainto = (req, res) => {
    const muokattuHavis = req.body
    const query = {
        text: 'UPDATE havainnot SET pvm = $1, laji = $2, paikka = $3 WHERE id = $4',
        values: [muokattuHavis.pvm, muokattuHavis.laji, muokattuHavis.paikka, req.params.id]
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
    res.json(muokattuHavis)
}

module.exports = {
    haeHavainnot: haeHavainnot,
    haeHavainto: haeHavainto,
    lisaaHavainto: lisaaHavainto,
    poistaHavainto: poistaHavainto,
    paivitaHavainto: paivitaHavainto
}