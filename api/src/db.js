import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, basename as _basename, join } from "path";

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`;
const sequelize = new Sequelize(URL, { native: false, logging: false });
export const conn = sequelize;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

// We read all the files from the Models folder, request them and add them to the modelDefiners array 
const createTables = async () => {
  try {
    const modelDefiners = await Promise.all(
      readdirSync(join(__dirname, ".", "models"))
        .filter(
          (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        )
        .map(async (file) => {
          const modelDefiner = (await import(`./models/${file}`)).default;
          return modelDefiner;
        })
    );
    return modelDefiners;
  } catch (error) {
    console.log("error creating tables:", error);
  }
};

// injecting the connection (sequelize) to all models
const models = await createTables();
models.forEach((model) => model(sequelize));


// we capitalize the name of the models
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([key, value]) => [
  key[0].toUpperCase() + key.slice(1),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

// We destructure the models to access them more easily
const { Videogame, Genre } = sequelize.models;

// creating relationships for models
Videogame.belongsToMany(
  Genre,
  { through: "VideoGameGenres",timestamps:false },
);
Genre.belongsToMany(
  Videogame,
  { through: "VideoGameGenres", timestamps:false },
);


export default {
  ...sequelize.models,
  conn: sequelize,
};

export const PORT = process.env.PORT || 3001;
