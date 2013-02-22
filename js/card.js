var kserh = kserh || {};

kserh.suits = {
    clubs : 0,
    diamonds : 1,
    hearts : 2,
    spades : 3
};

kserh.suits_chars = ["♣", "♦", "♥", "♠"];

kserh.ranks = {
    two : 0,
    three : 1,
    four : 2,
    five : 3,
    six : 4,
    seven : 5,
    eight : 6,
    nine : 7,
    ten : 8,
    jack : 9,
    queen : 10,
    king : 11,
    ace : 12
};

kserh.ranks_chars = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

kserh.card = function(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

kserh.card.prototype.toString = function() {
    return this.suit + "|" + this.rank;
};

kserh.card.prototype.points = function() {
    var points = 0;
    if (this.rank >= kserh.ranks.ten) {
        points += 1;
    }
    // TO FIX
    if (this.rank == kserh.ranks.ten && c.suit == kserh.suits.diamonds) {
        points += 1;
    } else if (this.rank == kserh.ranks.two && this.suit == kserh.suits.clubs) {
        points += 1;
    }
    return points;
};
kserh.card_ratio = 0.715909; 