import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { api } from '../../configs/global/axios'

interface IAdProps {
  author: {
    created_at: string
    id: string
    name: string
    username: string
  }
  created_at: string
  is_active: boolean
  user_id: string
  game_name: string
  description: string
  id: string
  game_image: string
}

interface ICreateAdsProps {
  gameName: string
  description: string
  gameImage: string
}

interface IUseAdsProps {
  ads: IAdProps[] | null
  adsToUser: IAdProps[] | null
  isOpenModal: boolean
  isError: boolean
  close(): void
  open(): void
  getAllAds(): Promise<void>
  refetch(seconds?: number): Promise<void>
  getAllByUser(): Promise<void>
  create(ad: ICreateAdsProps): Promise<void>
}

export const useAds = create<IUseAdsProps>()(
  devtools(
    persist(
      (set) => ({
        ads: null,
        isError: false,
        adsToUser: null,
        isOpenModal: false,
        async getAllAds() {
          try {
            const { data } = await api.get('/ads')

            set((state) => ({ ...state, ads: data }))
          } catch (err) {
            set((state) => ({ ...state, isError: true }))
          }
        },
        async refetch(seconds) {
          try {
            if (!seconds) {
              const { data } = await api.get('/ads')
              set((state) => ({ ...state, ads: data }))

              return
            }
            setInterval(async () => {
              const { data } = await api.get('/ads')
              set((state) => ({ ...state, ads: data }))
            }, seconds)
          } catch (err) {
            set((state) => ({ ...state, isError: true }))
          }
        },
        async getAllByUser() {
          try {
            const { data } = await api.get('/users/ads')

            set((state) => ({ ...state, adsToUser: data.ads }))
          } catch (err) {
            set((state) => ({ ...state, isError: true }))
          }
        },
        async create({ description, gameImage, gameName }) {
          await api.post('/ads', {
            description,
            gameImage,
            gameName,
          })
        },
        close() {
          set((state) => ({ ...state, isOpenModal: false }))
        },
        open() {
          set((state) => ({ ...state, isOpenModal: true }))
        },
      }),
      {
        name: '@ads',
      }
    )
  )
)
