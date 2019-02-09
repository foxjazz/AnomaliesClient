import {Component, NgZone, OnInit} from '@angular/core';
import {AdmchatService} from '../admchat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private admchat: AdmchatService, private ngZone: NgZone) { }
public message: string;
  ngOnInit() {
 //   this.admchat.sendChatMessage("test");
    this.admchat.messageReceived.subscribe(a => {
      this.ngZone.run(() => {
        this.message = a.message;
      });
    });
  }
  public reconstruct(){
    this.admchat.reconstruct();
  }
  public sendMessage(s: string){
      this.admchat.sendChatMessage(s);
  }
public sendsubject(){
    this.admchat.sendsubject();
}

}
