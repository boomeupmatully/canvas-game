import React from 'react';
import '../components/canvas.styles.scss';

import { inject, observer } from 'mobx-react';

import GameStore from '../stores/gameStore';



class CanvasComponent extends React.Component {
    constructor(){
        super(); 
        this.context = {};  
        this.canvas = {};
        this.animationRef = null;
        this.imageRef = {};
        this.buttons_text = [
            {
                x: 840,
                y: 50,
                fill_style: 'white',
                font: 'bold 40px sans-serif',
                fill_text: 'Deal Cards',
                id: "deal_button_text",
                width:250,
                height:50

            },
            {
                x: 840,
                y: 50,
                fill_style: 'white',
                font: 'bold 40px sans-serif',
                fill_text: 'Flip Card',
                id: "flip_card_text",
                width:250,
                height:50

            },
            {
                x: 10,
                y: 210,
                fill_style: 'white',
                font: '30px sans-serif',
                fill_text: 'Score: ',
                id: "score_text",
                width:250,
                height:50

            },
            {
                x: 840,
                y: 50,
                fill_style: 'white',
                font: 'bold 40px sans-serif',
                fill_text: 'Hit Me',
                id: "hit_me_text",
                width:250,
                height:50

            },
            {
                x: 210,
                y: 420,
                fill_style: 'white',
                font: 'bold 40px sans-serif',
                fill_text: 'Nice Job! Click The Button In Top Right Hand Corner To Play Again.',
                id: "game_over_text",
                width:800,
                height:50

            },
            {
                x: 840,
                y: 50,
                fill_style: 'white',
                font: 'bold 40px sans-serif',
                fill_text: 'Play Again!',
                id: "start_over_text",
                width:250,
                height:50

            },

        ];
        this.buttons = [
            {
              x: 830,
              y: 10,
              color: 'rgb(255,0,0)',
              id: "deal_button",
              width:250,
              height:50

            },
            {
                x: 830,
                y: 10,
                color: 'purple',
                id: "flip_card",
                width:250,
                height:50
  
              },
              {
                x: 0,
                y: 180,
                color: 'black',
                id: "score",
                width:250,
                height:50
  
              },
              {
                x: 830,
                y: 10,
                color: 'green',
                id: "hit_me",
                width:250,
                height:50
  
              },
              {
                x: 140,
                y: 380,
                color: 'black',
                id: "game_over",
                width:900,
                height:50
  
              },
              {
                x: 830,
                y: 10,
                color: 'blue',
                id: "start_over",
                width:250,
                height:50
  
              },
            
          ];
        
    }
    componentDidMount() {

        GameStore.loadCards();
        
        this.updateCanvas();
        this.loadImageRef({
            name : "gray_back.png",
            refName: "gray_back",
            url: "images/gray_back.png",
            width: 120,
            height: 183,
            x: 565,
            y: 150,
            current_x:null,
            current_y:null
        }, this, function(img_obj, class_obj){
        });
        this.loadImageRef({
            name : "back_cards-07.png",
            refName: "back_cards",
            url: "images/back_cards-07.png",
            width: 400,
            height: 193,
            x: 0,
            y: 0,
            current_x:null,
            current_y:null
        }, this, function(img_obj, class_obj){
            class_obj.addImage(class_obj.context, img_obj, class_obj, function(img_obj, class_obj){
                class_obj.animationRef = window.requestAnimationFrame(function(timestamp){
                    var destination_obj = {
                        x: 700,
                        y: img_obj['current_y'],
                        restoreDefault: false
                    }
                    class_obj.animate(timestamp, img_obj, class_obj, destination_obj, function(img_obj, class_obj){
                        var destination_obj = {
                            x: 0,
                            y: img_obj['current_y'],
                            restoreDefault: false
                        }
                        class_obj.animate(timestamp, img_obj, class_obj, destination_obj, function(img_obj, class_obj){
                            class_obj.displayActionElements();
                            

                            });   
                    });
                });
            });

        });
   
        this.addListeners();
    }

    displayActionElements(){
        if( GameStore.initializingGame){
            const button = this.buttons.find(obj => obj.id === "deal_button");
            this.context.beginPath();
            this.context.shadowColor = 'gray';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.rect(button.x, button.y, button.width, button.height);
            this.context.fillStyle = button.color;
            this.context.fill();
                
            const text = this.buttons_text.find(obj => obj.id === "deal_button_text");
            this.context.beginPath();
            this.context.fillStyle = text.fill_style;
            this.context.font = text.font;
            this.context.fillText(text.fill_text, text.x, text.y, text.width );
            GameStore.initializingGame = 0;
            GameStore.gameStatus = 'ready_to_deal';
        }
        
        if(GameStore.gameStatus === 'ready_to_flip'){
            const button = this.buttons.find(obj => obj.id === "flip_card");
            this.context.beginPath();
            this.context.shadowColor = 'gray';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.rect(button.x, button.y, button.width, button.height);
            this.context.fillStyle = button.color;
            this.context.fill();
                
            const text = this.buttons_text.find(obj => obj.id === "flip_card_text");
            this.context.beginPath();
            this.context.fillStyle = text.fill_style;
            this.context.font = text.font;
            this.context.fillText(text.fill_text, text.x, text.y, text.width );
            GameStore.initializingGame = 0;
            GameStore.gameStatus = 'flipped_card';   
        }

        if(GameStore.gameStatus === 'hit_me'){
            const button = this.buttons.find(obj => obj.id === "hit_me");
            this.context.beginPath();
            this.context.shadowColor = 'gray';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.rect(button.x, button.y, button.width, button.height);
            this.context.fillStyle = button.color;
            this.context.fill();
                
            const text = this.buttons_text.find(obj => obj.id === "hit_me_text");
            this.context.beginPath();
            this.context.fillStyle = text.fill_style;
            this.context.font = text.font;
            this.context.fillText(text.fill_text, text.x, text.y, text.width );
            GameStore.initializingGame = 0;
            GameStore.gameStatus = 'hit_me';   
        }

        if(GameStore.gameStatus === 'game_over'){
            const button = this.buttons.find(obj => obj.id === "game_over");
            this.context.beginPath();
            this.context.shadowColor = 'gray';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.rect(button.x, button.y, button.width, button.height);
            this.context.fillStyle = button.color;
            this.context.fill();
                
            const text = this.buttons_text.find(obj => obj.id === "game_over_text");
            this.context.beginPath();
            this.context.fillStyle = text.fill_style;
            this.context.font = text.font;
            this.context.fillText(text.fill_text, text.x, text.y, text.width );
            
            const button2 = this.buttons.find(obj => obj.id === "start_over");
            this.context.beginPath();
            this.context.shadowColor = 'gray';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.rect(button2.x, button2.y, button2.width, button2.height);
            this.context.fillStyle = button2.color;
            this.context.fill();
                
            const text2 = this.buttons_text.find(obj => obj.id === "start_over_text");
            this.context.beginPath();
            this.context.fillStyle = text2.fill_style;
            this.context.font = text2.font;
            this.context.fillText(text2.fill_text, text2.x, text2.y, text2.width );
            
        }

        const button = this.buttons.find(obj => obj.id === "score");
            this.context.beginPath();
            this.context.shadowColor = 'gray';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.rect(button.x, button.y, button.width, button.height);
            this.context.fillStyle = button.color;
            this.context.fill();
                
            const text = this.buttons_text.find(obj => obj.id === "score_text");
            this.context.beginPath();
            this.context.fillStyle = text.fill_style;
            this.context.font = text.font;
            this.context.fillText(text.fill_text+GameStore.score, text.x, text.y, text.width );
        
    }
    dealButtonAction(){
        this.dealCard();
    }
    flipCardAction(){
        this.flipCard();
    }

    hitMeAction(){
        this.hitMe();
    }

    gameOverAction(){
        this.gameOver();
    }

    realMouseCoords(event, canvas){
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;
        var currentElement = canvas;
    
        do{
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while(currentElement = currentElement.offsetParent)
    
        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;
    
        return {x:canvasX, y:canvasY}
    }

    isIntersect = (point, item) => {
        var clicked_position =  [[point.x, point.x + 1], [point.y, point.y + 1]];
        var item_position = [[item.x, item.x + item.width], [item.y, item.y + item.height]];
        
        var h_match = this.comparePositions(clicked_position[0], item_position[0]);
        var v_match = this.comparePositions(clicked_position[1], item_position[1]);
        if(h_match && v_match){
            return true;
        }

        return false;

    }

    comparePositions(p1, p2) {
        var x1 = p1[0] < p2[0] ? p1 : p2;
        var x2 = p1[0] < p2[0] ? p2 : p1;
        return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
    }

    restoreDefaultDisplay = () =>{
        const class_obj = this;
        var item1 = this.imageRef["back_cards"];
        this.addImage(this.context, item1, this, function(){
        } )

        if(GameStore.gameStatus === "hit_me" || GameStore.gameStatus === "game_over"){
            var player_items = GameStore.player_cards.filter(record =>  record.destination.flipped_back !== true);
        }else{
            var player_items = GameStore.player_cards.filter(record => record.image.main_card !== true);

        }

        player_items.map(info =>{
            var obj  = info.image;
            obj.x = info.destination.x;
            obj.y = info.destination.y;
            class_obj.addImage(class_obj.context, obj, class_obj, function(){
            } )
        });

        


    }

    updateScore = (str) =>{
        var item =str.split(".png");
        var c = item[0].substr(0,1);
        console.log("fff "+c);
        if(Number(c) === 1 || isNaN(Number(c))){
            GameStore.score = GameStore.score + 10;
            console.log(GameStore.score);
        }else{
            GameStore.score = GameStore.score + Number(c);
            console.log(GameStore.score);
        }

    }

    loadImageRef = (obj, class_obj, call_back) =>{
        let img = new Image();
        img.src = obj.url;
        img.onload = function(){
            class_obj.imageRef[obj.refName] = obj;
            class_obj.imageRef[obj.refName]["obj"] = img;
            call_back(class_obj.imageRef[obj.refName], class_obj);
        }
    }

    addImage = (context, img_obj, class_obj, call_back ) =>{
        context.drawImage(img_obj['obj'], img_obj['x'], img_obj['y'], img_obj['width'], img_obj['height']);
        
        img_obj['current_x'] = img_obj['x'];
        img_obj['current_y'] = img_obj['y'];
        call_back(img_obj, class_obj);
    }

    updateCanvas() {
        this.canvas = this.refs.canvas;
        this.context = this.canvas.getContext('2d');
       
    }

    animate = (timestamp, img_obj, class_obj, destination_obj, call_back) =>{
        var x = null;
        var current_x = (img_obj['current_x'] !== null ? img_obj['current_x'] : img_obj['x']);
        var destination_x = destination_obj['x'];

        var y = null;
        var current_y = (img_obj['current_y'] !== null ? img_obj['current_y'] : img_obj['y']);
        var destination_y = destination_obj['y'];

        var restore_default = destination_obj['restoreDefault'];

        if(current_x !== destination_x){
            if(current_x > destination_x){
                x = current_x - 10;
                if( (x - destination_x) <= 10 ){
                    x = destination_x;
                }
            }else{
                x = current_x + 10;
                if( (destination_x - x) <= 10 ){
                    x = destination_x;
                }
            }
        }

        if(current_y !== destination_y){
            if(current_y > destination_y){
                y = current_y - 10;
                if( (y - destination_y) <= 10 ){
                    y = destination_y;
                }
            }else{
                y = current_y + 10;
                if( (destination_y - y) <= 10 ){
                    y = destination_y;
                }
            }
        }

        if(x !== null || y !== null){
            if(class_obj.animationRef !== null){
                setTimeout(function(){window.cancelAnimationFrame(class_obj.animationRef);},0);
            }
            if(x == null)x=img_obj['current_x'];
            if(y == null)y=img_obj['current_y'];
            //console.log("x is "+x+" and y is "+y);
            class_obj.context.clearRect(0, 0, class_obj.canvas.width, class_obj.canvas.height);
            if(restore_default){
                class_obj.restoreDefaultDisplay();
            }

            class_obj.context.drawImage(img_obj['obj'], x, y, img_obj['width'], img_obj['height']);
            
            setTimeout(function(x, y){
                img_obj['current_x'] = x;
                img_obj['current_y'] = y;
                class_obj.animationRef = window.requestAnimationFrame(function(timestamp){
                    class_obj.animate(timestamp, img_obj, class_obj, destination_obj, call_back);
                });
            }, 1000 / 60, x, y)


        }else{
            setTimeout(function(){
                window.cancelAnimationFrame(class_obj.animationRef);
                class_obj.animationRef=null;
            },0);
            call_back(img_obj, class_obj);
        }
    }

   
    hitMe(){
        if(GameStore.player_cards.length %2 === 0){
            var obj = GameStore.player_cards.map(item=>item.destination.x).sort((a,b)=>b-a);  
            console.log(obj);
            var new_x = obj[0]+130;

        }else{
            var obj = GameStore.player_cards.map(item=>item.destination.x).sort((a,b)=>a-b);  
            console.log(obj);
            var new_x = obj[0]-130;
        }


        this.loadImageRef(GameStore.randomCard(), this, function(img_obj, class_obj){

            class_obj.addImage(class_obj.context, img_obj, class_obj, function(img_obj, class_obj){
                class_obj.animationRef = window.requestAnimationFrame(function(timestamp){
                    var destination_obj = {
                        x: new_x,
                        y: 672,
                        restoreDefault: true

                    }
                    class_obj.animate(timestamp, img_obj, class_obj, destination_obj, function(img_obj, class_obj){
                        GameStore.player_cards.push({'image':img_obj,'destination':destination_obj});
                        class_obj.updateScore(img_obj.name);
                        class_obj.context.clearRect(0, 0, class_obj.canvas.width, class_obj.canvas.height);
                        class_obj.restoreDefaultDisplay();
                        GameStore.gameStatus = "hit_me";
                        class_obj.displayActionElements();
                        class_obj.checkScore();
                    });
                });
            });

        });


    }

    flipCard(){
        var item = GameStore.player_cards.find(i=> i.image.main_card === true);
        
        this.addImage(this.context, item.image, this, function(img_obj, class_obj){
            
            class_obj.updateScore(img_obj.name);
            GameStore.player_cards = GameStore.player_cards.filter(item=> item.destination.flipped_back !== true);

            
            GameStore.gameStatus = 'hit_me';
            class_obj.context.clearRect(0, 0, class_obj.canvas.width, class_obj.canvas.height);
            class_obj.restoreDefaultDisplay();
            class_obj.displayActionElements();
            


            
        });
    }

    dealCard(){
        var obj = GameStore.randomCard();
        obj['main_card'] = true;
        obj['y'] = 672;
        obj['x'] = 565;

        this.loadImageRef(obj, this, function(img_obj, class_obj){
            var destination_obj = {
                x: 565,
                y: 672,
                restoreDefault: true,
    
            } 
            GameStore.player_cards.push({'image':img_obj,'destination':destination_obj});
   
        })

            this.addImage(this.context, this.imageRef['gray_back'], this, function(img_obj, class_obj){
                class_obj.animationRef = window.requestAnimationFrame(function(timestamp){
                    var destination_obj = {
                        x: img_obj['current_x'],
                        y: 672,
                        restoreDefault: true,
                        flipped_back:true

                    }
                    class_obj.animate(timestamp, img_obj, class_obj, destination_obj, function(img_obj, class_obj){
                        
                        GameStore.player_cards.push({'image':img_obj,'destination':destination_obj});
                        class_obj.loadImageRef(GameStore.randomCard(), class_obj, function(img_obj, class_obj){
                            class_obj.addImage(class_obj.context, img_obj, class_obj, function(img_obj, class_obj){
                                class_obj.animationRef = window.requestAnimationFrame(function(timestamp){
                                    var destination_obj = {
                                        x: img_obj['current_x']-150,
                                        y: 672,
                                        restoreDefault: true
                
                                    }
                                    class_obj.animate(timestamp, img_obj, class_obj, destination_obj, function(img_obj, class_obj){
                                        GameStore.player_cards.push({'image':img_obj,'destination':destination_obj});
                                        class_obj.updateScore(img_obj.name);
                                        class_obj.context.clearRect(0, 0, class_obj.canvas.width, class_obj.canvas.height);
                                        class_obj.restoreDefaultDisplay();
                                        GameStore.gameStatus = "ready_to_flip";
                                        class_obj.displayActionElements();
                                    });
                                });
                            });
                
                        });
                    });
                });
            });

        
    }

    gameOver = () =>{
        // GameStore.clearData();
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.restoreDefaultDisplay();
        // this.displayActionElements();
        window.location.href = '/';
    }
    
    checkScore = () =>{
        if(GameStore.player_cards.length === 8){
            GameStore.gameStatus = "game_over";
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.restoreDefaultDisplay();
            this.displayActionElements();
        }
    }

    addListeners = () =>{

        this.canvas.addEventListener('click', e=>{
            const pos = this.realMouseCoords(e, this.canvas);
            console.log(pos);
            var selectedItem = null;
            this.buttons.forEach(button => {
                if (this.isIntersect(pos, button)) {
                    selectedItem = true;
                    
                }
              });
            
                if(selectedItem !== null){
                    if(GameStore.gameStatus === "ready_to_deal") {
                         this.dealButtonAction();
                    }else if(GameStore.gameStatus === "flipped_card") {
                        this.flipCardAction();
                    }else if(GameStore.gameStatus === "hit_me") {
                        this.hitMeAction();
                    }else if(GameStore.gameStatus === "game_over"){
                        this.gameOverAction();
                    }
                     
                }


        })
    }

    render() {
        return (
            <div>
            <div><center><h1>Card Game - Try to get a high score of 70 or above</h1></center></div>
            <canvas className="canvas" ref="canvas" width="1100px" height ="900px" />
            <br></br>
            </div>

        );
    }
}

export default CanvasComponent;