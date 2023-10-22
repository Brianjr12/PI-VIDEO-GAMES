import server from "./src/app.js";
import { conn,PORT } from "./src/db.js";

//*Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     console.log("%s listening at 3001"); // eslint-disable-line no-console
//   });
// });
// const PORT= 3001
const startServer = async () => {
  try {
    await conn.sync({ force: true });
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();


