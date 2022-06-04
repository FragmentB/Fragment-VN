import React, { useState } from "react";
import './Gallery.scss'
import MainMenu from "components/main-menu/MainMenu";
import { characterList } from '../../data/characterList'
import GalleryOutfit from "./GalleryOutfit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftRotate } from "@fortawesome/free-solid-svg-icons";

const Gallery = (props) => { 

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    if(selectedCharacter)
    {
        return(
            <div className="galleryPage">
                <div className="characterGallery">
                    <div className="characterSidebar">
                        <div className="characterSidebarHeader">
                            Back<FontAwesomeIcon icon={faArrowLeftRotate} onClick={()=> setSelectedCharacter(null)} />
                            <h1>{selectedCharacter.name}</h1>
                        </div>
                        <GalleryOutfit character={selectedCharacter} />
                    </div>
                    <div className="characterPanel">
                    </div>               
                </div>    
            </div>
        )
    }
    return (       
        <div className="galleryPage">
            <div className="galleryList">
                <h1>Gallery</h1>
                <div className="gallerySpace">
                    {
                        characterList.characters.map((character)=> {
                            try{
                                    //TODO: Hide character names for locked people
                                const thumb = require(`../../images/Characters/${character.name}/Portrait.png`);
                                const activeThumb = require(`../../images/Characters/${character.name}/PortraitActive.png`);
                                const namePlate = require(`../../images/Characters/${character.name}/NamePlate.png`);
                                return(
                                <div className="galleryItem" key={character.name} onClick={()=> setSelectedCharacter(character)}>
                                    <img className="thumbnail" src={thumb} alt={character.name}
                                    onMouseOver={e => e.currentTarget.src = activeThumb}
                                    onMouseOut={e => e.currentTarget.src = thumb}/>
                                    <img src={namePlate} className="namePlate" alt={character.name} />
                                </div>
                                )
                            }
                            catch(err)
                            {
    
                                return(<div className="underConstruction" key={character.name}>
                                <p>Coming</p>
                                <p>Soon {character.name}</p>
                                </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <MainMenu />
        </div>
    )
};

export default Gallery;