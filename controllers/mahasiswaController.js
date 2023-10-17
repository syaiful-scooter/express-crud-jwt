// const MahasiswaModel = require("../models/mahasiswamodel")
const {MahasiswaModel} = require('../models')

exports.getAllMahasiswas = async(req, res) => {
    try {
        const mahasiswas =  await MahasiswaModel.findAll();
        return res.status(200).json({
            status : "Success",
            data : mahasiswas
        })
    } catch (error) {
        return res.status(500).json({
            status : "Fail",
            error : " Data Mahasiswa tidak ditemukan"
        })
    }
}