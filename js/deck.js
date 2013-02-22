kserh = kserh || {};

kserh.deck = function() {
    this.cards = [];

}

kserh.deck.prototype.setup = function() {
    this.cards = new Array();
    for ( r = kserh.ranks.two; r <= kserh.ranks.ace; r++) {
        for ( s = kserh.suits.clubs; s <= kserh.suits.spades; s++) {
            this.cards.push(new kserh.card(s, r));
        }
    }
};

kserh.deck.prototype.shuffle = function() {
    var steps = Math.floor(Math.random() * 60) + 50;
    for (var s = 0; s < steps; s++) {
        var index_a = Math.floor(Math.random() * 51);
        var index_b = Math.floor(Math.random() * 51);

        while (index_b == index_a) {
            index_b = Math.floor(Math.random() * 51);
        }
        var temp = this.cards[index_a];
        this.cards[index_a] = this.cards[index_b];
        this.cards[index_b] = temp;
    }
};

kserh.deck.prototype.pop = function() {
    if (this.cards.length > 0) {
        return this.cards.shift();
    }
    return null;
};
kserh.deck.prototype.count = function() {
    return this.cards.length;
};
