import { Component,Input} from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from '../shared/players.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss'
})
export class GameplayComponent {

  @Input() playersDetails= {playerName:'',playerAge:'',gender:''};

  submitted : boolean = false;
  showLevels: boolean = false;
  playerNameExists: boolean=false;

  constructor(public playerService : PlayersService , private router: Router) {}

  ngOnInit()  {
  }

  addPlayers(data : any )  {
    this.submitted=true;
    this.playerService.createPlayers(this.playersDetails).subscribe((data:{}) => {
    });
    this.addPlayerName(this.playersDetails.playerName)
  }

  addPlayerName(data:any) {
    if (this.playersDetails.playerName.trim()) {
      this.playerService.setPlayerName(this.playersDetails.playerName);
      this.playersDetails.playerName = ''; 
    }
  }

  toggleLevels() {
    this.showLevels = !this.showLevels;
  }

  selectLevel(level: string) {
    console.log("Selected level:", level);
    if(level=='EASY') {
      this.router.navigate(['/easy']);
    }
    if(level=='MEDIUM') {
      this.router.navigate(['/medium']);
    }
    if(level=='HARD') {
      this.router.navigate(['/hard']);
    }
  }

}
