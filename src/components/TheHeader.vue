<template>
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn
                dense
                flat
                round
                icon="menu"
                @click="$emit('toggleLeftDrawer')"
            />
            <q-toolbar-title>Workout UA</q-toolbar-title>
            <q-space></q-space>
            <div class="flex">
                <div v-if="isStaff" class="q-mr-md">
                    <q-toolbar-title>Administrator</q-toolbar-title>
                </div>
                <div v-if="!isAuthenticated">
                    <q-btn flat to="/registration">Register</q-btn>
                    <q-btn flat to="/login">Login</q-btn>
                </div>
                <div v-else>
                    <q-toolbar-title>{{ displayName }}</q-toolbar-title>
                </div>
            </div>
        </q-toolbar>
    </q-header>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/auth";

const authStore = useAuthStore();

export default defineComponent({
    name: "TheHeader",
    emits: ["toggleLeftDrawer"],
    computed: {
        displayName() {
            return authStore.username || authStore.email;
        },
        isAuthenticated() {
            return authStore.isAuthenticated;
        },
        isStaff() {
            return authStore.isStaff;
        },
    },
    methods: {},
});
</script>
