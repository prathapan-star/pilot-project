import { Component, OnInit } from '@angular/core';
import { Score } from '../shared/score'; 
import { ScoreService } from '../shared/score.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  scoreList: Score[] = []; 

  constructor(public scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreDisplays();
  }

  scoreDisplays(): void {
    this.scoreService.getScores().subscribe(
      (data: Score[]) => { 
        this.scoreList = data;
        console.log('Score List:', this.scoreList);
      },
      error => {
        console.error('Error fetching scores:', error);
      }
    );
  }
}