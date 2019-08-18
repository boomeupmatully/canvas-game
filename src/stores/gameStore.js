import { observable, computed, action, decorate } from 'mobx';
import cardData from './data';
import { doWhileStatement } from '@babel/types';
class GameStore{
    
    initializingGame = observable.box(1);
    gameStatus = observable.box('not_started');
    cards = observable.box([]);
    player_cards_index = [];
    player_cards = [];
    score = observable.box(0);
    
    loadCards = () =>{
        this.cards = cardData;
        return this.cards;
    }
     
    randomCard = () =>{
        
        var max = this.cards.length-1;
        var min = 0;
        var index = false;
        while (index === false) {
            var val = this._generateRandomCard(max, min);
            
            console.log(this.player_cards);
            if(!this.player_cards_index.includes(val)){
                index = val;
            }
        }

        this.player_cards_index.push(val);
        this.cards.map(item=>console.log(item))
        //console.log("generated - x is "+this.cards[index].x+" and current is "+this.cards[index].current_x);
        this.cards[index].x=565;
        this.cards[index].current_x = null;

        return this.cards[index];
    }

    _generateRandomCard = (max, min) =>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    clearData(){
        this.cards = [];
        this.player_cards_index = [];
        this.player_cards = [];
        this.initializingGame = observable.box(1);
        this.gameStatus = observable.box('not_started');
        this.score = observable.box(0);
        this.loadCards();
    }

}

export default new GameStore();