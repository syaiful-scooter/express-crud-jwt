const { MahasiswaModel } = require("../models");

exports.getAllMahasiswas = async (req, res) => {
  try {
    const mahasiswas = await MahasiswaModel.findAll();
    return res.status(200).json({
      status: "Success",
      data: mahasiswas,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error: " Data Mahasiswa tidak ditemukan",
    });
  }
};

exports.getOneMhs = async (req, res) => {
  try {
    const id = req.params.id;
    const mhs = await MahasiswaModel.findByPk(id);

    if (!mhs) {
      return res.status(400).json({
        status: "Fail",
        error: "Id mahasiswa tersebut tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: mhs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error: "Block Error from try catch",
    });
  }
};

exports.simpanMhs = async (req, res) => {
  try {
    const { nim, nama, prodi, alamat } = req.body;

    if (!nim) {
      res.status(400).json({
        status: "Fail to save mhs",
        error: "Nim is Mandatory",
      });
      process.exit();
    }

    const simpanDataMhs = await MahasiswaModel.create({
      nim,
      nama,
      prodi,
      alamat,
    });

    res.status(201).json({
      status: "Simpan Berhasil",
      data: simpanDataMhs,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail to save mhs",
      error: error.errors,
    });
  }
};

exports.editMhs = async (req, res) => {
    try {
        const id = req.params.id
        
        const ketemu = await MahasiswaModel.findByPk(id);
        if (!ketemu){
            return res.status(404).json({
                status:"Fail",
                error : "Data id Mhs Not Found"
            })
        }
        
        await MahasiswaModel.update(req.body, { where : {id:id} } );

        return res.status(200).json({
            status : "Success",
            data : ketemu
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status : "Fail",
            error : "Server gone away"
        })
    }
}

exports.hapusMhs = async (req, res) => {
    try {
        const id = req.params.id
        const ketemuMhs = await MahasiswaModel.findByPk(id)
        
        if(!ketemuMhs){
            res.status(404).json({
                status : "Fail",
                error : "Data Mhs tersbut tidak ditemukan"
            })
            process.exit()
        }
        
        await MahasiswaModel.destroy({
            where: {id:id}
        });

        return res.status(200).json({
            status : `Hapus Mhs id : ${id} Berhasil`
        })

    } catch (error) {
        return res.status(500).json({
            status : "Fail",
            error : "Server Down"
        })
    }
}
