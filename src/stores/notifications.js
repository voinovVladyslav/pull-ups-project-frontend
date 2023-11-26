import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        notifications: [],
    }),
    getters: {
        unreadQueryString() {
            return "?unread=true";
        },
    },
    actions: {
        async getUnreadNotifications() {
            const url = "/api/notifications" + this.unreadQueryString;
            const response = await api
                .get(url)
                .then((response) => {
                    this.notifications = response.data;
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        },
    },
});
