import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {
  game: Game;
  gamesId: string;
  gameOver = false;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog,) {

  }

  ngOnInit() {
    this.newGame();

    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gamesId = params['id'];

      this
        .firestore
        .collection('games')
        .doc(this.gamesId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log(this.game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.playersImages = game.playersImages;
          this.game.stack = game.stack;
          this.game.drawCardAnimation = game.drawCardAnimation;
          this.game.currentCard = game.currentCard;
        })
    });
  }
  newGame() {
    this.game = new Game();
  }
  drawCard() {
    if (this.game.players.length < 2) {
      this.openDialog();
    }
    else {
      if(this.game.stack.length == 0) {
        this.gameOver = true;
      }

      else if (!this.game.drawCardAnimation) {
        this.game.drawCardAnimation = true;
        this.game.currentCard = this.game.stack.pop();
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.updateGame();

        setTimeout(() => {
          this.game.drawCardAnimation = false;
          this.game.playedCards.push(this.game.currentCard);
          this.updateGame();
        }, 1000);

      }
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {


      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playersImages.push('man.png');
        this.updateGame();
      }
    });
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((edit: string) => {
      if (edit) {

        if (edit == 'DELETE') {
          this.game.playersImages.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        }

        else {
          this.game.playersImages[playerId] = edit;
        }

        this.updateGame();
      }
    });
  }

  updateGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gamesId)
      .update(this.game.toJSON());
  }

  startNewGame() {
   
  }
}



