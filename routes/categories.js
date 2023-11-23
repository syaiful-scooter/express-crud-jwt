const express = require('express');
const router = express.Router();
const {getAllCategories, storeCategory, detailsCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const {authMiddleware, permissionUser} = require("../middleware/UserMiddleware")

const dataRole = ["admin", "user"]
const dataRole2 = ["admin"]
// Routing
// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// router.get('/', (req, res) => {
//   res.json({
//     message : 'Hello World!', 
//     data:[
//         {
//             id:'01', nama:"Iphone"
//         },
//         {
//             id:'02', nama:"Android"
//         }
//     ]
//     })
// })

// Read data dg findAll
router.get('/', authMiddleware, permissionUser(...dataRole2), getAllCategories)

// Detail data 
router.get('/:id', authMiddleware, permissionUser(...dataRole), detailsCategory)

// UPDATE data by param id 
router.put('/:id', authMiddleware, permissionUser(...dataRole2), updateCategory)

// DELETE data by param id 
router.delete('/:id', authMiddleware, permissionUser(...dataRole2), deleteCategory)

// router.post('/', (req, res) => {
//   res.send('Got a POST request. dari method post')
// })

//create data
router.post('/', storeCategory)


// localhost:3000/api/v1/categories/users/4546/books/789
router.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

router.get('/:cat', (req, res) => {
  res.send(`Ini Endpoint dari route param ${req.params.cat}`)
})

module.exports = router