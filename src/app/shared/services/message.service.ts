import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(body: any) {
    return this.http.post('http://localhost:4000/formulario', body);
    }

  sendMessageUser(body: any){

    return this.http.post('http://localhost:1000/sendUser',body);
  }
  
  sendMessageTarea(body: any){

    return this.http.post('http://localhost:500/tareaCumplida',body);
  }
}


