import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
   socket ;
  constructor() { }
  connect(){
    this.socket = io(environment.SOCKET_URL);
    this.socket.on("messagefromapi", data=>{
      console.log('message sent',data)
    });
    this.socket.on("saveProduct", data=>{
      console.log('message sent')
    })
  }
}
