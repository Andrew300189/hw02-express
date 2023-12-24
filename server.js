const app = require('./app');
const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://Andrey:ceWrqUaTRH3B3tDZ@cluster0.d2jb67n.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Server running. Use our API on port: 3000");
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
