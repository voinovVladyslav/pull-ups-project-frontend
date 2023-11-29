import { defineStore } from "pinia";
import { Notify } from "quasar";
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
        async markNotificationsAsRead() {
            const url = "/api/notifications/mark-read/";
            const response = await api
                .post(url)
                .then((response) => {
                    Notify.create({
                        message: "Mark all notifications as read",
                        color: "positive",
                    });
                })
                .catch((error) => {
                    Notify.create({
                        message: "Failed to mark notifications as read",
                        color: "negative",
                    });
                });
        },
    },
});
