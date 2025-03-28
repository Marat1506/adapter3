// @ts-ignore
// @ts-nocheck
import {useRef, useState} from 'react'
import OkAdapter from '../adapter/OkAdapter'

type AdType = "interstitial" | "reward";
export function useOkApi() {
    const [textData, setTextData] = useState('');
    const [adapter, setAdapter] = useState<OkAdapter | null>(null)
    const [isReady, setIsReady] = useState(false)
    const lastAdTimeRef = useRef(0)
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
        if (!isReady || !adapter) {
            console.warn(`[warning] Адаптер не готов: Показ ${adType} рекламы`)
            return
        }

        try {
            if (adType === 'reward') {
                const watched = await adapter.showRewardedAds()
                lastAdTimeRef.current = Date.now()
                console.log("watched = ", watched)
                console.log(watched ? '[success] Награда получена!' : '[warning] Реклама закрыта до завершения')
            } else {
                const full = await adapter.showFullscreenAds()
                console.log("showFullscreenAds = ", full)
                lastAdTimeRef.current = Date.now()
                console.log(`[success] Реклама ${adType} показана`)
            }
        } catch (error) {
            console.error(`[error] Ошибка ${adType}:`, error)
        }
    }

    const getCatalog =  () => {
        if (!isReady || !adapter) {
            console.warn(`[warning] Адаптер не готов: Показ ${adType} рекламы`)
            return
        }

        try {
            const result = adapter.getCatalog()
            console.log("catalog = ", result)

        }catch (error) {
            console.log("Ошибка при получении каталога")
        }
    }

    const saveData = async () => {
        if (!isReady || !adapter) {
            console.warn("save (mock)")
            return
        }

        try {
            const result = await adapter.save(textData)
            console.log("save result = ", result)
            console.log("[success] Данные сохранены")
        } catch (error) {
            console.error("[error] Ошибка сохранения:", error)
        }
    }

    const loadData = async () => {
        if (!isReady || !adapter) {
            console.warn("load (mock)")
            return null
        }

        try {
            const data = await adapter.load()
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
        isReady,
        adapter,
        textData,
        setTextData,
        getCatalog
    }
}