export function shuffle() {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    const cards = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
    const deck = [];

    suits.forEach(suit => {
        cards.forEach(card => {
            deck.push(`${card}_of_${suit}`)
        });
    });

    return deck;
}

export function getCard(deck) {
    const updatedDeck = deck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);

    const drawnCard = updatedDeck[randomIndex];

    updatedDeck.splice(randomIndex,1);

    return {drawnCard, updatedDeck};
}

export function getHandValue(hand, dealer){
    let value = 0;
    let aceCount = 0;

    hand.forEach(card => {
        const cardPrefix = card.split('_')[0]; 
        switch(cardPrefix){
            case 'ace':
                aceCount += 1;
                value +=1;
                break;
            case 'jack':
            case 'queen':
            case 'king':
                value += 10
                break;
            default:
                value += parseInt(card);
                break;
        };
    });


    while(aceCount > 0)
    {
        if(dealer === true)
        {
            const compareValue = value + 10;
            if(compareValue < 16 || (compareValue>=17 && compareValue <=21))
            {
                value += 10;
            }
        }
        else if((value + 10) <= 21)
        {
            value += 10;
        }
        aceCount --;
    }

    return value;
}