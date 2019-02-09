import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';


import {ChatMessage} from './model/chatMessage.model';
import {environment} from '../environments/environment';

const WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS = 2000;

@Injectable()
export class AdmchatService {

  foodchanged = new Subject();
  messageReceived = new Subject<ChatMessage>();
  newCpuValue = new Subject<Number>();
  connectionEstablished = new Subject<Boolean>();
  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  sendsubject(){
    this.messageReceived.next({message: "subject sent", sent: new Date()});
  }
reconstruct() {
  this.createConnection();
  this.registerOnServerEvents();
  this.startConnection();
}
  sendChatMessage(message: string) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    let cm = new ChatMessage();
    const  uri = environment.baseUri + '/chatmessages';
    cm.message = uri;
    this.messageReceived.next(cm);
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(uri)
      .build();
  }

  private startConnection() {
    setTimeout(() => {
      this.hubConnection.start().then(() => {
        console.log('Hub connection started');
        this.messageReceived.next({message: "connection established", sent: new Date()});
        this.connectionEstablished.next(true);
      });
    }, WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS);
  }

  private registerOnServerEvents(): void {


    this.hubConnection.on('Send', (data: any) => {
      this.messageReceived.next(data);
    });


  }
}