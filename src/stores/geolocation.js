import { defineStore } from "pinia";

export const useGeolocationStore = defineStore("geolocation", {
    state: () => ({
        location: null,
    }),
    actions: {
        getLocation() {
            const that = this;
            const options = {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0,
            };
            function success(pos) {
                that.location = pos.coords;
            }
            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(success, error, options);
        },
    },
});
