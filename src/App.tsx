import { useEffect, useState } from 'react'
import './App.css'
// import OkAdapter from './adapter/OkAdapter'
import {useOkApi} from "./hooks/useOkApi.ts";



function App() {

  const [textData, setTextData] = useState('')
  // const adapterRef = useRef<OkAdapter | null>(null)
  const {initAdapter, saveData, loadData, showAd, isReady} = useOkApi()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://api.ok.ru/js/fapi5.js'
    script.defer = true
    document.head.appendChild(script)



    initAdapter()

    return () => {
      document.head.removeChild(script)
    }
  }, [])






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
            {/* Блок рекламы */}
            <section className="control-card">
              <h2 className="section-title">
                <span className="icon">📢</span>
                ADV
              </h2>
              <div className="button-group">
                <button
                    onClick={() => showAd('interstitial')}
                    className="btn btn-primary"
                    disabled={!isReady}
                >
                  show Interstitial
                </button>
                <button
                    onClick={() => showAd('reward')}
                    className="btn btn-secondary"
                    disabled={!isReady}
                >
                  show Reward
                </button>
              </div>
            </section>

            {/* Блок игрока */}
            <section className="control-card">
              <h2 className="section-title">
                <span className="icon">🎮</span>
                Player
              </h2>
              <div className="input-group">
              <textarea
                  value={textData}
                  onChange={(e) => setTextData(e.target.value)}
                  placeholder="Введите данные для saveData..."
                  disabled={!isReady}
              />
                <div className="button-group">
                  <button
                      onClick={saveData}
                      className="btn btn-secondary"
                      disabled={!isReady}
                  >
                    saveData
                  </button>
                  <button
                      onClick={loadData}
                      className="btn btn-secondary"
                      disabled={!isReady}
                  >
                    getData
                  </button>
                  <button
                      // onClick={() => getPlayerInfo('id')}
                      className="btn btn-secondary"
                      disabled={!isReady}
                  >
                    getId
                  </button>
                  <button
                      className="btn btn-secondary"
                      disabled={!isReady}
                  >
                    getName
                  </button>
                  <button

                      className="btn btn-secondary"
                      disabled={!isReady}
                  >
                    isAuth
                  </button>
                  <button
                      className="btn btn-secondary"
                      disabled={!isReady}
                  >
                    getAvatar
                  </button>
                </div>
              </div>
            </section>

            {/* Блок платежей */}
            <section className="control-card">
              <h2 className="section-title">
                <span className="icon">💳</span>
                Purchase
              </h2>
              <div className="button-group">
                <button
                    className="btn btn-primary"
                    disabled={!isReady}
                >
                  getPurchase
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!isReady}
                >
                  getCatalog
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!isReady}
                >
                  consumePurchase
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!isReady}
                >
                  buy
                </button>
              </div>
            </section>

            {/* Блок социальных функций */}
            <section className="control-card">
              <h2 className="section-title">
                <span className="icon">👥</span>
                Social
              </h2>
              <div className="social-grid">
                {/* Подписка на группу */}
                <div className="social-card">
                  <h3 className="section-title">Подписка на группу</h3>
                  <div className="button-group">
                    <button
                        className="btn btn-secondary"
                        disabled={!isReady}
                    >
                      isAvailable
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={!isReady}
                    >
                      act
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={!isReady}
                    >
                      getStatus
                    </button>
                  </div>

                </div>

                <div className="social-card">
                  <h3 className="section-title">Подписка на уведомления</h3>
                  <div className="button-group">
                    <button id="notifications-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="notifications-act" className="btn btn-secondary">act</button>
                    <button id="notifications-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>

                <div className="social-card">
                  <h3 className="section-title">Поставить оценку</h3>
                  <div className="button-group">
                    <button id="rateGame-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="rateGame-act" className="btn btn-secondary">act</button>
                    <button id="rateGame-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>

                <div className="social-card">
                  <h3 className="section-title">Разместить пост</h3>
                  <div className="button-group">
                    <button id="createPost-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="createPost-act" className="btn btn-secondary">act</button>
                    <button id="createPost-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>

                <div className="social-card">
                  <h3 className="section-title">Разместить сторис</h3>
                  <div className="button-group">
                    <button id="createStory-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="createStory-act" className="btn btn-secondary">act</button>
                    <button id="createStory-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>

                <div className="social-card">
                  <h3 className="section-title">Пригласить друга</h3>
                  <div className="button-group">
                    <button id="inviteFriend-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="inviteFriend-act" className="btn btn-secondary">act</button>
                    <button id="inviteFriend-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>

                <div className="social-card">
                  <h3 className="section-title">Добавить в избранное</h3>
                  <div className="button-group">
                    <button id="addToFavorites-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="addToFavorites-act" className="btn btn-secondary">act</button>
                    <button id="addToFavorites-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>

                <div className="social-card">
                  <h3 className="section-title">Добавить на главный экран</h3>
                  <div className="button-group">
                    <button id="addToHomeScreen-isAvailable" className="btn btn-secondary">isAvailable</button>
                    <button id="addToHomeScreen-act" className="btn btn-secondary">act</button>
                    <button id="addToHomeScreen-getStatus" className="btn btn-secondary">getStatus</button>
                  </div>
                </div>
                {/* Остальные социальные карточки аналогично */}
                {/* ... */}
              </div>
            </section>
          </main>
        </div>
      </div>
  )
}

export default App