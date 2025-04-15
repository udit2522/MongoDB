const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Basic CRUD operations
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:employee_id', employeeController.updateEmployee);
router.delete('/:employee_id', employeeController.deleteEmployee);

// Special queries from project requirements
router.get('/department/sales', employeeController.getSalesEmployees);
router.patch('/:id/raise', employeeController.giveRaise);
router.patch('/department/:dept/raise', employeeController.departmentRaise);
router.delete('/performance/below/:rating', employeeController.deleteLowPerformers);
router.get('/stats/avg-salary', employeeController.avgSalaryByDept);
router.get('/top/paid/:limit?', employeeController.getHighestPaid);
router.get('/search/name/:letter', employeeController.searchByName);
router.get('/search/skill/:skill', employeeController.searchBySkill);

module.exports = router;