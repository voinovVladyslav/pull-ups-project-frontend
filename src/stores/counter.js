import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        pullup: {
            id: null,
            counters: [],
            totalCounters: 0,
            pageSize: 20,
            pageNumber: 1,
        },
        dip: {
            id: null,
            counters: [],
            totalCounters: 0,
            pageSize: 20,
            pageNumber: 1,
        },
    }),
    getters: {
        pullupTotalPages() {
            return Math.ceil(this.pullup.totalCounters / this.pullup.pageSize);
        },
        pullupQueryString() {
            return `?page=${this.pullup.pageNumber}&page_size=${this.pullup.pageSize}`;
        },
        morePullupCountersAvailable() {
            return this.pullup.pageNumber < this.pullupTotalPages;
        },
        dipTotalPages() {
            return Math.ceil(this.dip.totalCounters / this.dip.pageSize);
        },
        dipQueryString() {
            return `?page=${this.dip.pageNumber}&page_size=${this.dip.pageSize}`;
        },
        moreDipCountersAvailable() {
            return this.dip.pageNumber < this.dipTotalPages;
        },
    },
    actions: {
        async getPullUpCounters() {
            if (!this.pullup.id) {
                throw new Error("Pullup id is required");
            }
            const url = `/api/pullupbars/${this.pullup.id}/counter/${this.pullupQueryString}`;
            const res = await api
                .get(url)
                .then((response) => {
                    this.pullup.counters = response.data.results;
                    this.pullup.totalCounters = response.data.count;
                })
                .catch((error) => {
                    console.log(error);
                });
            return res;
        },
        async loadMorePullUpCounters() {
            if (!this.pullup.id) {
                throw new Error("Pullup id is required");
            }
            if (!this.morePullupCountersAvailable) {
                return;
            }
            this.pullup.pageNumber++;
            const url = `/api/pullupbars/${this.pullup.id}/counter/${this.pullupQueryString}`;
            const res = await api
                .get(url)
                .then((response) => {
                    this.pullup.counters = this.pullup.counters.concat(
                        response.data.results
                    );
                    this.pullup.totalCounters = response.data.count;
                })
                .catch((error) => {
                    console.log(error);
                });
            return res;
        },
        async savePullUpCounter(payload) {
            const url = `/api/pullupbars/${this.pullup.id}/counter/`;
            const res = await api
                .post(url, payload)
                .then((response) => {
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            return res;
        },
        async deletePullUpCounter(id) {
            const url = `/api/pullupbars/${this.pullup.id}/counter/${id}/`;
            const res = await api.delete(url);
            if (res.status === 204) {
                return true;
            }
            return false;
        },
        async getDipCounters() {
            if (!this.dip.id) {
                throw new Error("Dip id is required");
            }
            const url = `/api/dipstations/${this.dip.id}/counter/${this.dipQueryString}`;
            const res = await api
                .get(url)
                .then((response) => {
                    this.dip.counters = response.data.results;
                    this.dip.totalCounters = response.data.count;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async loadMoreDipCounters() {
            if (!this.dip.id) {
                throw new Error("Dip id is required");
            }
            if (!this.moreDipCountersAvailable) {
                return;
            }
            this.dip.pageNumber++;
            const url = `/api/dipstations/${this.dip.id}/counter/${this.dipQueryString}`;
            const res = await api
                .get(url)
                .then((response) => {
                    this.dip.counters = this.dip.counters.concat(
                        response.data.results
                    );
                    this.dip.totalCounters = response.data.count;
                })
                .catch((error) => {
                    console.log(error);
                });
            return res;
        },
        async saveDipCounter(payload) {
            const url = `/api/dipstations/${this.dip.id}/counter/`;
            const res = await api
                .post(url, payload)
                .then((response) => {
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            return res;
        },
        async deleteDipCounter(id) {
            const url = `/api/dipstations/${this.dip.id}/counter/${id}/`;
            const res = await api.delete(url);
            if (res.status === 204) {
                return true;
            }
            return false;
        },
    },
});
