import React from 'react';
type AdType = "interstitial" | "reward";
interface AdControlsProps {
    showAd: (type: AdType) => void;
    isReady: boolean;
}

const AdControls: React.FC<AdControlsProps> = ({ showAd, isReady }) => (
    <section className="control-card">
        <h2 className="section-title">
            <span className="icon">📢</span> ADV
        </h2>
        <div className="button-group">
            <button onClick={() => showAd('interstitial')} className="btn btn-primary" disabled={!isReady}>
                show Interstitial
            </button>
            <button onClick={() => showAd('reward')} className="btn btn-secondary" disabled={!isReady}>
                show Reward
            </button>
        </div>
    </section>
);

export default AdControls;
