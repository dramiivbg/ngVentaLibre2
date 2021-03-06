import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/components/auth/auth.service';
import { Message } from '@app/shared/models/message';
import { Pedido } from '@app/shared/models/pedido';
import { User } from '@app/shared/models/user.interface';
import { AuthCrudService } from '@app/shared/services/authCrud.service';
import { MessageService } from '@app/shared/services/message.service';
import {ProductService} from '../product.service';
import { UserService } from '@app/shared/services/user.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UrlArchivoService } from '@app/shared/services/url-archivo.service';

@Component({
  selector: 'app-new-send',
  templateUrl: './new-send.component.html',
  styleUrls: ['./new-send.component.scss']
})
export class NewSendComponent implements OnInit {


  private file:any;
  private downloadURL: Observable<string>;
  user: User;
  User$: Observable<User[]>;
  constructor(private firestoreSvc: AuthCrudService, private userSvc: UserService,
    private messageSvc: MessageService, private archSvc: ProductService,
    private urlArchivoService: UrlArchivoService) { 

   



    this.user = userSvc.getUser();
  }



  public newPostForm = new FormGroup({
   
    file: new FormControl(''),
    asunto: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    message: new FormControl('',Validators.required),
  

  });


  ngOnInit(): void {
  }


  handleFile(event:any): void{
 
    this.file = event.target.files[0];
    
    
  
  }



  addNewMessage(data: Message){

data.gmail = this.user.gmail;





    
if(this.file !== undefined){

  data.file = null;
const url =  this.archSvc.storageA(this.file);

url.subscribe(UrlImage => {
  data.file =  UrlImage;
console.log(data);
  this.messageSvc.sendMessageUser(data).subscribe(() => {

  
  });  

});

}else{

  this.messageSvc.sendMessageUser(data).subscribe(() => {

  
  });  

}
  
   
     
 }



 send(){

  Swal.fire('Send!, Your message has been send.','sucessfull');
 }
 


     
}
