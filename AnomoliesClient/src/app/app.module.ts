import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdmComponent } from './adm/adm.component';
import { ChatComponent } from './chat/chat.component';
import {AdmchatService} from './admchat.service';
import {AdmhubService} from './admhub.service';
import {RepoService} from './repo.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AdmhubService, RepoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
