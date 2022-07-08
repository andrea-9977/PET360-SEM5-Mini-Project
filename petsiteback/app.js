const express = require("express");
require('dotenv').config()
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const braintreeRoutes = require('./routes/braintree')

//app
const app = express();


//db connection
mongoose.connect(process.env.MONGO_URL,{
//depreceated
// useNewUrlParser: true,
// useCreateIndea:true  
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});
//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors()); //if diff route ahem port then for making req to 8000 from 3000 so using cors
//routes middleare 
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api", orderRoutes)
app.use("/api", braintreeRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);

})