import React, { useEffect } from "react";
import LoadingPage from './components/Loader/Loader';
import Main from './components/Main/Main';
import Nav from './components/Nav/Nav';

import './App.css';

function App() {
  useEffect(() => {
    // Réinitialiser le défilement à 0
    window.scrollTo(0, 0);

    // Pour les navigateurs qui supportent scrollRestoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Restaurer le défilement après le chargement complet
    const handleLoad = () => {
      document.documentElement.style.overflow = "auto";
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('load', handleLoad);

    // Nettoyage des écouteurs
    return () => {
      window.removeEventListener('load', handleLoad);
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
