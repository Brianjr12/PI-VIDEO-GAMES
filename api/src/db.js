import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";
import { readdirSync } from "fs";
// import { basename as _basename, join } from 'path';
import { fileURLToPath } from "url";
import { dirname, basename as _basename, join } from "path";
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
// const basename = _basename(__filename);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = _basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// readdirSync(join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(join(__dirname, '/models', file)));
//   });

readdirSync(join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(async (file) => {
    // const modelDefiner = (await import(join(__dirname, "models", file))).default;
    const modelDefiner = (await import(`./models/${file}`)).default;

    modelDefiners.push(modelDefiner);
  });

// Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// export default {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
// };

export default {
  ...sequelize.models,
  conn: sequelize,
};

export const conn = sequelize;
export const PORT = process.env.PORT || 3001;
