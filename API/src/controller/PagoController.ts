import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Allow, validate } from 'class-validator';
import {Pagos } from '../entity/pagos';


export class PagoController{
 
   

    static getAll = async (req: Request, res: Response) => {
        const pagoRepository = getRepository(Pagos);
        let pagos;

        try {
            pagos = await pagoRepository.find({ select: ['codigo_seguridad', 'efecty','a_la_mano'] });
          } catch (e) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
          }


    if (pagos.length > 0) {
        res.send(pagos);
      } else {
        res.status(404).json({ message: 'Not result' });
      }
    };
    
    
    
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const pagoRepository = getRepository(Pagos);
        try {
          const pago = await pagoRepository.findOneOrFail(id);
          res.send(pago);
        } catch (e) {
          res.status(404).json({ message: 'Not result' });
        }
      };


      static new = async (req: Request, res: Response) => {
        const { codigo_seguridad,efecty,a_la_mano} = req.body;
        const pago = new Pagos();
        pago.codigo_seguridad = codigo_seguridad;
        pago.efecty = efecty;       
        pago.a_la_mano = a_la_mano;
       
       
 
       

    
        // Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(pago, validationOpt);
        if (errors.length > 0) {
          return res.status(409).json(errors);
        }
    
        // TODO: HASH PASSWORD
    
        const pagoRepository = getRepository(Pagos);
        try {
        
          await pagoRepository.save(pago);
         
        } catch (e) {
          return res.status(400).json({ message: 'pago  not create' });
        }
        
        // All ok
        res.send('pago created');
      };

      static edit = async (req: Request, res: Response) => {
       let pago: Pagos;
        const { id } = req.params;
        const {codigo_seguridad,efecty,a_la_mano } = req.body;
    
        const pagoRepository = getRepository(Pagos);
        // Try get user
        try {
          pago = await pagoRepository.findOneOrFail(id);
          pago.codigo_seguridad = codigo_seguridad;
          pago.efecty = efecty;
          pago.a_la_mano = a_la_mano;
          
        } catch (e) {
          return res.status(404).json({ message: 'pago not found' });
        }
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(pago, validationOpt);
    
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
    
        // Try to save user
        try {
          await pagoRepository.save(pago);
        } catch (e) {
          return res.status(409).json({ message: 'pago not Edit' });
        }
    
        res.status(201).json({ message: 'pago update' });
      };


      static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const pagoRepository = getRepository(Pagos);
        let pago: Pagos;
    
        try {
          pago = await pagoRepository.findOneOrFail(id);
        } catch (e) {
          return res.status(404).json({ message: 'pago not found' });
        }
    
        // Remove user
        pagoRepository.delete(id);
        res.status(201).json({ message: ' pago deleted' });
      };
    

    
    
    


}


export default PagoController;