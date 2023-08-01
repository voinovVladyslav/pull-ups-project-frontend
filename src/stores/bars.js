import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useBarsStore = defineStore("bars", {
    state: () => ({
        bars: [],
        totalBars: 0,
        pageSize: 15,
        perPageVariants: [20, 50, 100],
        pageNumber: 1,
        referencePoint: null,
        next: null,
        prev: null,
    }),
    getters: {
        queryString() {
            let qs = `?page=${this.pageNumber}&page_size=${this.pageSize}`;
            if (this.referencePoint) {
                qs =
                    qs +
                    `&ref_point=${this.referencePoint.longitude};${this.referencePoint.latitude}`;
            }
            return qs;
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
        async getFavoriteBars() {
            const url = "/api/bars/favorites/" + this.queryString;
            const res = await api
                .get(url)
                .then((response) => {
                    this.bars = response.data;
                    return true;
                })
                .catch((error) => {
                    return false;
                });
            return res;
        },
        async addToFavorite(id) {
            const payload = { bar_id: id };
            const url = "/api/bars/favorites/add/";
            const res = await api
                .post(url, payload)
                .then((response) => {
                    Notify.create({
                        message: "Added to favorite",
                        color: "positive",
                    });
                })
                .catch((error) => {
                    Notify.create({
                        message: "Error on adding to favorite",
                        color: "negative",
                    });
                });
            return res;
        },
        async removeFromFavorite(id) {
            const payload = { bar_id: id };
            const url = "/api/bars/favorites/remove/";
            const res = await api
                .post(url, payload)
                .then((response) => {
                    Notify.create({
                        message: "Removed from favorite",
                        color: "positive",
                    });
                })
                .catch((error) => {
                    Notify.create({
                        message: "Error on removing from favorite",
                        color: "negative",
                    });
                });
            return res;
        },
    },
});
