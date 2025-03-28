import { useState } from 'react'
import { useOkApi } from '../hooks/useOkApi'

export default function PlayerSection({ isAdapterReady }: { isAdapterReady: boolean }) {
    const [textData, setTextData] = useState('')
    const { saveData, loadData, getPlayerInfo } = useOkApi()

    return (
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
                        onClick={() => saveData(textData)}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                        saveData
                    </button>
                    <button
                        onClick={async () => {
                            const data = await loadData()
                            if (data) setTextData(data)
                        }}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                        getData
                    </button>
                    <button
                        onClick={() => getPlayerInfo('id')}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                        getId
                    </button>
                    <button
                        onClick={() => getPlayerInfo('name')}
                        className="btn btn-secondary"
                        disabled={!isAdapterReady}
                    >
                        getName
                    </button>
                </div>
            </div>
        </section>
    )
}