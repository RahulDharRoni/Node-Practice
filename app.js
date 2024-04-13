const express = require('express');
var morgan = require('morgan');

const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'developments') {
  app.use(morgan('dev'));
}

//2. Middleware

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3. Routes
//Mounting
//And actually, mounting the routers,has to come after all of these definitions or at least after we declared a variable.
app.use('/api/tours', tourRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
