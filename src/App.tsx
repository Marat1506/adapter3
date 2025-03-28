import { useEffect, useRef, useState } from 'react'
import './App.css'
import OkAdapter from './adapter/OkAdapter'

type AdType = "interstitial" | "reward";

function App() {
  const [isAdapterReady, setIsAdapterReady] = useState(false)
  const [textData, setTextData] = useState('')
  const adapterRef = useRef<OkAdapter | null>(null)
  const lastAdTimeRef = useRef(0)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//api.ok.ru/js/fapi5.js'
    script.defer = true
    document.head.appendChild(script)

    const initAdapter = async () => {
      const adapter = new OkAdapter()
      try {
        await adapter.init()
        adapterRef.current = adapter
        setIsAdapterReady(true)
        console.log('[success] Адаптер успешно инициализирован')
      } catch (error) {
        console.error('[error] Ошибка инициализации адаптера:', error)
      }
    }

    initAdapter()

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const showAd = async (adType: AdType) => {
    if (!isAdapterReady || !adapterRef.current) {
      console.warn(`[warning] Адаптер не готов: Показ ${adType} рекламы`)
      return
    }

    try {
      if (adType === 'reward') {
        const watched = await adapterRef.current.showRewardedAds()
        lastAdTimeRef.current = Date.now()
        console.log("watched = ", watched)
        console.log(watched ? '[success] Награда получена!' : '[warning] Реклама закрыта до завершения')
      } else {
        const full = await adapterRef.current.showFullscreenAds()
        console.log("showFullscreenAds = ", full)
        lastAdTimeRef.current = Date.now()
        console.log(`[success] Реклама ${adType} показана`)
      }
    } catch (error) {
      console.error(`[error] Ошибка ${adType}:`, error)
    }
  }

  const saveData = async () => {
    if (!isAdapterReady || !adapterRef.current) {
      console.warn("save (mock)")
      return
    }

    try {
      const result = await adapterRef.current.save(textData)
      console.log("save result = ", result)
      console.log("[success] Данные сохранены")
    } catch (error) {
      console.error("[error] Ошибка сохранения:", error)
    }
  }

  const loadData = async () => {
    if (!isAdapterReady || !adapterRef.current) {
      console.warn("load (mock)")
      return null
    }

    try {
      const data = await adapterRef.current.load()
      console.log("[success] Данные загружены", data)
      setTextData(data || '')
      return data
    } catch (error) {
      console.error("[error] Ошибка загрузки:", error)
      return null
    }
  }




  return (
      <div className="scroll-container">
        <div className="app-container">
          <header className="app-header">
            <h1>Документация</h1>
            <div className="status-indicator">
              {isAdapterReady ? 'OK API Ready' : 'OK API Loading...'}
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
                    disabled={!isAdapterReady}
                >
                  show Interstitial
                </button>
                <button
                    onClick={() => showAd('reward')}
                    className="btn btn-secondary"
                    disabled={!isAdapterReady}
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
                  disabled={!isAdapterReady}
              />
                <div className="button-group">
                  <button
                      onClick={saveData}
                      className="btn btn-secondary"
                      disabled={!isAdapterReady}
                  >
                    saveData
                  </button>
                  <button
                      onClick={loadData}
                      className="btn btn-secondary"
                      disabled={!isAdapterReady}
                  >
                    getData
                  </button>
                  <button
                      // onClick={() => getPlayerInfo('id')}
                      className="btn btn-secondary"
                      disabled={!isAdapterReady}
                  >
                    getId
                  </button>
                  <button
                      className="btn btn-secondary"
                      disabled={!isAdapterReady}
                  >
                    getName
                  </button>
                  <button

                      className="btn btn-secondary"
                      disabled={!isAdapterReady}
                  >
                    isAuth
                  </button>
                  <button
                      className="btn btn-secondary"
                      disabled={!isAdapterReady}
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
                    disabled={!isAdapterReady}
                >
                  getPurchase
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!isAdapterReady}
                >
                  getCatalog
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!isAdapterReady}
                >
                  consumePurchase
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!isAdapterReady}
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
                        disabled={!isAdapterReady}
                    >
                      isAvailable
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                      act
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
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