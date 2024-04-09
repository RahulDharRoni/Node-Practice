const express = require("express");
var morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Mounting
//And actually, mounting the routers,has to come after all of these definitions or at least after we declared a variable.
app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);

//3 Start Server
const port = 5000;
app.listen(port, () => {
  console.log("Listen successfully");
});
