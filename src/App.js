import React, { useLayoutEffect } from "react";
import LoadingPage from './components/Loader/Loader';
import Main from './components/Main/Main';
import Nav from './components/Nav/Nav';

import './App.css';

function App() {
  useLayoutEffect(() => {
    // Si la propriété scrollRestoration est disponible
      document.body.style.overflow = 'hidden';
        // Désactiver la restauration du scroll
        window.history.scrollRestoration = 'manual';

        // S'assurer que la page est bien en haut
        window.scrollTo(0, 0);
  
        // Pour les navigateurs qui ne supportent pas scrollRestoration
        window.addEventListener('load', () => {
            window.scrollTo(0, 0);
        });
   
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
