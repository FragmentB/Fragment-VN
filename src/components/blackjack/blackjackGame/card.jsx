const Card = (props) => {
    if(!props.showdown && props.cardNumber)
    {
        return (
            <img src={require(`./Images/Dealers/${props.dealer}/Deck.png`)} className='card' alt='cardBack' />
        )
    }
    return (
        <img src={require(`./Images/Cards/${props.cardName}.png`)} className='card' alt={props.cardName} />
    )
};

export default Card;
