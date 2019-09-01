import React from 'react';
import { Button, Icon, Modal, message } from 'antd';
import './TicTacTou.css';


class TicTacTou extends React.Component {
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
            visibleModal: false,
            winner:''
        }
    };

    onFieldClick(index) {
        if (!this.state.gameEnabled) { return };
        if (this.state.board[index] !=="") { message.warning('Uwaga pole jest już zajęte, wybierz ponownie.'); return };
        let selectedPlayer = this.state.turn % 2 === 0 ? this.state.player1 : this.state.player2;
        let board = this.state.board;
        board[index] = selectedPlayer;
        let turn = new Number(this.state.turn) + 1;
        this.setState({
            board,
            turn
        });
        this.checkGameStatus(selectedPlayer);
        this.checkDraw();
    }

    checkDraw() {
        //rozwiązani nr 1
        if (!!this.state.gameEnabled && this.state.turn>7) {
            message.info('REMIS! Zresetuj planszę aby zagrać ponownie.');
        }

        //rozwiązani nr 2
        // if (!!this.state.board[0] && !!this.state.board[1] && !!this.state.board[2] && !!this.state.board[3] && !!this.state.board[4] && !!this.state.board[5] && !!this.state.board[6] && !!this.state.board[7] && !!this.state.board[8] && !!this.state.gameEnabled ) {
        //     message.info('REMIS! Zresetuj planszę aby zagrać ponownie.');
        // }
    };

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
    }

    endGame(selectedPlayer) {
        let newStatus = false;
        console.log('newStatus',newStatus)
        this.setState({
            gameEnabled: newStatus,
            winner: selectedPlayer,
            visibleModal: true
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
            visibleModal: false
        })
    };
    
    handleOk = () => {
        this.setState({
            visibleModal: false,
        });
    };
    
    handleCancel = () => {
        this.setState({
            visibleModal: false,
        });
    };
    
    render() {
        return (
            <>
            <div className="game-board">
                {
                    this.state.board.map((field,key) => {
                        return <div className="game-board--field" key={key} onClick={this.onFieldClick.bind(this,key)}>
                            <div className="game-board--content">{field}</div>
                        </div>
                    })
                }
            </div>

            <Button onClick={this.resetGame.bind(this)} type="primary">Reset planszy</Button>
            
            <Modal
                title="Zwycięzca !"
                visible={this.state.visibleModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
            <div><Icon type="trophy" /> ! BRAWO ! <Icon type="trophy" /> </div>   
            <div>Wygrał gracz: { this.state.winner } </div>
            </Modal>
            </>
        );
    }
  
}

export default TicTacTou;