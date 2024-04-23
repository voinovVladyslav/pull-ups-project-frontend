import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useChartsStore = defineStore("charts", {
    state: () => ({
        dips: [],
        pullups: [],
    }),

    actions: {
        async getDips() {
            const response = await api.get("/api/counter/dip/");
            this.dips.push(...response.data);
        },
        async getPullups() {
            const response = await api.get("/api/counter/pullup/");
            this.pullups.push(...response.data);
        },
    },
});
