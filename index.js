const express = require('express')
const bodyparser = require('body-parser')
const query = require('./db/havainnot')
const JwksRsa = require('jwks-rsa')
const jwt = require('express-jwt')

const port = 3000

const app = express()
app.use(bodyparser.json())

const checkJwt = jwt({
    secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-sc8jdyu7.eu.auth0.com/.well-known/jwks.json`
    }),
    audience: 'https://havaintopaivakirja-api',
    issuer: `https://dev-sc8jdyu7.eu.auth0.com/`,
    algorithms: ['RS256']
})
app.use(checkJwt)

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.get("/api/havainnot", query.haeHavainnot)
app.get("/api/havainto", query.haeHavainto)
app.post('/api/havainnot', query.lisaaHavainto)
app.delete('/api/havainnot/:lisatty', query.poistaHavainto)
app.put('/api/havainnot/:lisatty', query.paivitaHavainto)

app.listen(process.env.PORT || port, () => {
    console.log(`App running on port {port}`)
})