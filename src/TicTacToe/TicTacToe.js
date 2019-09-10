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

    async onFieldClick(index) {
        if (!this.state.gameEnabled) { return };
        if (this.state.board[index] !=="") { message.warning(lang[localStorage.getItem('lang')].seatTakenMessageWarning); return };
        let board = this.state.board;
        board[index] = 'X';
        this.setState({
            turn: this.state.turn + 1,
            board,

        }, this.computerTurn)
        this.checkGameStatus('X');    
    }

    getRandomInt() {
        let min = Math.ceil(0);
        let max = Math.floor(8);
    
        return Math.floor(Math.random() * (max - min -1)) + min;
    }

    computerTurn() {
        let board = this.state.board;
        let computerFieldSelected = this.getRandomInt();
    
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
        this.checkGameStatus('O');      
    }

    checkGameStatus(selectedPlayer) {
        for ( let i=0; i <=6; i=i+3) {
            if (!!this.state.board[i] && !!this.state.board[i+1] && !!this.state.board[i+2]) {
                if (this.state.board[i] === this.state.board[i+1] && this.state.board[i+1] === this.state.board[i+2]) {
                    this.endGame(selectedPlayer);
                }
            }
        }

        for ( let i=0; i < 3; i++) {
            if (!!this.state.board[i] && !!this.state.board[i+3] && !!this.state.board[i+6]) {
                if (this.state.board[i] === this.state.board[i+3] && this.state.board[i+3] === this.state.board[i+6]) {
                    this.endGame(selectedPlayer);
                }
            }
        }

        if (!!this.state.board[0] && !!this.state.board[4] && !!this.state.board[8]) {
            if (this.state.board[0] === this.state.board[4] && this.state.board[4] === this.state.board[8]) {
                this.endGame(selectedPlayer);
            }
        }

        if (!!this.state.board[2] && !!this.state.board[4] && !!this.state.board[6]) {
            if (this.state.board[2] === this.state.board[4] && this.state.board[4] === this.state.board[6]) {
                this.endGame(selectedPlayer);
            }
        }

        if (this.state.gameEnabled && this.state.turn>7) {
            this.endGame(false);
        }
    }

    endGame (selectedPlayer) {
            this.setState({
                gameEnabled: false
            })
            if (selectedPlayer) {
                 this.setState({
                    isVisibleModal: true
                });
                this.showModal(selectedPlayer)
                return
            } else if (this.state.gameEnabled) {
                message.info(lang[localStorage.getItem('lang')].drawGameMessageInfo);
                return  
            }

            // if (!this.state.gameEnabled) {
            //         return;
            //     }
            }
  

    resetGame() {
        console.log('reset');
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
                                return <div className="game-board--field" key={key} onClick={this.onFieldClick.bind(this,key)}>
                                    <div className="game-board--content">{field}</div>
                                </div>
                            })
                        }
                    </div>

                    <Button onClick={this.resetGame.bind(this)} type="primary">{lang[localStorage.getItem('lang')].resetGameButton}</Button>
                </div>
            </div>
            
        );
    }
  
}

export default TicTacToe;