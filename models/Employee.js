const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String
});

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  position: String,
  department: String,
  salary: Number,
  hire_date: Date,
  address: addressSchema,
  skills: [String],
  active: Boolean,
  performance_rating: Number
});

module.exports = mongoose.model('Employee', employeeSchema, 'udits_finalproject');