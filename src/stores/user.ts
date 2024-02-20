import axios from 'axios'
import { defineStore } from 'pinia'

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
        logoutUser() {
            this.$reset()
        },
        async getUserInfo() {
            if (this.token === '') {
                return
            }
            let userInfo = this.$state.userInfo
            await axios({
                method: "get",
                url:import.meta.env.VITE_BACKEND_URL + "/api/v1/user/1",
                headers: {
                    'Authorization': "Bearer " + this.$state.token
                }
            })
            .then(function(response){
                userInfo.id = response.data.data.id
                userInfo.nickname = response.data.data.nick_name
                userInfo.avatar = '666'
            })
            this.$state.userInfo = userInfo
        },
    },
})