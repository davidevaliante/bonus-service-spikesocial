const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const path = require("path");

const app = next({ dev })
const port = parseInt(process.env.PORT, 10) || 3000

const handle = app.getRequestHandler()


app.prepare().then(() => {
    const server = express()


    // verifica canale da bar
    server.get('/google78b70bd68a396ac5.html', (req, res) => {
        res.download(
            path.join(__dirname, "./public/files/google78b70bd68a396ac5.html")
        );
    })

    server.get('*', (req, res) => handle(req, res))

    server.post('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})

// const cacheableResponse = require('cacheable-response')
// const express = require('express')
// const next = require('next')
// const compression = require('compression');

// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })

// const handle = app.getRequestHandler()

// const ssrCache = cacheableResponse({
//     ttl: dev ? 20 : 1000 * 60 * 60, // 1hour
//     get: async ({ req, res, pagePath, queryParams }) => {
//         const data = await app.renderToHTML(req, res, pagePath, queryParams)

//         // Add here custom logic for when you do not want to cache the page, for
//         // example when the page returns a 404 status code:
//         if (res.statusCode === 404) {
//             res.end(data)
//             return
//         }

//         return { data }
//     },
//     send: ({ data, res }) => res.send(data),
// })


// app.prepare().then(() => {
//     const server = express()
//     server.use(compression())

//     server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

//     server.get('/slot/:slug/:countryCode', (req, res) => {
//         return ssrCache({ req, res, pagePath: `/slot/${req.params.slug}/${req.params.countryCode}` })
//     })

//     server.get('/slots/:countryCode', (req, res) => {
//         const queryParams = { countryCode: req.params.countryCode }
//         const pagePath = `/slots/${req.params.countryCode}`
//         return ssrCache({ req, res, pagePath, queryParams })
//     })

//     server.get('/producer/:slug/:countryCode', (req, res) => {
//         const queryParams = { countryCode: req.params.countryCode }
//         const pagePath = `/producer/${req.params.slug}/${req.params.countryCode}`
//         return ssrCache({ req, res, pagePath, queryParams })
//     })

//     server.get('/blog/:id', (req, res) => {
//         const queryParams = { id: req.params.id }
//         const pagePath = '/blog'
//         return ssrCache({ req, res, pagePath, queryParams })
//     })

//     server.get('*', (req, res) => handle(req, res))

//     server.listen(port, err => {
//         if (err) throw err
//         console.log(`> Custom server ready on http://localhost:${port}`)
//     })
// })

