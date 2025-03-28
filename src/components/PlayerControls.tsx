import React, { useState } from 'react';

interface PlayerControlsProps {
    saveData: () => void;
    loadData: () => void;
    isReady: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ saveData, loadData, isReady }) => {
    const [textData, setTextData] = useState('');

    return (
        <section className="control-card">
            <h2 className="section-title">
                <span className="icon">🎮</span> Player
            </h2>
            <div className="input-group">
        <textarea
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
            placeholder="Введите данные для saveData..."
            disabled={!isReady}
        />
                <div className="button-group">
                    <button onClick={saveData} className="btn btn-secondary" disabled={!isReady}>
                        saveData
                    </button>
                    <button onClick={loadData} className="btn btn-secondary" disabled={!isReady}>
                        getData
                    </button>
                    <button className="btn btn-secondary" disabled={!isReady}>
                        getId
                    </button>
                    <button className="btn btn-secondary" disabled={!isReady}>
                        getName
                    </button>
                    <button className="btn btn-secondary" disabled={!isReady}>
                        isAuth
                    </button>
                    <button className="btn btn-secondary" disabled={!isReady}>
                        getAvatar
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PlayerControls;
