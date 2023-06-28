<template>
    <q-layout view="hHh lpR fFf">
        <the-header></the-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();

async function authenticateUser() {
    if (!authStore.isAuthenticated) {
        await authStore.getProfileData();
    }
}
authenticateUser();
</script>
