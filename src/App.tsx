import { useEffect, useRef, useState } from 'react'
import './App.css'
import OkAdapter from './adapter/OkAdapter'

type AdType = "interstitial" | "reward";

function App() {
  const [isAdapterReady, setIsAdapterReady] = useState(false)
  const [textData, setTextData] = useState('')
  const adapterRef = useRef<OkAdapter | null>(null)
  const lastAdTimeRef = useRef(0)

  // Инициализация адаптера
  useEffect(() => {
    // Загрузка OK API скрипта
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

  // const getPlayerInfo = async (type: string) => {
  //   if (!isAdapterReady || !adapterRef.current) {
  //     console.warn('Адаптер не готов')
  //     return
  //   }
  //
  //   try {
  //     switch (type) {
  //       case 'id':
  //         console.log('ID:', adapterRef.current.getId())
  //         break
  //       case 'name':
  //         console.log('Name:', await adapterRef.current.getName())
  //         break
  //       case 'auth':
  //         console.log('Auth:', await adapterRef.current.isAuth())
  //         break
  //       case 'avatar':
  //         console.log('Avatar:', await adapterRef.current.getAvatar())
  //         break
  //     }
  //   } catch (error) {
  //     console.error(`Ошибка получения ${type}:`, error)
  //   }
  // }

  const handleSocialAction = async (action: string, method: string) => {
    if (!isAdapterReady || !adapterRef.current) {
      console.warn('Адаптер не готов')
      return
    }

    try {
      console.log(`Выполняем ${method} для ${action}`)
      // Здесь должна быть реализация конкретных социальных действий
    } catch (error) {
      console.error(`Ошибка выполнения ${method} для ${action}:`, error)
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
                        onClick={() => handleSocialAction('groupSubscribe', 'isAvailable')}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                      isAvailable
                    </button>
                    <button
                        onClick={() => handleSocialAction('groupSubscribe', 'act')}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                      act
                    </button>
                    <button
                        onClick={() => handleSocialAction('groupSubscribe', 'getStatus')}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                      getStatus
                    </button>
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