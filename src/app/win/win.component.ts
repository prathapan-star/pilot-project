import { Component } from '@angular/core';
import { ScoreService } from '../shared/score.service';
import { PlayersService } from '../shared/players.service';
@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrl: './win.component.scss'
})
export class WinComponent {
  scoreList:any = [];

  constructor(public playerService : PlayersService,public scoreService : ScoreService) {}
  
  ngOnInit(): void {
    this.scoreDisplays();
  }

  scoreDisplays():any{
    return this.scoreService.getScores().subscribe((data) => {
      this.scoreList=data;
    });
  }
}
