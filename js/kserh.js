kserh = kserh || {};

var stage = new Kinetic.Stage({
    container : 'container',
    width : 800,
    height : 400
});
var layer = new Kinetic.Layer();

/*
* create a triangle shape by defining a
* drawing function which draws a triangle

var triangle = new Kinetic.Shape({
drawFunc : function(canvas) {
var context = canvas.getContext();
context.beginPath();
context.moveTo(200, 50);
context.lineTo(420, 80);
context.quadraticCurveTo(300, 100, 260, 170);
context.closePath();
canvas.fillStroke(this);
},
fill : '#00D2FF',
stroke : 'black',
strokeWidth : 4
});*/

// add the triangle shape to the layer
//layer.add(triangle);

// add the layer to the stage
kserh.Game = function() {
    if (kserh.Game.prototype._singletonInstance) {
        return kserh.Game.prototype._singletonInstance;
    }
    kserh.Game.prototype._singletonInstance = this;

    this.card_images = null;
    /*for ( s = kserh.suits.clubs; s <= kserh.suits.spades; s++) {

     for ( r = kserh.ranks.two; r <= kserh.ranks.ace; r++) {
     this.card_images[s][r] = s + "," + r;
     }
     }*/
    this.card_height = 200;
    this.card_width = kserh.card_ratio * this.card_height;

    this.deck = null;
    //Cards collection
    this.cards_player = null;
    //this.cards_cpu = null;
    this.cards_down = null;
    this.cards_played = null;
    //Track played cards for AI
    //Score
    this.score = null;
    this.score_cards = null;
    this.score_kseres = null;

    this.player_turn = null;

    //Setup game *Make card graphics and store
    this.setup = function() {
        var game = kserh.Game.prototype._singletonInstance;
        game.card_images = new Array();
        for ( s = kserh.suits.clubs; s <= kserh.suits.spades; s++) {
            game.card_images[s] = new Array();
            for ( r = kserh.ranks.two; r <= kserh.ranks.ace; r++) {
                //this.card_images[s][r] = "AZZZ";
                var card = new Kinetic.Shape({
                    drawFunc : function(canvas) {
                        var context = canvas.getContext();
                        var rank = kserh.ranks_chars[r];
                        //'3';
                        var suit = kserh.suits_chars[s];
                        // var card_height = game.card_height;
                        // var card_width = kserh.Game.prototype._singletonInstance.card_width;

                        /*context.beginPath();
                         context.moveTo(0, 0);
                         context.lineTo(0, game.card_height);
                         context.lineTo(game.card_width, game.card_height);
                         context.lineTo(game.card_width, 0);
                         context.lineTo(0, 0);
                         context.closePath();
                         canvas.fillStroke(this);*/
                        context.fillStyle = "#333";
                        context.fillRect(0, 0, game.card_width, game.card_height);
                        context.fillStyle = "#ccc";
                        context.fillRect(1, 1, game.card_width - 2, game.card_height - 2);

                        //context.quadraticCurveTo(300, 100, 260, 170);
                        //Draw Suit

                        if (s == kserh.suits.hearts || s == kserh.suits.diamonds) {
                            context.fillStyle = "#f11";
                        } else {
                            context.fillStyle = "#000";
                        }
                        context.font = "18px Arial";
                        context.textAlign = "center";
                        context.textBaseline = "middle";
                        context.fillText(rank, 20, 20);

                        context.fillText(suit, 40, 20);

                        context.font = game.card_height + "px Arial";
                        context.fillText(suit, game.card_width / 2, game.card_height / 2);

                    },
                    /*fill : '#00D2FF',
                     stroke : 'black',
                     strokeWidth : 1*/
                });

                card.toImage({
                    // cached image will be 120 x 120
                    width : game.card_width,
                    height : game.card_height,
                    rank : r,
                    suit : s,
                    /*
                     * when star has been converted into an image,
                     * use the image to instantiate image objects and
                     * then add them to the layer
                     */
                    callback : function(img) {
                        //console.log(this.rank);
                        //console.log(this.suit);
                        //console.log( kserh.Game.prototype._singletonInstance.card_images);
                        kserh.Game.prototype._singletonInstance.card_images[ this.suit ][this.rank] = img;
                        /*for(var n = 0; n < 10; n++) {
                        var image = new Kinetic.Image({
                        image: img,
                        x: Math.random() * stage.getWidth(),
                        y: Math.random() * stage.getHeight(),
                        offset: 60,

                        });

                        layer.add(image);
                        }*/

                        //layer.draw();
                    }
                });
                //this.cards.push(new kserh.card(s, r));
            }
        }
    };

    //Create new game
    this.new_game = function() {
        this.deck = new kserh.deck();
        this.deck.setup();
        this.deck.shuffle();

        this.cards_player = new Array(2);
        this.cards_player[0] = new kserh.card_collection();
        this.cards_player[1] = new kserh.card_collection();

        this.cards_down = new kserh.card_collection();
        this.cards_played = new kserh.card_collection();

        this.score = new Array(2);
        this.score[0] = 0;
        this.score[1] = 0;

        this.score_cards = new Array(2);
        this.score_cards[0] = 0;
        this.score_cards[1] = 0;

        this.score_kseres = new Array(2);
        this.score_kseres[0] = 0;
        this.score_kseres[1] = 0;

        this.player_turn = 0;

        this.shuffle();
    };
    this.score_add = function(player, points, cards) {
        this.score[player] += points;
        this.score_cards[player] += cards;
    };
    this.playCPU = function() {
        if (this.cards_player[1].count() == 1) {
            return 0;
        }

        if (this.cards_player[1].count() != 0) {
            //Same rank
            for (var t = 0; t < this.cards_player[1].count(); t++) {
                if (this.cards_down.last().rank == this.cards_player[1].at(t).rank) {
                    return t;
                }
            }

            //Jack
            var down_points = this.cards_down.points();
            if (down_points >= (this.cards_player[1].count() == 1 ? 1 : 2)) {
                for (var t = 0; t < this.cards_player[1].count(); t++) {
                    if (this.cards_player[1].last.rank == kserh.ranks.jack) {
                        return t;
                    }
                }
            }
        }

        //Then select best
        var rank_table = new Array(13);

        var t;
        for ( t = 0; t < 13; t++) {
            rankTable[t] = 0;
        }
        for ( t = 0; t < this.cards_played.count(); t++) {
            rankTable[this.cards_played.at(t).rank]++;
        }
        for ( t = 0; t < this.cards_player[1].count(); t++) {
            rankTable[this.cards_player[1].at(t).rank]++;
        }

        var max = 0;
        //pick card
        /*
         for ( t = 1; t < this.cards_player[1].count(); t++) {
         if (rank_table[this.cards_player[1].at(t).rank] >= rankTable[this.cards_player[1].at(max).rank] && this.cardPoints(this.enemyCards.get(t)) < this.cardPoints(this.enemyCards.get(max)) && this.enemyCards.get(t).rank != 10) {

         max = t;
         }
         }*/

        return max;
        return 0;
    };
    this.turn = function() {
        if (this.player_turn == 0) {
            //Activate controls
        } else {
            //Deactivate controls
        }
    };
    this.shuffle = function() {
        for (var i = 0; i < 6; i++) {
            this.cards_player[0].add(this.deck.pop());
            this.cards_player[1].add(this.deck.pop());
        }
    };
    this.played = function(card) {
        this.player_turn
        this.cards_played.add(card);
        this.cards_down.add(card);
        if (this.cards_down.count() >= 2) {
            //same cards
            if (this.cards_down.last().rank == this.cards_down.at(this.cards_down.count - 2).rank) {
                this.score_add(this.player_turn, this.cards_down.points(), this.cards_down.count);
                //kserh
                if (this.cards_down.count() == 2) {
                    if (card.rank == kserh.ranks.jack) {
                        this.score_add(this.player_turn, 20, 0);
                    } else {
                        this.score_add(this.player_turn, 10, 0);
                    }
                }
                //jack
            } else if (card.rank == kserh.ranks.jack) {
                this.score_add(this.player_turn, this.cards_down.points(), this.cards_down.count);

            }
        }
        this.player_turn = (this.player_turn + 1 ) % 2;
        var game_over = false;
        if (this.cards_player[0].count() == 0 && this.cards_player[1].count() == 0) {
            game_over = true;
        }
        if (game_over) {
            if (this.deck.count() > 0) {
                this.shuffle();
            } else {
                /*var p = 0;
                 if(this.cards[1] > this.cards[0] ){
                 p=1;
                 }
                 this.addScore(p,this.calculatePoints(),this.downCards.size());

                 remove();
                 this.downCards.removeAll();
                 gameOver = false;
                 if(this.score[0] >= scoreCap || this.score[1] >= scoreCap){
                 gameOver = true;
                 }
                 if(gameOver==false){
                 this.setupRound();
                 return;
                 }else{
                 p=0;
                 if(this.score[1] > this.score[0]){
                 p=1;
                 }
                 alert("Player " + p  + " wins !!");
                 return;
                 }
                 }*/
            }
        }
    };

    //Setup Cards images
    this.test = function() {
        console.log(this.card_images[0][0]);
        var ace_of_spades = new Kinetic.Image({
            x : stage.getWidth() * Math.random(),
            y : (stage.getHeight() / 2) * Math.random(),
            image : this.card_images[Math.floor( Math.random()*3)][Math.floor(Math.random() * 13)],
            width : this.card_width,
            height : this.card_height,
            draggable : false
        });
        ace_of_spades.on("mouseover", function() {
            console.log("OVER ");
            document.body.style.cursor = "pointer";
            console.log(stage);
        });
        ace_of_spades.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
        layer.add(ace_of_spades);
    };
}
var game = new kserh.Game();
game.setup();
//window.setTimeout(game.test(), 100000);
stage.add(layer);

function tt() {
    game.test();
    layer.draw();

}
