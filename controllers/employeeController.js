const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
      const employee = await Employee.findOne({ employee_id: req.params.id });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Create new employee
exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { employee_id: req.params.employee_id },
        req.body,
        { 
          new: true,         // Return the updated document
          runValidators: true // Run schema validators on update
        }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedEmployee
      });
  
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  };
  
  // Delete Employee
  exports.deleteEmployee = async (req, res) => {
    try {
      const deletedEmployee = await Employee.findOneAndDelete({
        employee_id: req.params.employee_id
      });
  
      if (!deletedEmployee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: deletedEmployee
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };

// Special queries from your project requirements
exports.getSalesEmployees = async (req, res) => {
  try {
    const salesEmployees = await Employee.find({ department: 'Sales' });
    res.json(salesEmployees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.giveRaise = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employee_id: req.params.id },
      { $inc: { salary: req.body.amount } },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.departmentRaise = async (req, res) => {
  try {
    const result = await Employee.updateMany(
      { department: req.params.dept },
      { $mul: { salary: 1 + (req.body.percentage / 100) } }
    );
    res.json({
      message: `Updated ${result.nModified} employees in ${req.params.dept} department`,
      details: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLowPerformers = async (req, res) => {
  try {
    const result = await Employee.deleteMany({ performance_rating: { $lt: req.body.rating } });
    res.json({
      message: `Deleted ${result.deletedCount} employees with performance rating below ${req.body.rating}`,
      details: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.avgSalaryByDept = async (req, res) => {
  try {
    const result = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          avgSalary: { $avg: "$salary" },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgSalary: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHighestPaid = async (req, res) => {
  try {
    const employees = await Employee.find()
      .sort({ salary: -1 })
      .limit(req.params.limit || 5);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const employees = await Employee.find({
      last_name: { $regex: `^${req.params.letter}`, $options: 'i' }
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchBySkill = async (req, res) => {
  try {
    const employees = await Employee.find({
      skills: { $regex: req.params.skill, $options: 'i' }
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};