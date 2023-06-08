<template>
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn flat to="/">
                <q-toolbar-title>Workout UA</q-toolbar-title>
            </q-btn>
            <q-space></q-space>
            <div v-if="isStaff">
                <q-btn flat>Admin</q-btn>
            </div>
            <div v-if="!isAuthenticated">
                <q-btn flat to="/registration">Register</q-btn>
                <q-btn flat to="/login">Login</q-btn>
            </div>
            <div v-else>
                <q-btn-dropdown flat :label="displayName">
                    <q-list>
                        <q-item clickable v-close-popup>
                            <q-item-section>
                                <q-item-label>Profile</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="logout">
                            <q-item-section>
                                <q-item-label>Logout</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
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
    methods: {
        logout() {
            authStore.logout();
        },
    },
});
</script>
