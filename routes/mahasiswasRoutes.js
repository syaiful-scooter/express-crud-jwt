const express = require('express');
const { getAllMahasiswas, getOneMhs, simpanMhs, editMhs, hapusMhs } = require('../controllers/mahasiswaController');
const router = express.Router();

router.get("/", getAllMahasiswas)
router.post("/:id", getOneMhs)
router.post("/", simpanMhs)
router.put("/:id", editMhs)
router.delete("/:id", hapusMhs)

module.exports = router

