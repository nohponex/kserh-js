kserh = kserh || {};

kserh.card_collection = function() {
    this.cards = new Array();

}
kserh.card_collection.prototype.push = function(card) {
    this.cards.push(card);
};

kserh.card_collection.prototype.count = function() {
    return this.cards.length;
};
kserh.card_collection.prototype.clear = function() {
    this.card = new Array();
};
kserh.card_collection.prototype.at = function(i) {
    return this.cards[i];
};

kserh.card_collection.prototype.remove = function(i) {
    return this.cards.splice(i, 1);
};
kserh.card_collection.prototype.toString = function() {
    var string = '{';
    for (var i = 0; i < this.cards.length; i++) {
        string += ',' + this.cards[i].toString();
    }
    return string + '}';
};
kserh.card_collection.prototype.points = function() {
    var points = 0;
    for (var i = 0; i < this.cards.length; i++) {
        points += this.cards[i].points();
    }
    return points;
};
kserh.card_collection.prototype.last = function() {
    if (!this.cards.length) {
        return null;
    }
    return this.cards[this.cards.length - 1];
};
