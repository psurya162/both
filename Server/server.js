const express = require('express');
const app = express();
const PORT = 5000;
const db = require('./config/db_Setting');
const userRoute = require('./routes/userroutes');
const adminroute=require('./routes/adminroute')
const paymentroute=require('./routes/paymentroute')

const cors = require('cors');
const checkLicenseExpirations=require('./middleware/sendemail')
checkLicenseExpirations()
app.use(cors())

  
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', userRoute); 
app.use('/v2',adminroute)
app.use('/onboard',paymentroute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
