const express = require('express');
const { getAllMahasiswas } = require('../controllers/mahasiswaController');
const router = express.Router();


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
router.get("/", getAllMahasiswas)

module.exports = router