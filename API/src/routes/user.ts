import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', UserController.getAll);

// Get one user
router.get('/:id',  UserController.getById);

// Create a new user
router.post('/', UserController.new);

// Edit user
router.patch('?access_token=:token',  UserController.edit);

//change password

router.patch('?access_token=:token',  UserController.changePassword);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.delete);

export default router;
