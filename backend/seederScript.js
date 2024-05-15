
require('dotenv').config()

const productData = require('./data/products')
const {connectDB} = require('./config/db')
const Product = require('./models/Product')

const bcrypt = require('bcrypt')
const User = require('./models/User')

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany({})

    await Product.insertMany(productData)

    console.log('Data Import Success')
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData();

const signUpAdmin = async () => {

  const data = {
    email : "admin@gmail.com",
    fullName : "Admin",
    role : "admin"
  }
  const password = "admin@123";
  try {

    await User.deleteMany({role:"admin"});

    const hash = await bcrypt.hash(password, 8)

    await User.create({...data, password: hash})
    console.log('Admin regitered successfully ')

    process.exit()
  } catch (error) {
    console.error('Error while registering admin', error)
    process.exit(1)
  }
}

signUpAdmin();