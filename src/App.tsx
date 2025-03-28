import { useEffect } from 'react';
import { useOkApi } from './hooks/useOkApi.ts';
import AdControls from './components/AddControls';
import PlayerControls from './components/PlayerControls';
import PurchaseControls from './components/PurchaseControls';
import SocialControls from './components/SocialControls';
import './App.css';

function App() {
  const { initAdapter, saveData, loadData, showAd, isReady } = useOkApi();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.ok.ru/js/fapi5.js';
    script.defer = true;
    document.head.appendChild(script);

    initAdapter();

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
      <div className="scroll-container">
        <div className="app-container">
          <header className="app-header">
            <h1>Документация</h1>
            <div className="status-indicator">
              {isReady ? 'OK API Ready' : 'OK API Loading...'}
            </div>
          </header>

          <main className="dashboard">
            <AdControls showAd={showAd} isReady={isReady} />
            <PlayerControls saveData={saveData} loadData={loadData} isReady={isReady} />
            <PurchaseControls isReady={isReady} />
            <SocialControls isReady={isReady} />
          </main>
        </div>
      </div>
  );
}

export default App;
