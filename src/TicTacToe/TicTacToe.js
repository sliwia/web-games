import React from 'react';
import { Button, Icon, Modal, message } from 'antd';
import './TicTacToe.css';
import lang from '../files/lang.json';


class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: 'O',
            player2: 'X',
            turn: 0,
            board: [
                '','','',
                '','','',
                '','',''
            ],
            gameEnabled: true,
            isVisibleModal: false,
        }
        this.computerTurn = this.computerTurn.bind(this);
    };

    selectGameMode (index) {
        let nbOfPlayer = localStorage.getItem('numberOfPlayers');
        if (nbOfPlayer==='onePlayer') {
            this.onFieldClickOnePlayer(index);
        } else {
            this.onFieldClickTwoPlayers(index);
        }
    }

    async onFieldClickOnePlayer(index) {
        if (!this.state.gameEnabled) { return };
        if (this.state.board[index] !== '') { message.warning(lang[localStorage.getItem('lang')].seatTakenMessageWarning); return };

        let board = this.state.board;
        board[index] = 'X';

        this.setState({
        turn: this.state.turn + 1,
        board
        }, this.computerTurn)

        this.checkGameStatus('X');
    }

    onFieldClickTwoPlayers(index) {
        if (!this.state.gameEnabled) { return };
        if (this.state.board[index] !=="") { message.warning(lang[localStorage.getItem('lang')].seatTakenMessageWarning); return };
        let selectedPlayer = this.state.turn % 2 === 0 ? this.state.player1 : this.state.player2;
        let board = this.state.board;
        board[index] = selectedPlayer;
        let turn = this.state.turn + 1;
        this.setState({
            board,
            turn
        });
        this.checkGameStatus(selectedPlayer);
    }

    computerTurn() {
        let { board } = this.state

        function _getRandomInt() {
        let min = Math.ceil(0);
        let max = Math.floor(8);

        return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let computerFieldSelected = _getRandomInt();

        if (board[computerFieldSelected] === '') {
        board[computerFieldSelected] = 'O'
        } else if (this.state.gameEnabled && this.state.board.indexOf('') >= 0) {
        this.computerTurn();
        return;
        } else return;

        this.setState({
        turn: this.state.turn + 1,
        board
        })

        this.checkGameStatus('o');
    }

    checkGameStatus(selectedPlayer) {
        if (!this.state.gameEnabled) { return }

        for (let i = 0; i <= 6; i = i + 3) {
        if (!!this.state.board[i] && !!this.state.board[i+1] && !!this.state.board[i+2]) {
            if (this.state.board[i] === this.state.board[i+1] && this.state.board[i+1] === this.state.board[i+2]) {
                this.endGame(selectedPlayer);
                return;
            }
        }
        }

        for (let i = 0; i < 3; i++) {
            if (!!this.state.board[i] && !!this.state.board[i+3] && !!this.state.board[i+6]) {
                if (this.state.board[i] === this.state.board[i+3] && this.state.board[i+3] === this.state.board[i+6]) {
                    this.endGame(selectedPlayer);
                    return;
                }
            }
        }

        if (!!this.state.board[0] && !!this.state.board[4] && !!this.state.board[8]) {
            if (this.state.board[0] === this.state.board[4] && this.state.board[4] === this.state.board[8]) {
                this.endGame(selectedPlayer);
                return;
            }
        }

        if (!!this.state.board[2] && !!this.state.board[4] && !!this.state.board[6]) {
            if (this.state.board[2] === this.state.board[4] && this.state.board[4] === this.state.board[6]) {
                this.endGame(selectedPlayer);
                return;
            }
        }

        if (this.state.gameEnabled && this.state.turn > 7) {
            this.endGame(false)
            return;
            }

        return;
    }

    endGame (selectedPlayer) {
        if (selectedPlayer) {
        this.setState({
            isVisibleModal: true
        });
        this.showModal(selectedPlayer)
        } else if (this.state.gameEnabled && this.state.turn > 7) {
        message.info(lang[localStorage.getItem('lang')].drawGameMessageInfo);
        return;
        }

        this.setState({
        gameEnabled: false,
        })       
    }
  

    resetGame() {
        this.setState({
            turn: 0,
            board: [
                '','','',
                '','','',
                '','',''
            ],
            gameEnabled: true,
            isVisibleModal: false
        })
    };

    showModal = (selectedPlayer) => {
        Modal.info({
          content: (
            <>
                <div><Icon type="trophy" /> { lang[localStorage.getItem('lang')].winnerGameMessageInfoPart1 } <Icon type="trophy" /> </div>   
                <div>{ lang[localStorage.getItem('lang')].winnerGameMessageInfoPart2 } { selectedPlayer } </div>
            </>
          ),
          onOk() {},
        });
    }
    
    render() {
        return (
            <div className="game-board-container">
                <div className="container">
                    <div className="game-board">
                        {
                            this.state.board.map((field,key) => {
                                return <div className="game-board--field" key={key} onClick={this.selectGameMode.bind(this,key)}>
                                    <div className="game-board--content">{field}</div>
                                </div>
                            })
                        }
                    </div>
                    <Button onClick={this.resetGame.bind(this)} type="primary"><Icon type="reload" /> {lang[localStorage.getItem('lang')].resetGameButton}</Button>
                </div>
            </div>
        );
    }
}


export default TicTacToe;