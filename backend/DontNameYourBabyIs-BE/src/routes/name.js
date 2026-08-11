import express from 'express';
import * as nameController from '../controllers/nameController.js';
const router = express.Router();

// Get all names
router.get('/getAllNames', nameController.getAllNames);
// Get name detail by id
router.get('/name/:id', nameController.getNameDetail);
// Add new name
router.post('/addName', nameController.addName);
// Update name by id
router.put('/updateName/:id', nameController.updateName);
// Get detail by id (alias route)
router.get('/detail/:id', nameController.getNameDetailAlias);

export default router;