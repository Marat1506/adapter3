import React from 'react';

interface SocialControlsProps {
    isReady: boolean;
}

const socialFeatures = [
    { title: 'Подписка на группу', id: 'groupSubscription' },
    { title: 'Подписка на уведомления', id: 'notifications' },
    { title: 'Поставить оценку', id: 'rateGame' },
    { title: 'Разместить пост', id: 'createPost' },
    { title: 'Разместить сторис', id: 'createStory' },
    { title: 'Пригласить друга', id: 'inviteFriend' },
    { title: 'Добавить в избранное', id: 'addToFavorites' },
    { title: 'Добавить на главный экран', id: 'addToHomeScreen' }
];

const SocialControls: React.FC<SocialControlsProps> = ({ isReady }) => (
    <section className="control-card">
        <h2 className="section-title">
            <span className="icon">👥</span> Social
        </h2>
        <div className="social-grid">
            {socialFeatures.map(({ title, id }) => (
                <div key={id} className="social-card">
                    <h3 className="section-title">{title}</h3>
                    <div className="button-group">
                        <button className="btn btn-secondary" disabled={!isReady}>
                            isAvailable
                        </button>
                        <button className="btn btn-secondary" disabled={!isReady}>
                            act
                        </button>
                        <button className="btn btn-secondary" disabled={!isReady}>
                            getStatus
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default SocialControls;
