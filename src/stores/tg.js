import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTrainingGroundsStore = defineStore("tg", {
    state: () => ({
        trainingGrounds: [],
        trainingGround: null,
        pagination: {
            totalTG: 0,
            pageSize: 20,
            perPageVariants: [20, 50, 100],
            pageNumber: 1,
        },
        filters: {
            referencePoint: null,
            favorites_only: false,
        },
    }),
    getters: {
        queryString() {
            let qs = `?page=${this.pagination.pageNumber}&page_size=${this.pagination.pageSize}`;
            if (this.filters.referencePoint) {
                qs =
                    qs +
                    (`&ref_point=${this.filters.referencePoint.longitude};` +
                        `${this.filters.referencePoint.latitude}`);
            }
            if (this.filters.favorites_only) {
                qs = qs + "&is_favorite=true";
            }
            return qs;
        },
        totalPages() {
            return Math.ceil(this.totalTG / this.pageSize);
        },
    },
    actions: {
        async getTraingGrounds() {
            const url = "/api/training-ground/" + this.queryString;
            const res = await api
                .get(url)
                .then((response) => {
                    this.trainingGrounds = response.data.results;
                    this.totalTG = response.data.count;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            return res;
        },
        async addToFavorites(id) {
            const url = `/api/training-ground/${id}/favorites/add/`;
            const response = await api.post(url);
        },
        async removeFromFavorites(id) {
            const url = `/api/training-ground/${id}/favorites/remove/`;
            const response = await api.post(url);
        },
    },
});
