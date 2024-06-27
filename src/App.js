import React, { useLayoutEffect } from "react";
import LoadingPage from './components/Loader/Loader';
import Main from './components/Main/Main';
import Nav from './components/Nav/Nav';

import './App.css';

function App() {
  useLayoutEffect(() => {
    // Fonction pour réinitialiser le scroll
    const resetScroll = () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    };

    // Ajouter un écouteur pour l'événement 'load'
    window.addEventListener('load', resetScroll);

    // Utiliser un délai pour s'assurer que le DOM est complètement rendu
    const timeoutId = setTimeout(() => {
      resetScroll();
    }, 100);

    // Nettoyage des écouteurs et du délai
    return () => {
      window.removeEventListener('load', resetScroll);
      clearTimeout(timeoutId);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return (
    <div className="App">
      <LoadingPage />
      <Main />
      <Nav />
    </div>
  );
}

export default App;
