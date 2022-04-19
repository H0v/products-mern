const mongoose = require('mongoose');

const databaseUrl = 'mongodb+srv://root:root@cluster0.2jdty.mongodb.net/productsDb?retryWrites=true&w=majority';

const connectToDb = async () => {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbname: 'productsDb'
        });
        console.log('Connected to Database...');
    }
    catch(e) {
        console.log('Something went wrong.', e);
    }
};

module.exports = {
    connectToDb
};