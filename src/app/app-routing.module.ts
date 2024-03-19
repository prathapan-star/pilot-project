import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameboardComponent } from './gameboard/gameboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { HardComponent } from './hard/hard.component';
import { EasyComponent } from './easy/easy.component';
import { MediumComponent } from './medium/medium.component';
import { WinComponent } from './win/win.component';
import { BoardComponent } from './board/board.component';
import { LoseComponent } from './lose/lose.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:'gameboard',component:GameboardComponent},
  {path:'gameplay',component:GameplayComponent},
  {path:'settings',component:SettingsComponent},
  {path:'instructions',component:InstructionsComponent},
  {path:'home',component:HomeComponent},
  {path:'hard',component:HardComponent},
  {path:'easy',component:EasyComponent},
  {path:'medium',component:MediumComponent},
  {path:'win',component:WinComponent},
  {path:'lose',component:LoseComponent},
  {path:'board',component:BoardComponent},
  {path:'about',component:AboutComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
