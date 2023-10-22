// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// export default (sequelize) => {
//   // defino el modelo
//   sequelize.define('videogame', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
// };

import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("videogame", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
