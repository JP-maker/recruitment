import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {



  @Input() nameConfPlayers: string[] = [];
  @Output() nameConfPlayersChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onKey(name: string, index: number) {
    this.nameConfPlayers[index] = name;
    this.nameConfPlayersChange.emit(this.nameConfPlayers);
  }

}
