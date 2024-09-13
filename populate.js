const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const CONNECT_URL = 'mongodb+srv://user:root1234@cluster0.rmel4sd.mongodb.net/STORE-API?retryWrites=true&w=majority&appName=Cluster0';

const start = async () => {
  try {
    console.time('databaseTimer');
    await connectDB(CONNECT_URL);
    console.log('Connected to Database');
    await Product.deleteMany();
    console.log('Deleted previous document');
    await Product.create(jsonProducts);
    console.log('Create new documents');
    console.timeEnd('databaseTimer');
    console.log('Success!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}

start();