import MainMenu from "components/main-menu";
import React, { useState } from "react";
import './Blackjack.scss'
import BlackjackGame from "./blackjackGame";
import BlackjackMenuItem from "./blackjackGame/BlackjackMenuItem";
import BlackjackMenu from "./blackjackGame/Images/BlackjackMenu.png";

const Blackjack = (props) => {
    const [dealer, setDealer] = useState(null);
    const girls = ['Rosalyn', 'Lila'];

    if(dealer)
    {
        return(
            <BlackjackGame dealer={dealer}/>
        ) 
    }
    else
    {
        return(
            <div className="titlePage">
                <img className="blackjackTitleImage" src={BlackjackMenu} alt= "Name" /> 
                <div className="blackjackTitleText">Sourcaps Presents Strip Blackjack!</div>
                <div className="blackjackGreeting">
                    Welcome to  strip Blackjack.
                    We hope you have a fun time! 
                    Please Choose a Dealer below!</div>
                <div className="blackjackDealers">
                    {
                        girls.map((girl , i) => {
                            return <BlackjackMenuItem key={i} girl={girl} onClick={()=>setDealer(girl)}/>
                        })
                    }
                </div>
                <MainMenu />
            </div>
        )
    }

};

export default Blackjack;