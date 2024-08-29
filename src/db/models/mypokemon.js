'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MyPokemon.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    image: DataTypes.TEXT,
    is_renamed: DataTypes.BOOLEAN,
    number_one_is_out: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'my_pokemons',
  });
  return MyPokemon;
};