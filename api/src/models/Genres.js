import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Genre",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
};
