import { Component, OnInit } from '@angular/core';
import {Adm, EveHome, EveSystem} from '../model/model';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import {AdmhubService} from '../admhub.service';
import {Subject} from 'rxjs';
import {ChatMessage} from '../model/chatMessage.model';
import {environment} from '../../environments/environment';
import {RepoService} from '../repo.service';
@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {



  title = 'WebAdmClient';
  public eveSystems: EveSystem[];
  public eveHome: EveHome;
  public adm: Adm;
  public hubStatus = "";
  messageReceived = new Subject<ChatMessage>();
  private hubConnection: HubConnection;
  constructor(private repo: RepoService, private hub: AdmhubService) {
    this.eveHome = { key: "", eveSystems: [] };
    this.eveHome.eveSystems = this.eveSystems;
    // @ts-ignore

  }
  ngOnInit() {


    this.hub.setupHub();
    this.eveHome.eveSystems = this.eveSystems;
    this.adm = {name: "", id: 0, ts: new Date()};

    // Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    this.hub.addData.subscribe(svsAdm => {
      const data = this.eveSystems.filter(sys => svsAdm.id === sys.id);
      const line = data[0].adms.find(a => a.name === svsAdm.name);
      if (line == null) {
        data[0].adms.push({name: svsAdm.name, id: 1, ts: new Date()});
      }
    });
    this.hub.removeData.subscribe(adm => {
      const data = this.eveSystems.filter(s => adm.id === s.id);
      for (let i = 0; i < data[0].adms.length; i++) {
        if (data[0].adms[i].name === adm.name) {
          data[0].adms.splice(i, 1);
        }
      }
    });
    this.hub.clearData.subscribe(b => {
        this.populateEsys();
        this.save();
    });
    this.hub.onClose.subscribe(b => {
      if(b) {
        this.hubStatus = "closed";
      }
    });
    this.hub.onConnected.subscribe(b => {
      this.hubStatus = "connected";
    });
    this.loaddata();
  }


  public save() {
    this.repo.save(this.eveHome).subscribe((ldata: any) => {
      console.log(ldata);
    }),
      (error =>
      {console.log(error);

      });
  }
  public clearData(){
    this.hub.invClearData("ClearData", true);
  }
  public loaddata() {
    this.repo.get().subscribe(eve => {
      this.eveHome = eve;
      this.eveSystems = this.eveHome.eveSystems;
    }), ( error => {
      console.log(error);
      this.populateEsys();
    });
  }
  public remove (a: string, iid: number)
  {
    this.hub.invoke("removeadm", a, iid);
  }
  public addTag(e: string, iid: number){
    this.hub.invoke("AddAdm", e, iid);
  }

  private populateEsys(): any {
    this.eveSystems = [];
    const ee = this.eveSystems;
    console.log("starting");

    ee.push({name: "5XR-KZ", id: 1, adms: []});
    ee.push({name: "75C-WN", id: 2, adms: []});
    ee.push({name: "BG-W90", id: 3, adms: []});
    ee.push({name: "C-0ND2", id: 4, adms: []});
    ee.push({name: "I5Q2-S", id: 5, adms: []});
    ee.push({name: "JI-LGM", id: 6, adms: []});
    ee.push({name: "OCU4-R", id: 7, adms: []});
    ee.push({name: "PO-3QW", id: 8, adms: []});
    ee.push({name: "VF-FN6", id: 9, adms: []});
    ee.push({name: "Y-YGMW", id: 10, adms: []});
    ee.push({name: "Z-PNIA", id: 12, adms: []});
    this.eveHome = { key: "evePower", eveSystems: [] };
    this.eveHome.eveSystems = this.eveSystems;
  }

  public clearSystems(){
    this.clearData();
    // this.populateEsys();
    // this.eveHome.key = "evePower";
    // this.save();
  }


}
