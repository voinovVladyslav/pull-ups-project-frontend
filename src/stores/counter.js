import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        bar_id: null,
        counters: [],
        totalCounters: 0,
        pageSize: 15,
        pageNumber: 1,
        next: null,
        prev: null,
    }),
    getters: {
        totalPages() {
            return Math.ceil(this.totalCounters / this.pageSize);
        },
        baseURL() {
            return `/api/bars/${this.bar_id}/counter/`;
        },
    },
    actions: {
        async getCounters() {
            if (!this.bar_id) {
                return;
            }
            const response = api
                .get(this.baseURL)
                .then((response) => {
                    this.counters = response.data.results;
                    this.totalCounters = response.data.count;
                    this.next = !!response.data.next;
                    this.prev = !!response.data.previous;
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return response;
        },
    },
});
