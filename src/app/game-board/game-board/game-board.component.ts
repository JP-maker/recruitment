import { InsertButton } from './../../models/insert-button';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() currentPawnPlayer = '';
  @Input() currentNamePlayer: string = '';
  @Output() changeTurn = new EventEmitter<number>();

  grid: string[][] = [
    ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
    ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
    ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
    ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
    ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
    ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"]
  ];

  insertButtons: InsertButton[] = [];

  constructor() {

    let index: number;

    // Fill in object button for 7 columns
    for (index = 0; index <7; index++) {
      this.insertButtons.push({
        id: index,
        disabled: false,
        appearance: "btn btn-secondary",
        icon: "bi bi-arrow-down-circle-fill"
      })
    }



   }

  ngOnInit(): void {

  }

  resetGame(){
    let index: number;
    this.grid = [
      ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
      ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
      ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
      ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
      ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"],
      ["circleHide","circleHide","circleHide","circleHide","circleHide","circleHide","circleHide"]
    ];
    if (this.currentPawnPlayer=="circleYellow") {
      this.changeTurn.emit();
    }
    for (index = 0; index <7; index++) {
      this.insertButtons[index]['disabled'] = false;
    }
  }


  insertPawn(numCol): void{

    // Init var for explore row
    let numRow: number;


    // Loop explore grid
    for (numRow = this.grid.length-1; numRow >= 0; numRow --) {
      // If place empty
      if (this.grid[numRow][numCol] == "circleHide") {
        // If last line : we desactive button
        if (numRow == 0) {
          this.insertButtons[numCol]['disabled'] = true;
        }
        this.grid[numRow][numCol] = this.currentPawnPlayer;
        break;
      }
    }

    this.checkWinVHNew();
    this.checkWinDiag();

    this.changeTurn.emit();
  }

  // Fonction qui  permet de rechercher une série en horizontal et en vertical
  checkWinVHNew(){
    let indexRow: number;
    let indexCol: number;
    let isWinner: boolean=false;

    // Check des verticals
    for(indexCol=0;indexCol<this.grid[0].length-1;indexCol++){
      for (indexRow=this.grid.length-1;indexRow>2;indexRow--) {
        if (this.grid[indexRow-1][indexCol]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow-2][indexCol]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow-3][indexCol]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow][indexCol]!="circleHide"){
          isWinner=true;
          break;
        }
      }
      if (isWinner==true){
        break;
      }
    }

    // Check des horizontals
    for(indexCol=0;indexCol<this.grid[0].length-3;indexCol++){
      for (indexRow=this.grid.length-1;indexRow>=0;indexRow--) {
        if (this.grid[indexRow][indexCol+1]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow][indexCol+2]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow][indexCol+3]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow][indexCol]!="circleHide"){
          isWinner=true;
          break;
        }
      }
      if (isWinner==true){
        break;
      }
    }
    if (isWinner==true){
      alert("Congratulation " + this.currentNamePlayer + " !! You win with diagonal position. You can restart your game with button on bottom." )
      this.blockInsert();
    }
  }

  // Fonction qui permet de rechercher une série en diagonal vers la gauche et vers la droite
  checkWinDiag() {

    let indexRow: number;
    let indexCol: number;
    let isWinner: boolean=false;

    // Check des diagonales vers la droite
    for(indexCol=0;indexCol<this.grid[0].length-3;indexCol++){
      for (indexRow=this.grid.length-1;indexRow>2;indexRow--) {
        if (this.grid[indexRow-1][indexCol+1]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow-2][indexCol+2]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow-3][indexCol+3]==this.grid[indexRow][indexCol] &&
          this.grid[indexRow][indexCol]!="circleHide"){
          isWinner=true;
          break;
        }
      }
      if (isWinner==true){
        break;
      }
    }

    if (isWinner==false){
      // Check des diagonales vers la gauche
      for(indexCol=this.grid[0].length-1;indexCol>2;indexCol--){
        for (indexRow=this.grid.length-1;indexRow>2;indexRow--) {
          if (this.grid[indexRow-1][indexCol-1]==this.grid[indexRow][indexCol] &&
            this.grid[indexRow-2][indexCol-2]==this.grid[indexRow][indexCol] &&
            this.grid[indexRow-3][indexCol-3]==this.grid[indexRow][indexCol] &&
            this.grid[indexRow][indexCol]!="circleHide"){
              isWinner=true;
              break;
          }
        }
        if (isWinner==true){
          break;
        }
      }
    }
    if (isWinner==true){
      alert("Congratulation " + this.currentNamePlayer + " !! You win with diagonal position. You can restart your game with button on bottom." )
      this.blockInsert();
    }
  }

  blockInsert() {
    let index : number;
    for (index = 0; index <7; index++) {
      this.insertButtons[index]['disabled'] = true;
    }
  }
}


