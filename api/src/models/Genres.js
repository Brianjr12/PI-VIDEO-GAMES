import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Genre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },{timestamps:false});
};
