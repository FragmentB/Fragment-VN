import React from "react";
import './GameScreen.scss'
import MainMenu from "components/main-menu/MainMenu";

const GameScreen = (props) => {
    return (
    <div className="gamePage">
        <div className="gameScreen">
            <h1>This will be the game yo</h1>
        </div>
        <MainMenu />
    </div>
)};

export default GameScreen;