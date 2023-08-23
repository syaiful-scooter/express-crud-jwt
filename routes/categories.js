const express =require('express');
const router = express.Router()


// Routing
// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.get('/', (req, res) => {
  res.json({
    message : 'Hello World!', 
    data:[
        {
            id:'01', nama:"Iphone"
        },
        {
            id:'02', nama:"Android"
        }
    ]
    })
})

router.post('/', (req, res) => {
  res.send('Got a POST request. dari method post')
})

// localhost:3000/api/v1/categories/users/4546/books/789
router.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

router.get('/:cat', (req, res) => {
  res.send(`Ini Endpoint dari route param ${req.params.cat}`)
})

module.exports = router