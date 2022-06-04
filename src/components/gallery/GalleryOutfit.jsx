import React, { useState } from "react";
import './Gallery.scss'

const GalleryOutfit = (props) =>{
    try{
        const [currentOutfit, setCurrentOutfit] = useState(0);

        const charName = props.character.name;
        const numOutfits = props.character.outfits.length;

        function changeOutfit(){
            const nextOutfit = currentOutfit+1 === numOutfits? 0: currentOutfit+1;
            setCurrentOutfit(nextOutfit);
        }        

        let images = [];

        //TODO hide the outfits that aren't unlocked yet
        for(var i = 1; i <= numOutfits; i++)
        {
            const imageNumber = i.toString().padStart(2,'0');
            images.push(require(`../../images/Characters/${charName}/Outfits/${imageNumber}.png`));
        }

        return(
            <div>
                <img src={images[currentOutfit]} className="outfit" alt={charName} />
                <div className="changeOutfit" onClick={()=>changeOutfit()}>Change Outfit</div>
                <div> Current Outfit {currentOutfit+1} / {numOutfits}</div>
                <div> {props.character.outfits[currentOutfit]}</div>
            </div>
        );
    }
    catch(err){
        console.log(err)
        return(<h1>Something Went Wrong</h1>)
    }
}

export default GalleryOutfit;