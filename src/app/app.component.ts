import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'connectk4';

  namePlayers: string[] = ["Player One","Player Two"];
  colorPlayers: string[] = ["red","yellow"];
  pawnPlayers: string[] = ["circleRed","circleYellow"];
  turnDefinition: number = 0;

  changeTurnPLayer() {
    (this.turnDefinition==0) ? this.turnDefinition=1 : this.turnDefinition=0;
  }

}
