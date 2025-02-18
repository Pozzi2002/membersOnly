/*Imports*/
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const mainPageRouter = require('./routes/mainPageRouter');
require('dotenv').config();

/*Pre configure*/
app.use(express.urlencoded({ extended: true }));




/*Routes*/
app.use(mainPageRouter);





/*Simple configure */
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
