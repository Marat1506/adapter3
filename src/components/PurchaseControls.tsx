import React from 'react';

interface PurchaseControlsProps {
    isReady: boolean;
}

const PurchaseControls: React.FC<PurchaseControlsProps> = ({ isReady }) => (
    <section className="control-card">
        <h2 className="section-title">
            <span className="icon">💳</span> Purchase
        </h2>
        <div className="button-group">
            <button className="btn btn-primary" disabled={!isReady}>
                getPurchase
            </button>
            <button className="btn btn-primary" disabled={!isReady}>
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
);

export default PurchaseControls;
