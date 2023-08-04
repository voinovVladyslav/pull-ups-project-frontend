import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        bar_id: null,
        counters: [],
        totalCounters: 0,
        pageSize: 10,
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
        queryString() {
            let qs = `?page=${this.pageNumber}&page_size=${this.pageSize}`;
            return qs;
        },
    },
    actions: {
        async getCounters() {
            if (!this.bar_id) {
                return;
            }
            const url = this.baseURL + this.queryString;
            const response = api
                .get(url)
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
        async addCounter(payload) {
            const response = api
                .post(this.baseURL, payload)
                .then((response) => {
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            return response;
        },
        async deleteCounter(id) {
            const url = this.baseURL + `${id}/`;
            const response = api
                .delete(url)
                .then((response) => {
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return response;
        },
    },
});
