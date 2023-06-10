import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useBarsStore = defineStore("bars", {
    state: () => ({
        bars: [],
        totalBars: 0,
        pageSize: 30,
        pageNumber: 1,
        perPageVariants: [20, 50, 100],
        next: null,
        prev: null,
    }),
    getters: {
        queryString() {},
    },
    actions: {
        async getBars() {
            const res = await api
                .get("/api/bars/")
                .then((response) => {
                    this.bars = response.data.results;
                    this.totalBars = response.data.count;
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
    },
});
