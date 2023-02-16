import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCard, getHandValue, shuffle } from "./BlackjackGameUtils";
import Card from "./card";

const BlackjackGame = (props) =>
{
    const dealer = props.dealer;
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [cash, setCash] = useState(150);
    const [outfit, setOutfit] = useState(0);
    const [deck, setDeck] = useState(shuffle());
    const [ante, setAnte] = useState(10);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [showdown, setShowdown] = useState(true);
    const [playerState, setPlayerState] = useState("Empty");
    const [dealerState, setDealerState] = useState("Empty");
    const [multiplier, setMultiplier] = useState(2);
    const [changeButton, setChangeButton] = useState(false);
    const [dealing, setDealing] = useState(false);
    const [speech, setSpeech] = useState(``);    

    useEffect(() => {
            setTimeout(() => {
                setSpeech('');
            }, 4000);
      }, [speech])


    const dealerOutfits = [];

    for(var i = 0; i <= 4; i++)
    {
        const imageName = `${dealer}/${i.toString()}.png`;
        dealerOutfits.push(require(`./Images/Dealers/${imageName}`));
    }
    
    function shuffleDeck(){
        setSpeech('Shuffle Shuffle Shuffle');

        const newDeck = shuffle();
        setDeck(()=>[...newDeck]);
    }

    function changeOutfit(){
        if(!changeButton)
        {
            setChangeButton(true);
            if(outfit===4)
            {
                setSpeech("I've taken off everything I can sweetheart~")
            }
            else
            {

                const cost = (outfit + 1) * 100;
                const nextOutfit = outfit+1 <= 4? outfit+1 : 4;
                const nextAnte = (outfit + 2) *10 
                
                if(cash-cost >= nextAnte)
                {
                    setSpeech('Tee hee! So naughty');
                    setOutfit(nextOutfit);
                    setCash(cash-cost);
                    setAnte(nextAnte)
                }
                else
                {
                    setSpeech("Sorry can't afford me!");
                }
            }
            setChangeButton(false);
        }
    }        

    function reset(){
        setCash(150);   
        setMultiplier(2);
        setOutfit(0);
        setDeck([...shuffle()]);
        setAnte(10);
        setPlayerHand([]);
        setDealerHand([]);
        setShowdown(true);
        setPlayerState("Empty");
        setDealerState("Empty");
        setDealing(false);
        setChangeButton(false);
    }

    function dealCard()
    {
        const card = getCard(deck);

        return(
            {
                drawnCard: card.drawnCard, 
                updatedDeck: card.updatedDeck
            });
    }

    async function compareHands(houseHand, yourHand){
        setShowdown(true);
        await delay(1500);
        const playerValue = getHandValue(yourHand, false);
        const dealerValue = getHandValue(houseHand, true);
        let newPlayerState = playerValue;
        let newDealerState = dealerValue
        
        const dealerBlackjack = houseHand.length === 2 && dealerValue === 21;
        const playerBlackjack = yourHand.length === 2 && playerValue === 21;

        if(playerValue > dealerValue || (playerBlackjack && !dealerBlackjack))
        {
            setSpeech("I'm so proud of you!");
            const winnings = playerBlackjack? ante * 2 : ante;
            newPlayerState = playerBlackjack? "Blackjack!" : "Winner!"; 
            setCash(cash + (winnings * multiplier));
        }
        else if((playerValue === dealerValue && (!dealerBlackjack)) || (playerBlackjack && dealerBlackjack))
        {
            setSpeech("Oh looks like we tied. Let's try again!");
            const returnMuliplier = Math.ceil(multiplier/2);
            setCash(cash + (ante * returnMuliplier));
        }
        else{
            newPlayerState = "You Lose!"; 
            if(dealerBlackjack)
            {
                setSpeech('Oh my goodness I did it!');
                newDealerState = "Blackjack!";
            }
        }
        setPlayerState(newPlayerState);
        setDealerState(newDealerState);
    }

    function hit(){
        if(!showdown && playerState !== 'Bust!')
        {
            setSpeech("Here's a card!");
            const newCard = dealCard([...deck]);
            let hand = [...playerHand, newCard.drawnCard];

            const playerValue = getHandValue(hand,false)

            if(playerValue < 22 )
            {       
                setPlayerState(`${playerValue}`);
            }
            else
            {
                setSpeech("I'm so sorry sweetie!");
                setShowdown(true);
                setPlayerState('Bust!');
            }
            setPlayerHand([...hand]);
            setDeck([...newCard.updatedDeck]);
        }
    }

    async function doubleDown() 
    {
        if((cash-ante) >= 0)
        {
            setSpeech('Feeling brave are we?');
            await delay(3000);
            setCash(cash-ante);
            setMultiplier(4);
            const newCard = dealCard([...deck]);
            let hand = [...playerHand, newCard.drawnCard];
            const playerValue = getHandValue(hand, false);

            if(playerValue < 22 )
            {       
                setPlayerState(`${playerValue}`);
            }
            else
            {
                setSpeech('Better luck next time!');
                setPlayerState('Bust!');
            }

            setPlayerHand([...hand]);
            setDeck([...newCard.updatedDeck]);

            await delay(2000);
            faceoff(hand);
        }
        else
        {

            setSpeech('Not enough cash babe!');
        }
    }

    async function faceoff(yourHand=null){
        if(playerState!=='Bust!')
        {            
            setShowdown(true);
            let hand = [...dealerHand];
            let handValue = getHandValue(hand,true);
    
            while(handValue < 17)
            {
                const newCard = dealCard([...deck]);
                hand=[...hand, newCard.drawnCard];
                setDeck([...newCard.updatedDeck]);
                handValue = getHandValue(hand,true);
            }
            setDealerHand([...hand]);

            if(getHandValue(hand, true) < 22 )
            {       
                setDealerState(`${getHandValue(hand, true)}`);
                compareHands(hand, yourHand??playerHand);
            }
            else
            {

                setSpeech('Heh, looks like I busted. Oh well!');
                await delay(2000);
                setDealerState('Bust!');
                setCash(cash + (ante * multiplier));
                setPlayerState('Winner!');
            }
        }
    }

    async function deal(dealingDeck)
    {
        let cards = [...dealingDeck];
        
        let card = dealCard(cards);
        const newPlayerHand = [card.drawnCard];
        cards = [...card.updatedDeck];
        
        card = dealCard(cards);
        const newDealerHand = [card.drawnCard];
        cards = [...card.updatedDeck];
        
        card = dealCard(cards);
        newPlayerHand.push(card.drawnCard);
        cards = [...card.updatedDeck];
        
        card = dealCard(cards);
        newDealerHand.push(card.drawnCard);
        cards = [...card.updatedDeck];
        
        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        
        const dealerValue = getHandValue([newDealerHand[0]], true)
        const playerValue = getHandValue(newPlayerHand, false);
        
        if(dealerValue > 9 || playerValue === 21)
        {
            if(getHandValue(newDealerHand, true) === 21 || playerValue === 21)
            {
                setSpeech('Well this is going to be fun!');
                await delay(2000);
                setShowdown(true);
                compareHands(newDealerHand, newPlayerHand);
            }
        }
        
        setPlayerState(`${playerValue}`);
        setDealerState(`${dealerValue}`);
        
        setDeck([...cards]);      
    }
    
    async function newHand()
    {
        if(!dealing)
        {
            setSpeech('Cards for my cutie!');
            await delay(1000);
            setDealing(true);
            setShowdown(false);
            setMultiplier(2);
            setCash(cash - ante);
            deal(deck);
            setDealing(false);
        }
    }
    useEffect(() => {
        setSpeech(`Hello I'm ${dealer}! Let's Play!`);
      }, [dealer]);

    if(cash < 0 )
    {
        return(
            <div className="gameOver">
                <img src={require(`./Images/Dealers/${dealer}/GameOver.png`)} className='gameOverImage' alt='deck' />
                <div className="gameOverOverlay">
                    <div className="gameOverText">Oh no! Are you okay? <br/> It looks like it's Game Over!</div>
                    <div className="gameOverButtons">
                        <button className="blackjackButton" onClick={()=>reset()}>Reset!</button>
                        <Link className="blackjackButton" to={"/"}>Main Menu!</Link>               
                    </div>
                </div>
            </div>    
        )
    }
    return (
        <div className="blackjackPage">
            <div className="dealerPanel">
                <img src={dealerOutfits[outfit]} className="dealerPic" alt={dealer} />
                <div className="speechBubble" hidden={speech===''}>
                    <div className="speechText">{speech}</div>
                </div>
            </div>
            <div className="blackjackPanel">
                <h1>Strip Blackjack!</h1>
                <div className="dealerInfo">
                    Dealer:
                    <br />
                    {dealer}
                    <br />
                    Ante: ${ante.toLocaleString()}
                    <div className="deckPanel">
                        <img src={require(`./Images/Dealers/${dealer}/Deck.png`)} className='card deck' alt='deck' />
                    </div>
                    <div className="deckPanel">
                        {
                            outfit < 4 && 
                            <button disabled={speech!==''} className="blackjackButton" onClick={()=>changeOutfit()}>Strip!</button>    
                        }
                        {
                            outfit >= 4 && 
                            <button disabled={speech!==''} className="blackjackButton" onClick={()=>reset()}>Reset!</button>    
                        }
                        <div>Cost: ${((outfit + 1) * 100).toLocaleString()}</div>

                    </div>
                </div>  
                <div className="dealerArea">
                    {
                        dealerHand.length === 0 &&
                            <img src={require(`./Images/Dealers/${dealer}/Deck.png`)} className='card' alt='dealerCard1' />
                    }
                    {
                        (dealerHand.length === 0) &&
                            <img src={require(`./Images/Dealers/${dealer}/Deck.png`)} className='card' alt='cardBack' />
                    }
                    {   
                        dealerHand.map((card, i) => {
                            return <Card key={i} cardNumber={i} cardName={card} showdown={showdown} dealer={dealer} />
                        })
                    }               
                </div>
                <div className="playerValue">Dealer Hand: {dealerState}</div>
                <div className="playerArea">
                {
                    playerHand.length === 0 &&
                            <img src={require(`./Images/Dealers/${dealer}/Deck.png`)} className='card' alt='cardBack' />
                    }
                    {
                        playerHand.length === 0 &&
                            <img src={require(`./Images/Dealers/${dealer}/Deck.png`)} className='card' alt='cardBack' />
                    }
                    {
                        playerHand.map((card, i) => {
                            return <Card key={i} cardName={card} />
                        })
                    }
                </div>
                <div className="playerValue">Current Hand: {playerState}</div>
                <div className="playerOptions">
                    {
                        (showdown && deck.length < 10) &&
                        <button className="blackjackButton" disabled={speech!==''} onClick={()=>shuffleDeck()}>Shuffle!</button> 
                    }
                    {
                        (playerHand.length === 0 || (showdown && deck.length > 9) ) &&
                        <button className="blackjackButton" disabled={speech!==''} onClick={()=>newHand()}>Deal!</button>
                    }
                    {
                        (playerHand.length > 0 && !showdown) &&
                        <button className="blackjackButton" disabled={speech!==''} onClick={()=>hit()}>Hit!</button>
                    }
                    {
                        (playerHand.length > 0 && !showdown) &&
                        <button className="blackjackButton" disabled={speech!==''} onClick={()=>faceoff()}>Stay!</button>
                    }
                    {
                        (playerHand.length === 2 && (playerState >= 9 && playerState <= 11) && !showdown) &&
                        <button className="blackjackButton" disabled={speech!==''} onClick={()=>doubleDown()}>Double!</button>
                    }
                    {
                        //Split not currently working change the 2 on the split to a 0 to enable
                        (playerHand.length === 2 && (playerHand[0].split('_')[2] === playerHand[1].split('_')[0]) && !showdown) &&
                        <button className="blackjackButton" onClick={()=>newHand()}>Split!</button>
                    }
                    
                </div>
                <div className="cashDispay">
                    Current Cash: ${cash.toLocaleString()}
                </div>
            </div>
        </div>
    )
}

export default BlackjackGame;