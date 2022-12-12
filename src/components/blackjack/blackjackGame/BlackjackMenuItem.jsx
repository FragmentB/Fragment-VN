const BlackjackMenuItem =(props)=>{

    return(
    <div className='dealerButton' onClick={()=>props.onClick()}>
        <img src={require(`./Images/Dealers/${props.girl}/Deck.png`)} className='card' alt={`${props.girl} wants to Deal`} />
        <div className="dealerGreeting">{props.girl}</div>
    </div>
    
    );
};

export default BlackjackMenuItem;