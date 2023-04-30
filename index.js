const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
const options = {
  // autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectDatabase = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Priyam:Pkpriyam%4069@cluster0.ukqohp4.mongodb.net/?retryWrites=true&w=majority",
      options
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
      // console.log("mongodb connected");
    });
};
async function closeDatabaseConnection() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
  }
}
connectDatabase();
// Import model
const Customer = require("./models/customer");

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added");
    closeDatabaseConnection();
  });
};

// Find Customer
const findCustomer = (name) => {
  // Make case insensitive
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    (customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      closeDatabaseConnection();
    }
  );
};

// Update Customer
const updateCustomer = (_id, customer) => {
  Customer.update({ _id }, customer).then((customer) => {
    console.info("Customer Updated");
    closeDatabaseConnection();
  });
};

// Remove Customer
const removeCustomer = (_id) => {
  Customer.remove({ _id }).then((customer) => {
    console.info("Customer Removed");
    closeDatabaseConnection();
  });
};

// List Customers
const listCustomers = () => {
  Customer.find().then((customers) => {
    console.info(customers);
    console.info(`${customers.length} customers`);
    closeDatabaseConnection();
  });
};

// Export All Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
