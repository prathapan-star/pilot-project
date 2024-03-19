import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from '../shared/players.service';
import { ScoreService } from '../shared/score.service';

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrl: './hard.component.scss'
})
export class HardComponent {

  playerName: string = '';

  level:string='hard';

  rows: { imageUrl: string; isInitial: boolean; isImageClickable: boolean }[][] = [];

  initialImageUrl: string = 'https://static.vecteezy.com/system/resources/previews/013/555/111/non_2x/hand-drawn-question-mark-symbol-black-sketch-question-mark-symbol-on-white-background-vector.jpg';

  matchedImageUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScIz3bjQkB14bwvaDDthM8A4yRSICBk6wsFtKQqzFUWw&s';

  unmatchedImageUrl: string = 'https://static.vecteezy.com/system/resources/previews/011/193/361/non_2x/check-mark-and-cross-mark-icon-tick-symbol-in-red-color-illustration-vector.jpg';

  imageUrls: string[] = [
    'https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg',
    'https://img.freepik.com/premium-vector/isolated-simple-orange-fruit-cartoon_1308-124240.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=ais',
    'https://img.freepik.com/free-vector/fresh-grapes-fruit-healthy-icon_18591-82910.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1706054400&semt=ais',
    'https://img.freepik.com/free-vector/sticker-design-with-apple-isolated_1308-66383.jpg',
    'https://img.freepik.com/free-vector/green-capsicum-sticker-white-background_1308-64388.jpg',
    'https://img.freepik.com/premium-vector/cabbage-image-cute-image-isolated-cabbage-vector-illustration_118339-5180.jpg'
  ];

  cellGeneratedImageUrls: string[][] = [];
  initialClicked: boolean = false;
  initialCount: number = 0;
  checkImageUrl: string[] = [];
  previousRow: number[] = [];
  previousCol: number[] = [];
  preColVal: number = 0;
  preRowVal: number = 0;
  timer: number = 0;
  score: number = 0;

  constructor(private playerService: PlayersService,public router:Router,private scoreService:ScoreService) { }

  ngOnInit(): void {
    this.fetchName();
    this.generateGrid();
    this.startTimer();
  }


  fetchName(){
    this.playerService.playerName$.subscribe(playerName => {
      this.playerName = playerName;
    });
  }

  generateGrid(): void {
    for (let i = 0; i < 8; i++) {
      const row = [];
      this.cellGeneratedImageUrls[i] = [];
      for (let j = 0; j < 8; j++) {
        row.push({ imageUrl: this.initialImageUrl, isInitial: true, isImageClickable: true });
        this.cellGeneratedImageUrls[i][j] = '';
      }
      this.rows.push(row);
    }
  }

  toggleZoom(rowIndex: number, colIndex: number): void {
    const currentCell = this.rows[rowIndex][colIndex];
    if (currentCell.isImageClickable) {
      if (!this.cellGeneratedImageUrls[rowIndex][colIndex]) {
        const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
        const randomImageUrl = this.imageUrls[randomIndex];
        this.cellGeneratedImageUrls[rowIndex][colIndex] = randomImageUrl;
        this.initialCount++;
        this.checkImageUrl[this.initialCount] = randomImageUrl;

        this.previousCol[this.initialCount] = colIndex;
        this.previousRow[this.initialCount] = rowIndex;
        this.preColVal = this.previousCol[this.initialCount - 1];
        this.preRowVal = this.previousRow[this.initialCount - 1];
  

        if (this.initialCount % 2 == 0) {
          if (this.checkImageUrl[this.initialCount] == this.checkImageUrl[this.initialCount - 1]) {
            currentCell.isInitial = false;
            const preCurrentCell = this.rows[this.preRowVal][this.preColVal];
            preCurrentCell.isInitial = false;
            setTimeout(() => {
              this.changeMatchGridUrl(rowIndex, colIndex, this.preRowVal, this.preColVal);
            }, 1000);
          } else {
            this.rows[rowIndex][colIndex] = { imageUrl: this.initialImageUrl, isInitial: true, isImageClickable: true };
            setTimeout(() => {
              this.changeInitialGridUrl(rowIndex, colIndex, this.preRowVal, this.preColVal);
            }, 1000);
          }
        }
      }
      this.rows[rowIndex][colIndex] = { imageUrl: this.cellGeneratedImageUrls[rowIndex][colIndex], isInitial: false, isImageClickable: true };
    } else {

    }
  }

  changeMatchGridUrl(rowIndex: number, colIndex: number, preRowVal: number, preColVal: number): void {
    // this.isMatchedUrl = true;
    this.score++;
    this.cellGeneratedImageUrls[rowIndex][colIndex] = this.matchedImageUrl;
    this.rows[rowIndex][colIndex] = { imageUrl: this.cellGeneratedImageUrls[rowIndex][colIndex], isInitial: false, isImageClickable: false };
    this.rows[preRowVal][preColVal] = { imageUrl: this.cellGeneratedImageUrls[rowIndex][colIndex], isInitial: false, isImageClickable: false };
  }

  changeInitialGridUrl(rowIndex: number, colIndex: number, preRowVal: number, preColVal: number): void {
    // this.isMatchedUrl = true;
    this.rows[preRowVal][preColVal] = { imageUrl: this.unmatchedImageUrl, isInitial: false, isImageClickable: false };
    this.rows[rowIndex][colIndex] = { imageUrl: this.unmatchedImageUrl, isInitial: false, isImageClickable: false };
  }

  startTimer(): void {
    const intervalId = setInterval(() => {
      this.timer++;
      if (this.timer >= 60 || this.score > 3 || this.initialCount == 64) {
        clearInterval(intervalId);
        this.stopGame(); 
      }
    }, 1000);
  }

  stopGame() {
    if (this.score > 3 ) {
      console.log("win");
      this.router.navigate(['/win']);
    }
    else {
      console.log("Lose");
      this.router.navigate(['/lose']);
    }

    const scoreData = {
      playerName: this.playerName,
      score: this.score,
      timer: this.timer,
      level: this.level 
    };

    this.addScore(scoreData);
  }

  addScore(scoreData: any): void {
    this.scoreService.addScores(scoreData).subscribe((data: {}) => {
    });
  }
}
