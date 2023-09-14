// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: `
    <div class="content">
      <h1 class="title">Tic Tack Toe</h1>
      <div id="statusArea" className="status"><strong>Next player:</strong> <span> {{ currentPlayer }}</span></div>
      <div id="winnerArea" className="winner"><strong>Winner:</strong> <span> {{ winner }} </span></div>
      <section>
        <div class="board">
          <div class="row" *ngFor="let row of [0, 1, 2]; let rowIndex = index">
            <div class="square" *ngFor="let col of [0, 1, 2]; let colIndex = index">
              <button class="grid" (click)="makeMove(rowIndex, colIndex)" [disabled]="board[rowIndex][colIndex] || winner">
                {{ board[rowIndex][colIndex] }}
              </button>
            </div>
          </div>
        </div>
      </section>
      <div class="gridButton">
        <button class="buttonSubmit" (click)="resetGame()">Reset Game</button>
      </div>
    </div>
  `,
  styles: [`
    #statusArea span {
      color: gray;
    }
    #winnerArea span {
      color: red;
    }
    .content {
      font-family: Arial, sans-serif;
      margin: 0 auto;
      width: 250px;
    }
    .title {
      color: purple;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(9, 9fr);
      grid-gap: 5px;
      width: 155px;
      padding: 5px 5px 5px 0;

    }
    .grid {
      width: 50px;  
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid #ccc;
      cursor: pointer;
      margin: 2px 0;
      color: #212121;
      font-size: 22px;
    }
    .winner {
      background-color: yellow;
      color: black;
    }
    .gridButton {
      width: auto;
      height: auto;
      margin: 5px 0;
      position: relative;
    }
    .buttonSubmit {
      background-color: #990000;
      color: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px 15px;
      width: 160px;
      cursor: pointer;
    }
  `]
})

export class TicTacToeComponent implements OnInit {
  currentPlayer: string = 'X';
  winner: string | null = null;
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  ngOnInit() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.currentPlayer = 'X';
    this.winner = null;
  }

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWinner(row, col)) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(row: number, col: number): boolean {
    // Check rows, columns, and diagonals for a win
    return (
      this.checkRow(row) ||
      this.checkColumn(col) ||
      this.checkDiagonal() ||
      this.checkAntiDiagonal()
    );
  }

  checkRow(row: number): boolean {
    return (
      this.board[row][0] === this.currentPlayer &&
      this.board[row][1] === this.currentPlayer &&
      this.board[row][2] === this.currentPlayer
    );
  }

  checkColumn(col: number): boolean {
    return (
      this.board[0][col] === this.currentPlayer &&
      this.board[1][col] === this.currentPlayer &&
      this.board[2][col] === this.currentPlayer
    );
  }

  checkDiagonal(): boolean {
    return (
      this.board[0][0] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][2] === this.currentPlayer
    );
  }

  checkAntiDiagonal(): boolean {
    return (
      this.board[0][2] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][0] === this.currentPlayer
    );
  }

  resetGame() {
    this.initializeBoard();
  }
}
