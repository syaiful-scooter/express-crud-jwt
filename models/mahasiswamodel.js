'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MahasiswaModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MahasiswaModel.init({
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    prodi: DataTypes.STRING,
    alamat: DataTypes.STRING,
    qr_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MahasiswaModel',
    tableName: 'mahasiswas'
  });
  return MahasiswaModel;
};