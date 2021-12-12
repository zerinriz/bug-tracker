import config from "./config/config";
import mongoose from "mongoose";
import app from "./express";

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(() => console.log(`Error connecting to MongoDB ${config.mongoUri}`));

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("server started on port %s.", config.port);
});
