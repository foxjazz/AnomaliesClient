import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdmComponent } from './adm/adm.component';
import { ChatComponent } from './chat/chat.component';
import {AdmchatService} from './admchat.service';

@NgModule({
  declarations: [
    AppComponent,
    AdmComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AdmchatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
