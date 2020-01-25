import React from 'react';
import { Input, message } from 'antd';
import './PaperScissorsRock.css';
import lang from '../files/lang.json';
import RockImg from '../img/Rock.png';
import PaperImg from '../img/Paper.png';
import ScissorsImg from '../img/Scissors.png';

const { Search } = Input;


class PaperScissorsRock extends React.Component {
  constructor() {
    super();
    this.state={
      playerName:'',
      playerComputerName:'Player 2',
      firstFeat:{
        img: RockImg,
        weightElement:1
      },
      secondFeat:{
        img: PaperImg,
        weightElement:2
      },
      thirdFeat:{
        img: ScissorsImg,
        weightElement:3
      },
      yourChoice:'',
      computerChoice: '',
      scoreText:''
    };
    
  }

  setPlayerName = (name) => {
    if (name!==''){
      this.setState({playerName:name})
    } else {
      message.error(lang[localStorage.getItem('lang')].placeholderPaperScissorsRock);
    }

    
  }

  playGame = ( selectedElement ) => {
    if (selectedElement ===1) {
          this.setState({yourChoice:this.state.firstFeat.img})
    } else if (selectedElement ===2) {
      this.setState({yourChoice:this.state.secondFeat.img})
    } else if (selectedElement ===3) {
      this.setState({yourChoice:this.state.thirdFeat.img})
    }

    let computer = Math.floor(Math.random() * 3) + 1;
    if (computer===1){
      this.setState({computerChoice:this.state.firstFeat.img})
    } else if (computer===2){
      this.setState({computerChoice:this.state.secondFeat.img})
    }else if (computer===3){
      this.setState({computerChoice:this.state.thirdFeat.img})
    }
    this.generateScoreText(selectedElement,computer)

  }

  generateScoreText = (playerFirst, playerSecond) =>{
    let scoreText;
    let scoreTitleText = lang[localStorage.getItem('lang')].scoreTextTitle;
    // tie
    if (playerFirst===playerSecond) {
      scoreText= lang[localStorage.getItem('lang')].tieGameTextTitle;
      this.setState({scoreText})
      return
    } else if (playerFirst===1 && playerSecond===2) {
      //rock and paper
      scoreText= `${scoreTitleText} ${this.state.playerComputerName} !`
      this.setState({scoreText})
      return
    } else if (playerFirst===1 && playerSecond===3) {
      //rock and scissors 
      scoreText= `${scoreTitleText} ${this.state.playerName} !`
      this.setState({scoreText})
      return
    } else if (playerFirst===2 && playerSecond===1) {
      //paper and rock 
      scoreText= `${scoreTitleText} ${this.state.playerName} !`
      this.setState({scoreText})
      return
    } else if (playerFirst===2 && playerSecond===3) {
      //paper and scissors 
      scoreText= `${scoreTitleText} ${this.state.playerComputerName} !`
      this.setState({scoreText})
      return
    } else if (playerFirst===3 && playerSecond===1) {
      //scissors and rock 
      scoreText= `${scoreTitleText} ${this.state.playerComputerName} !`
      this.setState({scoreText})
      return
    }else if (playerFirst===3 && playerSecond===2) {
      //scissors and paper 
      scoreText= `${scoreTitleText} ${this.state.playerName} !`
      this.setState({scoreText})
      return
    }
    this.setState({scoreText})
  };


  render() {

    return (
      <div className="container paper-scissor-rock-container">
      <h3>{lang[localStorage.getItem('lang')].setNamePaperScissorsRock}</h3>
        <Search
          className="input-set-name"
          placeholder={lang[localStorage.getItem('lang')].placeholderPaperScissorsRock}
          enterButton="OK"
          size="large"
          onSearch={value => this.setPlayerName(value)}
        />
        <h3 className={(this.state.playerName!=='') ? "board-show" : "board-hide"}>{lang[localStorage.getItem('lang')].playText}</h3>
        <div className={(this.state.playerName!=='') ? "board-show" : "board-hide"}>
          <div className="player-space">
          <div className="single-field" onClick={this.playGame.bind(this,1)}>
             <img src={this.state.firstFeat.img} alt="img" width={100} height={100} />
          </div>
          <div className="single-field" onClick={this.playGame.bind(this,2)}>
            <img src={this.state.secondFeat.img} alt="img" width={100} height={100} />
          </div>
          <div className="single-field" onClick={this.playGame.bind(this,3)}>
            <img src={this.state.thirdFeat.img} width={100} alt="img" height={100} />
          </div>
        </div>
        <div className={(this.state.yourChoice!=='') ? "names-players board-show" : "names-players board-hide"}>
          <span>{this.state.playerName}</span>
          <span>{this.state.playerComputerName}</span>
        </div>
        
        <div className={(this.state.yourChoice!=='') ? "game-space board-show" : "game-space board-hide"}>
          <div className="single-field">
              <img src={this.state.yourChoice} alt="img" width={100} height={100} />
          </div>
          <div className="single-field text-vs">
            <span>VS</span>
          </div>
          <div className="single-field">
            <img src={this.state.computerChoice} width={100} alt="img" height={100} />
          </div>
        </div>
        <h3 className={(this.state.yourChoice!=='' && this.state.scoreText !=='') ? "board-show" : "board-hide"}> {this.state.scoreText}</h3>
        </div>
      </div>
    );
  }
}


export default PaperScissorsRock;