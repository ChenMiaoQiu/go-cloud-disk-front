import axios from 'axios'
import { defineStore } from 'pinia'
import { ElMessageBox } from 'element-plus'
import type { LoginRes } from "@/api/user/types";
import { GetUserInfo } from '@/api/user';

export const useUserStore = defineStore('user', {
    persist: {
        key: 'gvb_blog_user',
        paths: ['token', 'userInfo.id'],
    },
    state: () => ({
        userInfo: {
            id: '',
            nickname: '',
            username: '',
            filefolder: '',
            filestore: '',
            status: '',
        },
        token: '',
    }),
    getters: {
        userToken: state => state.token ?? '',
        userId: state => state.userInfo.id ?? '',
        nickname: state => state.userInfo.nickname ?? '',
        username: state => state.userInfo.username ?? '',
        filefolder: state => state.userInfo.filefolder ?? '',
        filestore: state => state.userInfo.filestore ?? '',
        status: state => state.userInfo.status ?? '',
    },
    actions: {
        setToken(token: string) {
            this.$state.token = token
        },
        setUser(userInfo: LoginRes) {
            this.userInfo = userInfo
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
                const response = await GetUserInfo(this.userId)
                this.userInfo = response
            } catch (error) {
                console.log(error)
                ElMessageBox.alert("登录过期,请重新登录", "ops")
                this.logoutUser()
            }
        },
    },
})