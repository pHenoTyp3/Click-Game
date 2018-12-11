import React, { Component } from 'react';
import Sound from 'react-sound';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Score from '../Score/Score.js';
import Alerts from '../Alerts/Alerts.js';
import Card from '../Card/Card.js';
import cards from '../../assets/JSON/cards.json';
import soundIncorrect from '../../assets/sounds/wrong.mp3';
import soundCorrect from '../../assets/sounds/correct.mp3';
import theme from '../../assets/sounds/nyancat.mp3';

class App extends Component{
    state = {
        cards,
        score: 0,
        topScore: 0,
        selected: [],
        soundURL: theme,
        soundStatus: Sound.status.PLAYING,
        soundState: 0,
        shake: "",
        msg1: "Click A Cat!! =^.^=",
        msg2: "",
        alertType: "info",
        topScoreType: "info",
        volume: "on"
    }

    shuffle = (id) => {
        this.setState({
            cards: this.state.cards.sort(function(a,b){
                    return 0.5 - Math.random();
                }
            )
        })
    }
 
    
    volumeBtnClick = () => {
        if(this.state.volume === "off"){
            this.setState({ 
                volume: "on",
                soundStatus: Sound.status.PLAYING
            });
        }
        else{
            this.setState({ 
                volume: "off",
                soundStatus: Sound.status.PAUSED,
                soundURL: theme
            });
            
        }
    };
// ON CLICK: INCREMENT COUNT ON CARD
plusClick = id => {
        let ids = this.state.selected
        const incorrect = ids.includes(id);
        if(!incorrect){
            this.state.selected.push(id);
            let newScore = this.state.score + 1;
            this.setState({score: newScore});
            if(newScore === 12){
                this.setState({
                    score: 0,
                    selected: [],
                    topScore: newScore,
                    msg1: "You win!",
                    msg2: "",
                    alertType: "success"
                });
                if(this.state.volume === "on"){
                    this.setState({ 
                        soundStatus: Sound.status.PLAYING,
                        soundState: 0,
                        soundURL: soundCorrect
                    });
                }
            }
            else if(newScore > this.state.topScore){
                this.setState({
                    topScore: newScore, 
                    msg1: "Nice!",
                    msg2: "You guessed correctly!",
                    alertType: "success",
                    topScoreType: "success"
                });
                if(this.state.volume === "on"){
                    this.setState({ 
                        soundStatus: Sound.status.PLAYING,
                        soundState: 0,
                        soundURL: soundCorrect
                    });
                }
            }
            else{
                this.setState({
                    msg1: "Nice!",
                    msg2: "You guessed correctly!",
                    alertType: "success",
                    topScoreType: "info"
                });
                if(this.state.volume === "on"){
                    this.setState({ 
                        soundStatus: Sound.status.PLAYING,
                        soundState: 0,
                        soundURL: soundCorrect
                    });
                }
            }
        }
        else{
            this.setState({
                score: 0,
                selected: [], 
                shake: "incorrect",
                msg1: "WRONG!",
                msg2: "Start over and try again!",
                alertType: "danger",
                topScoreType: "info"
            });
            if(this.state.volume === "on"){
                this.setState({ 
                    soundStatus: Sound.status.PLAYING,
                    soundState: 0,
                    soundURL: soundIncorrect
                });
            }
            setTimeout(function(){ 
                this.setState({ shake: "" }); 
            }.bind(this), 1000);
        }
    };
// RENDER 
    render(){
        return(
            <div className="app">
                <Header/>
                <Alerts
                    msg1={this.state.msg1}
                    msg2={this.state.msg2}
                    alertType={this.state.alertType}
                />
                <Score 
                    shake={this.state.shake}
                    score={this.state.score} 
                    topScore={this.state.topScore}
                    alertType={this.state.alertType}
                    topScoreType={this.state.topScoreType}
                />
                <Main 
                    shake={this.state.shake}
                    vol_on={this.state.volume}
                    volume={this.volumeBtnClick}
                >
                    {this.state.cards.map((cards,i) => (
                        <Card 
                            id={cards.id} 
                            name={cards.name} 
                            image={cards.image} 
                            key={i} 
                            inc={this.plusClick} shuffle={this.shuffle}
                        />
                    ))}
                </Main>
                <Sound 
                    autoLoad={true} 
                    url={this.state.soundURL} 
                    playStatus={this.state.soundStatus} 
                    playPosition={this.state.soundState}
                />
                {/* <Footer/> */}
            </div>
        );
    };
}
// EXPORT DEFAULT: App
export default App;
