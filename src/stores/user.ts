import axios from 'axios'
import { defineStore } from 'pinia'
import { ElMessageBox } from 'element-plus'
import { serviceJwt } from '@/api/http'

export const useUserStore = defineStore('user', {
    persist: {
        key: 'gvb_blog_user',
        paths: ['token'],
    },
    state: () => ({
        userInfo: {
            id: '',
            nickname: '',
            avatar: 'https://cdn.acwing.com/media/user/profile/photo/179851_lg_999c62f13a.jpg',
        },
        token: '',
    }),
    getters: {
        userToken: state => state.token ?? '',
        userId: state => state.userInfo.id ?? '',
        nickname: state => state.userInfo.nickname ?? '',
        avatar: state => state.userInfo.avatar ?? '',
    },
    actions: {
        setToken(token: string) {
            this.$state.token = token
        },
        // 注销用户
        logoutUser() {
            this.$reset()
        },
        async getUserInfo() {
            if (this.token === '') {
                return
            }
            try {
                const response = await serviceJwt.get('/api/v1/user')
                this.$state.userInfo.nickname = response.data.nickname
                this.$state.userInfo.id = response.data.id
            } catch (error) {
            }
        },
    },
})