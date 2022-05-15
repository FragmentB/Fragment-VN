import React from "react";
import './Gallery.scss'
import MainMenu from "components/main-menu/MainMenu";
import { characterList } from '../../data/characterList'


const Gallery = (props) => (
    <div className="galleryPage">
        <div className="galleryList">
            <h1>Gallery</h1>
            <div className="gallerySpace">
                {
                    characterList.characters.map((character)=> {
                        try{
                             //TODO: Hide character names for locked people
                            const thumb = require(`../../images/Characters/${character}/Portrait.png`);
                            const activeThumb = require(`../../images/Characters/${character}/PortraitActive.png`);
                            const namePlate = require(`../../images/Characters/${character}/NamePlate.png`);
                            return(
                            <div className="galleryItem" key={character}>
                                <img className="thumbnail" src={thumb} alt={character}
                                onMouseOver={e => e.currentTarget.src = activeThumb}
                                onMouseOut={e => e.currentTarget.src = thumb}/>
                                <img src={namePlate} className="namePlate" alt={character} />
                            </div>
                            )
                        }
                        catch(err)
                        {

                            return(<div className="underConstruction" key={character}>
                            <p>Coming</p>
                            <p>Soon {character}</p>
                            </div>
                            )
                        }
                    })
                }
            </div>
        </div>
        <MainMenu />
    </div>
);

export default Gallery;