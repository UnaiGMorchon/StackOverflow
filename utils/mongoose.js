import mongoose from "mongoose";

/**
 * Conexión a MongoDB usando mongoose
 * @module mongoose
 */

const host = "localhost";
const port = process.env.MONGO_PORT || 27020;
const db = process.env.MONGO_DB || "stack";
const MONGODB_URI = `mongodb://${host}:${port}/${db}`;

/**
* Conexión a MongoDB usando mongoose
* @function
* @name connectToMongoDB
* @throws {Error} Si hay un error al conectarse a la base de datos.
* @returns {void} Promesa que se resuelve cuando se establece la conexión con éxito.
*/

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectarse a MongoDB: ", error));

export default mongoose;
