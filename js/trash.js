
/*
var card = new Kinetic.Shape({
    drawFunc : function(canvas) {
        var context = canvas.getContext();
        var rank = '3';
        var suit = "♠";
        var width = 200 * kserh.card_ratio;
        context.fillStyle = "#ccc";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 200);
        context.lineTo(width, 200);
        context.lineTo(width, 0);
        context.lineTo(0, 0);
        context.closePath();
        canvas.fillStroke(this);
        //context.quadraticCurveTo(300, 100, 260, 170);
        //Draw Suit
        context.fillStyle = "#FFF";
        context.font = "18px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(rank, 20, 20);

        context.fillText("♠", 40, 20);

        context.font = "200px Arial";
        context.fillText(suit, width / 2, 200 / 2);

    },
    fill : '#00D2FF',
    stroke : 'black',
    strokeWidth : 1,
    rank : 3
});

card.toImage({
    // cached image will be 120 x 120
    width : 200 * kserh.card_ratio,
    height : 200,
    rank : 1,
    /*
     * when star has been converted into an image,
     * use the image to instantiate image objects and
     * then add them to the layer
     */
    callback : function(img) {
        console.log(this.rank);
        /*for(var n = 0; n < 10; n++) {
        var image = new Kinetic.Image({
        image: img,
        x: Math.random() * stage.getWidth(),
        y: Math.random() * stage.getHeight(),
        offset: 60,
        draggable: true
        });

        layer.add(image);
        }*/

        //layer.draw();
    }
});

//layer.add(card);
