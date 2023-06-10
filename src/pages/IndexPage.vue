<template>
    <q-page class="flex flex-center">
        <h1>text</h1>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useBarsStore } from "src/stores/bars";

const authStore = useAuthStore();
const barsStore = useBarsStore();

export default defineComponent({
    name: "IndexPage",
    setup() {
        authStore.getProfileData();
        barsStore.getBars();
    },
});
</script>
