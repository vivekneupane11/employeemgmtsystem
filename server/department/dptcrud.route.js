const express = require('express');
const router = express.Router();
const app = express();

//local packages
const crudController = require('./dptcrud.controller');
router.get('/deptgetdata', (req, res, next) => {
    crudController.getallDepartment(req, res, next);
});
router.post('/department', (req, res, next) => {
    crudController.createDepartment(req, res, next);
});
router.post('/deptdeletedata', (req, res, next) => {
    crudController.deleteDepartment(req, res, next);
});

router.post('/deptupdatedata', (req, res, next) => {
    crudController.updateDepartment(req, res, next);
});

module.exports = router;