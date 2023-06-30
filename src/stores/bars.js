import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useBarsStore = defineStore("bars", {
    state: () => ({
        bars: [],
        totalBars: 0,
        pageSize: 20,
        pageNumber: 1,
        perPageVariants: [20, 50, 100],
        next: null,
        prev: null,
    }),
    getters: {
        queryString() {
            return `?page=${this.pageNumber}&page_size=${this.pageSize}`;
        },
        totalPages() {
            return Math.ceil(this.totalBars / this.pageSize);
        },
    },
    actions: {
        async getBars() {
            const url = "/api/bars/" + this.queryString;
            const res = await api
                .get(url)
                .then((response) => {
                    this.bars = response.data.results;
                    this.totalBars = response.data.count;
                    this.next = !!response.data.next;
                    this.prev = !!response.data.previous;
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
    },
});
