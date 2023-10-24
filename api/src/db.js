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

const models = await createTables();
models.forEach((model) => {
  model(sequelize);
  console.log("the model was created");
});

// const { Videogame } = sequelize.models;

export default {
  ...sequelize.models,
  conn: sequelize,
};

export const PORT = process.env.PORT || 3001;
