import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})

export class EditPlayerComponent implements OnInit {

  images = ['man.png', 'woman.png'];
  constructor() { }

  ngOnInit(): void {

  }
}