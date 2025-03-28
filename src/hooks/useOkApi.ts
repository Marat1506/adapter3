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


    return {
        initAdapter,
        showAd,
        saveData,
        loadData,
        isReady
    }
}