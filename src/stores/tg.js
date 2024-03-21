import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifyDanger, notifySuccess } from "src/utils/notify";

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
            return Math.ceil(
                this.pagination.totalTG / this.pagination.pageSize
            );
        },
        moreAvailable() {
            return this.pagination.pageNumber < this.totalPages;
        },
    },
    actions: {
        async getTrainingGrounds() {
            const url = "/api/training-ground/" + this.queryString;
            const res = await api
                .get(url)
                .then((response) => {
                    this.trainingGrounds = response.data.results;
                    this.pagination.totalTG = response.data.count;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            return res;
        },
        async loadMoreTrainingGrounds() {
            if (!this.moreAvailable) {
                return;
            }
            this.pagination.pageNumber++;
            const url = "/api/training-ground/" + this.queryString;
            const res = await api
                .get(url)
                .then((response) => {
                    this.trainingGrounds = this.trainingGrounds.concat(
                        response.data.results
                    );
                    this.pagination.totalTG = response.data.count;
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            return res;
        },
        async getTrainingGround(id) {
            const url = `/api/training-ground/${id}/`;
            await api
                .get(url)
                .then((response) => {
                    this.trainingGround = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 404) {
                        notifyDanger("Training ground not found");
                    }
                });
        },
        async addToFavorites(id) {
            const url = `/api/training-ground/${id}/favorites/add/`;
            await api.post(url);
        },
        async removeFromFavorites(id) {
            const url = `/api/training-ground/${id}/favorites/remove/`;
            await api.post(url);
        },
        async addTrainingGround(data) {
            const url = "/api/training-ground/";
            const res = await api
                .post(url, data)
                .then((response) => {
                    notifySuccess("Training ground added successfully");
                    return true;
                })
                .catch((error) => {
                    console.log(error);
                    notifyDanger("Failed to add training ground");
                    return false;
                });
            return res;
        },
    },
});
