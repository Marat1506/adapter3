// @ts-ignore
// @ts-nocheck
import { useState } from 'react'
import OkAdapter from '../adapter/OkAdapter'

export function useOkApi() {
    const [adapter, setAdapter] = useState<OkAdapter | null>(null)
    const [isReady, setIsReady] = useState(false)

    const initAdapter = async () => {
        const newAdapter = new OkAdapter()
        try {
            await newAdapter.init()
            setAdapter(newAdapter)
            setIsReady(true)
            console.log('Адаптер успешно инициализирован')
        } catch (error) {
            console.error('Ошибка инициализации адаптера:', error)
        }
    }

    const showAd = async (adType: 'interstitial' | 'reward') => {
        if (!adapter) return

        try {
            if (adType === 'reward') {
                const watched = await adapter.showRewardedAds()
                console.log(watched ? 'Награда получена!' : 'Реклама закрыта до завершения')
            } else {
                await adapter.showFullscreenAds()
                console.log('Реклама показана')
            }
        } catch (error) {
            console.error(`Ошибка показа рекламы ${adType}:`, error)
        }
    }

    const saveData = async (data: string) => {
        if (!adapter) return
        try {
            await adapter.save(data)
            console.log('Данные сохранены')
        } catch (error) {
            console.error('Ошибка сохранения:', error)
        }
    }

    const loadData = async () => {
        if (!adapter) return null
        try {
            const data = await adapter.load()
            console.log('Данные загружены', data)
            return data
        } catch (error) {
            console.error('Ошибка загрузки:', error)
            return null
        }
    }



    return {
        initAdapter,
        showAd,
        saveData,
        loadData,
        isReady
    }
}