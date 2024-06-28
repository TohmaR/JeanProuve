import React, { useLayoutEffect } from "react";
import { Helmet } from 'react-helmet';
import LoadingPage from './components/Loader/Loader';
import Main from './components/Main/Main';
import Nav from './components/Nav/Nav';

import ImageUrl from "./assets/images/hero-banner.webp";

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
       <Helmet>
        <title>Jean Prouvé</title>
        <meta name="description" content="A glimpse into the life and creations of Jean Prouve, pioneers of the innovative production of furniture and architecture of the 20th century"/>
        <meta property="og:title" content="Jean Prouvé" />
        <meta property="og:description" content="A glimpse into the life and creations of Jean Prouve, pioneers of the innovative production of furniture and architecture of the 20th century" />
        <meta property="og:image" content={ImageUrl} /> {/* Utiliser l'image importée */}
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jean Prouvé" />
        <meta name="twitter:description" content="A glimpse into the life and creations of Jean Prouve, pioneers of the innovative production of furniture and architecture of the 20th century" />
        <meta name="twitter:image" content={ImageUrl} /> {/* Utiliser l'image importée */}
      </Helmet>
      <LoadingPage />
      <Main />
      <Nav />
    </div>
  );
}

export default App;
