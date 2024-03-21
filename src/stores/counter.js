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
        dipTotalPages() {
            return Math.ceil(this.dip.totalCounters / this.dip.pageSize);
        },
        dipQueryString() {
            return `?page=${this.dip.pageNumber}&page_size=${this.dip.pageSize}`;
        },
    },
    actions: {
        getPullUpCounters() {
            if (!this.pullup.id) {
                throw new Error("Pullup id is required");
            }
            const url = `/api/pullupbars/${this.pullup.id}/counter/`;
            const res = api
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
        getDipStationCounters() {
            if (!this.dip.id) {
                throw new Error("Dip id is required");
            }
            const url = `/api/dipstations/${this.dip.id}/counter/`;
            const res = api
                .get(url)
                .then((response) => {
                    this.dip.counters = response.data.results;
                    this.dip.totalCounters = response.data.count;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
