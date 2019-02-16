import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr';
import {environment} from '../environments/environment';
import {Adm, EveHome, EveSystem} from './model/model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmhubService {

  private hubConnection: HubConnection;
  private uri = "";
  public eveSystems: EveSystem[];
  public eveHome: EveHome;
  public adm: Adm;
  public addData = new Subject<Adm>();
  public removeData = new Subject<Adm>();
  constructor() {

  }
  setupHub(){
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  invoke(command: string, a, b) {
    this.hubConnection.invoke(command, a, b);
  }
  private createConnection() {
    this.uri = environment.baseUri + '/admchanges';
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.uri)
      .configureLogging(LogLevel.Information)
      .build();
  }
  private startConnection() {
    this.hubConnection
      .start()
      .then(() => {console.log('Connection started!');
      })
      .catch(err => {console.error('Error while establishing connection :(');
      });
  }

  private registerOnServerEvents(): void {

    this.hubConnection.on('AddAdm', (name: string, system: number) => {
      this.eveSystems = this.eveHome.eveSystems;
      const data = this.eveSystems.filter(a => a.id === system);
      data[0].adms.push({name: name.toUpperCase(), id: 1, ts: new Date()});
      this.addData.next({name: name, id: system, ts: new Date()});
    });

    this.hubConnection.on('RemoveAdm', (name: string, system: number) => {
      this.eveSystems = this.eveHome.eveSystems;
      const data = this.eveSystems.filter(a => a.id === system);
      for (let i = 0; i < data[0].adms.length; i++){
        if (data[0].adms[i].name === name) {
          data[0].adms.splice(i, 1);
        }
      }
      this.removeData.next({name: name, id: system, ts: new Date()});
    });
/*
    this.hubConnection.on('Send', (data: any) => {
      this.messageReceived.next(data);
    });
*/
  }
}
