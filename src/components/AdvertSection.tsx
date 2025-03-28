import { useOkApi } from '../hooks/useOkApi'

export default function AdvertSection({ isAdapterReady }: { isAdapterReady: boolean }) {
    const { showAd } = useOkApi()

    return (
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
    )
}