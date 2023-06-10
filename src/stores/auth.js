import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        email: null,
        username: null,
        isStaff: false,
    }),
    getters: {
        isAuthenticated() {
            return !!this.token;
        },
    },
    actions: {
        async registerUser(email, password) {
            const payload = {
                email: email,
                password: password,
            };
            const res = await api
                .post("/api/user/create/", payload)
                .then((response) => {
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
        async loginUser(email, password) {
            const payload = {
                email: email,
                password: password,
            };
            const res = await api
                .post("/api/user/token/", payload)
                .then((response) => {
                    this.token = response.data.token;
                    localStorage.setItem("token", this.token);
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
        async logout() {
            this.token = null;
            this.email = null;
            this.username = null;
            this.isStaff = false;
            api.defaults.headers.common.Authorization = null;
            localStorage.removeItem("token");
        },
        async getProfileData() {
            const storageToken = localStorage.getItem("token");
            if (!this.isAuthenticated && storageToken) {
                this.token = storageToken;
            }
            if (!this.isAuthenticated) {
                return;
            }
            api.defaults.headers.common[
                "Authorization"
            ] = `Token ${this.token}`;
            const res = await api
                .get("/api/user/me/")
                .then((response) => {
                    this.email = response.data.email;
                    this.username = response.data.username;
                    this.isStaff = response.data.is_staff;
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
    },
});
