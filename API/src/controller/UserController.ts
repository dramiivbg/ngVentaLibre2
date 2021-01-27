import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { validate } from 'class-validator';

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Users);
    let users;

    try {
      users = await userRepository.find({ select: ['cedula', 'username', 'role'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { cedula } = req.params;
    const userRepository = getRepository(Users);
    try {
      const user = await userRepository.findOneOrFail(cedula);
      res.send(user);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const {cedula, username, password, gmail, direccion, pais, role} = req.body;
    const user = new Users();
   
   
    user.username = username;
    user.password = password;
    user.gmail = gmail;
    user.direccion = direccion;
    user.pais = pais;
    user.role = role;
    user.cedula = cedula;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
      return res.status(409).json(errors);
    }

    // TODO: HASH PASSWORD

    const userRepository = getRepository(Users);
    try {
      user.hashPassword();
      
      await userRepository.save(user);
     
    } catch (e) {
      return res.status(400).json({ message: 'Username already exist' });
    }
    
    // All ok
    res.send('User created');
  };


  static edit = async (req: Request, res: Response) => {
    let user:Users;
    const { cedula1 } = req.params;
    const { cedula, username, gmail, direccion, pais, } = req.body;

    const userRepository = getRepository(Users);
    // Try get user
    try {
      user = await userRepository.findOneOrFail(cedula);
      user.cedula = cedula;
      user.username = username;
      user.gmail = gmail;
      user.direccion = direccion;
      user.pais = pais;
 
    
    } catch (e) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    res.status(201).json({ message: 'User update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { cedula } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(cedula);
    } catch (e) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user
    userRepository.delete(cedula);
    res.status(201).json({ message: ' User deleted' });
  };
}

export default UserController;
