import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {User} from '../../shared/models/user.interface';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { CdkNoDataRow } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { Pedido } from '../models/pedido';
import { Product } from '../models/product.interface';
import { Vendedor } from '../models/vendedor';
import { Chat } from '../models/chat';
import { AuthService } from '@app/components/auth/auth.service';
import { Encuesta } from '../models/encuesta';
import { Tarea } from '../models/tarea';
import { Pago } from '../models/pago';
import { Domiciliario } from '../models/domiciliario';
@Injectable({
  providedIn: 'root'
})
export class AuthCrudService {

  users: Observable<User[]>;
  public user: User

  uid = '';

chats:  Observable<Chat[]>

private usersCollection: AngularFirestoreCollection<User>;
private vendedorCollection: AngularFirestoreCollection<Vendedor>;
private docCollection: AngularFirestoreCollection<Product>;
private pagoCollection: AngularFirestoreCollection<Pago>;

private pedidosCollection: AngularFirestoreCollection<Pedido>;

private domiciliariosCollection: AngularFirestoreCollection<Domiciliario>;

private chatsCollection: AngularFirestoreCollection<Chat>;


private tareasCollection: AngularFirestoreCollection<Tarea>;



  constructor(private afs: AngularFirestore,private authSvc: AuthService ){

 
    this.domiciliariosCollection = afs.collection<Domiciliario>('domiciliarios');


    this.usersCollection = afs.collection<User>('clientes');

    this.vendedorCollection = afs.collection<Vendedor>('vendedores');


    this.pagoCollection = afs.collection<Pago>('pagos');

    



  }


  onDeleteUser(userId: string): Promise<void>{

    return new Promise(async (resolve, reject) =>{

      try {

        const result = this.usersCollection.doc(userId).delete();
        resolve(result);
      } catch (error) {
        
        reject(error.message);
      }
    })

  }


  onSaveUser(name: string, apellido: string,gmail: string,cedula:number,direccion: string,pais: string,rol:string, userId: string,telefono:number) /*: Promise<void>*/{

    

     

  var user = {
    name: name,
    apellido: apellido,
    gmail : gmail,
    cedula :  cedula,
    direccion : direccion,
    pais :  pais,
    role :  rol,
    telefono: telefono,
    id: userId
  }
    
  




     
        
 
     this.usersCollection.doc<User>(userId).set(
      user
     );


     
    

    

  }


 
public getUsers(): Observable<User[]>{

  
  return   this.usersCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
           return { id, ...data };
        })
      )
    );

  
}




public getDomici(): Observable<Domiciliario[]>{

  
  return   this.domiciliariosCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Domiciliario;
          const id = a.payload.doc.id;
           return { id, ...data };
        })
      )
    );

  
}



  


public getT(): Observable<Pago[]>{

  
  return   this.pagoCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Pago;
          const id = a.payload.doc.id;
           return { id, ...data };
        })
      )
    );

  
}




public getEncuesta(path: string): Observable<Encuesta[]>{


  return this.afs.collection<Encuesta>(path).valueChanges();
  
  }

public getChats(path: string): Observable<Chat[]>{


  return this.afs.collection<Chat>(path)
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Chat;
          const id = a.payload.doc.id;
           return { id, ...data };
        })

      )
    )
  
  }
    

  




  public getTareas(): Observable<Tarea[]>{

   
    this.tareasCollection = this.afs.collection<Tarea>('tareas');
    
   return   this.tareasCollection
     .snapshotChanges()
     .pipe(
       map(actions =>
         actions.map(a => {
           const data = a.payload.doc.data() as Tarea;
           const id = a.payload.doc.id;
            return { id, ...data };
         })
       )
     );
 
   
 
     
 
 
 }
 
        
      
  

  
      

public getPedidos(path: string): Observable<Pedido[]>{

   this.pedidosCollection = this.afs.collection<Pedido>(path);
  
  return   this.pedidosCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Pedido;
          const id = a.payload.doc.id;
           return { id, ...data };
        })
      )
    );

  

    


}



 getDoc<tipo>(path: string, uid: string){

  return this.afs.doc<tipo>(`${path}/${uid}`).valueChanges();

}




createDoc(data: Pedido, path: string, id: string){

  const collection = this.afs.collection<Pedido>(path).doc(id).set( data);

  return collection;

}


create<type>(data: any, path: string, id?: string){

  const collection = this.afs.collection<type>(path).doc(id).set( data);

  return collection;

}


createD(data: Domiciliario, path: string, id?: string){

  const domiciliario = {

    nombre: data.nombre,
    apellido: data.apellido,
    correo: data.correo,
    telefono: data.telefono,
    pedidos: data.pedidos,
    id: id
  }

  const collection = this.afs.collection<Domiciliario>(path).doc(id).set( domiciliario);

  return collection;

}

docT(data:Tarea ,path: string){

  const id = this.afs.createId();

  data.id = id;
  
  const collection = this.afs.collection<Tarea>(path).doc(id).set(data);

  return collection;
}


doc<type>(data:any ,path: string){

  const id = this.afs.createId();

  
  const collection = this.afs.collection<type>(path).doc(id).set(data);

  return collection;
}




deleteDoc(path: string, id:string){

  const collection = this.afs.collection(path).doc(id).delete();


  return collection;

}
        
updateDoc<type>(data:any, path: string, id: string){

  const collection = this.afs.collection<type>(path).doc(id).update(data);


  return collection

}

getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string ){

  const collection = this.afs.collection<tipo>(path
    , ref => ref.where(parametro, condicion, busqueda));

 return collection.valueChanges();

}

getPedidosAll<tipo>(){

  const path = 'pedidos';
 const collection =  this.afs.collectionGroup<tipo>(path);

 return collection.valueChanges();
}

getCollectionAll<tipo>(path: string, parametro: string, condicion: any, busqueda: string,
  startAt: any ){

    if(startAt == null){


     startAt = new Date();
    }
 
  const collection = this.afs.collectionGroup<tipo>(path
   , ref => ref.where(parametro, condicion, busqueda,)
   .orderBy('fecha','desc')
   .limit(2)
   .startAfter(startAt)
   
   );

 return collection.valueChanges();
  }



  

}
