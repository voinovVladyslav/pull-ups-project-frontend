<template>
    <q-page class="flex flex-center">Home</q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/auth";

const authStore = useAuthStore();

export default defineComponent({
    name: "IndexPage",
    setup() {
        authStore.getProfileData();
    },
});
</script>
