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
  public clearData = new Subject<boolean>();
  public onClose = new Subject<boolean>();
  public onConnected = new Subject<boolean>();
  constructor() {

  }
  setupHub() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  invoke(command: string, a, b) {
    this.hubConnection.invoke(command, a, b);
  }
  invClearData(command: string, b) {
    this.hubConnection.invoke(command, b);
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
      .then(() => {
        console.log('Connection started!');
        this.onConnected.next(true);
      })
      .catch(err => {console.error('Error while establishing connection :(');
      });
  }

  private registerOnServerEvents(): void {

    this.hubConnection.on('AddAdm', (name: string, system: number) => {
      this.addData.next({name: name, id: system, ts: new Date()});
    });

    this.hubConnection.on('RemoveAdm', (name: string, system: number) => {
      this.removeData.next({name: name, id: system, ts: new Date()});
    });
    this.hubConnection.on('ClearData', (b: boolean) => {
      this.clearData.next(b);
    });
    this.hubConnection.onclose(() => {
      this.onClose.next(true);
    });
  }
}
