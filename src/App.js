import React, { useEffect } from "react";
import LoadingPage from './components/Loader/Loader';
import Main from './components/Main/Main';
import Nav from './components/Nav/Nav';

import './App.css';

function App() {
  useEffect(() => {
    // Masquer le défilement
    document.documentElement.style.overflow = 'hidden';

    // Réinitialiser le défilement à DOMContentLoaded
    const handleDOMContentLoaded = () => {
      window.scrollTo(0, 0);
    };

    // Restaurer le défilement après le chargement complet
    const handleLoad = () => {
      document.documentElement.style.overflow = "auto";
    };

    // Pour les navigateurs qui supportent scrollRestoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Ajouter les écouteurs d'événements
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    window.addEventListener('load', handleLoad);

    // Nettoyage des écouteurs
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
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
