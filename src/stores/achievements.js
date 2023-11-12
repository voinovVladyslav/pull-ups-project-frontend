import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAchievementsStore = defineStore("achievements", {
    state: () => ({
        achievements: [],
    }),
    actions: {
        async getAchievements() {
            const res = await api
                .get("/api/achievements/")
                .then((response) => {
                    this.achievements = response.data;
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
    },
});
