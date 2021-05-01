import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {
  @Input() currentNamePlayer: string = '';
  @Input() colorNamePlayer: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}