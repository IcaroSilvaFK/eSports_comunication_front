import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

import { api } from '../../configs/global/axios'

type LoginUser = {
  username: string
}

type CreateUser = LoginUser & {
  name: string
}

interface IUserProps extends CreateUser {
  id: string
  created_at: string
}

interface IUseUserProps {
  user: null | IUserProps
  create(user: CreateUser): Promise<void>
  login(user: LoginUser): Promise<void>
  logout(): Promise<void>
}

export const useUser = create<IUseUserProps>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        async create({ name, username }) {
          const { data } = await api.post('/users', { name, username })

          const { data: response } = await api.post('/sessions', {
            username: data.user.username,
          })

          localStorage.setItem('@token', response.token.token)
          set((state) => ({ ...state, user: response.user }))
        },
        async login({ username }) {
          const { data } = await api.post('/sessions', {
            username,
          })
          localStorage.setItem('@token', data.token.token)
          set((state) => ({ ...state, user: data.user }))
        },
        async logout() {
          await api.delete('/sessions')
          localStorage.removeItem('@token')
          set((state) => ({ ...state, user: null }))
        },
      }),
      {
        name: '@user',
      }
    )
  )
)
