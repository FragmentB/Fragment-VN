import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TitleScreen from 'components/title-screen/TitleScreen';
import OptionScreen from 'components/option-screen/OptionScreen';
import Gallery from 'components/gallery/Gallery';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import GameScreen from 'components/game-screen/GameScreen';
import SaveScreen from 'components/save-screen/SavingScreen';
import Blackjack from 'components/blackjack';

function App() {
  return (
      <Routes>
        <Route path='/' element={<TitleScreen />} />
        <Route path='option' element={<OptionScreen />} />
        <Route path='game' element={<GameScreen />} />
        <Route path='gallery' element={<Gallery />} />
        <Route path='save' element={<SaveScreen />} />
        <Route path='load' element={<LoadingScreen/>} />
        <Route path='blackjack' element={<Blackjack/>} />
        <Route path='*' element={<TitleScreen />} />
      </Routes>
  );
}

export default App;
