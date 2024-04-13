const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

dotenv.config({ path: './config.env' });

//3 Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listen successfully');
});
