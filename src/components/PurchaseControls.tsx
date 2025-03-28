import React from 'react';
import {useOkApi} from "../hooks/useOkApi.ts";

interface PurchaseControlsProps {
    isReady: boolean;
}

const PurchaseControls: React.FC<PurchaseControlsProps> = ({ isReady }) => {
    const {getCatalog} = useOkApi();
    return (
        <section className="control-card">
            <h2 className="section-title">
                <span className="icon">💳</span> Purchase
            </h2>
            <div className="button-group">
                <button className="btn btn-primary" disabled={!isReady}>
                    getPurchase
                </button>
                <button className="btn btn-primary" disabled={!isReady}
                onClick={getCatalog}>
                    getCatalog
                </button>
                <button className="btn btn-primary" disabled={!isReady}>
                    consumePurchase
                </button>
                <button className="btn btn-primary" disabled={!isReady}>
                    buy
                </button>
            </div>
        </section>

    )
}


export default PurchaseControls;
