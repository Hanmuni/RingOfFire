import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-instructions',
  templateUrl: './game-instructions.component.html',
  styleUrls: ['./game-instructions.component.scss']
})
export class GameInstructionsComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! You drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a Jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'The player who drew the card must put their thumb on the table at a chosen time. The last person to put their thumb on the table must drink.' },
    { title: 'Dudes', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'You are now the question master. If you ask a player a question, they have to answer and then drink.' },
    { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string;

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}