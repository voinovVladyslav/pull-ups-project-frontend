import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        email: null,
    }),
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
    },
});
