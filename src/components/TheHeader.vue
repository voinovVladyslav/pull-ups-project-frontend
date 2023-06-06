<template>
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn flat to="/">
                <q-toolbar-title>Workout UA</q-toolbar-title>
            </q-btn>
            <q-space></q-space>
            <div v-if="!isAuthenticated">
                <q-btn flat to="/registration">Register</q-btn>
                <q-btn flat to="/login">Login</q-btn>
            </div>
            <div v-else>
                <q-btn-dropdown :label="displayName">
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
    },
    methods: {
        logout() {
            authStore.logout();
        },
    },
});
</script>
