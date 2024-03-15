import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { RouterModule } from '@angular/router';
import { HardComponent } from './hard/hard.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EasyComponent } from './easy/easy.component';
import { MediumComponent } from './medium/medium.component';
import { PlayersService } from './shared/players.service';
import { WinComponent } from './win/win.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    HomeComponent,
    SettingsComponent,
    InstructionsComponent,
    HardComponent,
    GameplayComponent,
    EasyComponent,
    MediumComponent,
    WinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
