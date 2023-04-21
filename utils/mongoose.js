import mongoose from "mongoose";

const host = process.env.MONGO_HOST || "mongo-stack";
const port = process.env.MONGO_PORT || 27017;
const db = process.env.MONGO_DB || "stack";
const MONGODB_URI = `mongodb://${host}:${port}/${db}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectarse a MongoDB: ", error));

export default mongoose;
