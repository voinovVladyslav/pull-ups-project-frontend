<template>
    <q-layout view="hHh lpR fFf">
        <the-header @toggleLeftDrawer="toggleLeftDrawer"></the-header>

        <q-drawer
            v-model="leftDrawerOpen"
            side="left"
            overlay
            behavior="mobile"
            elevated
        >
            <q-scroll-area class="fit">
                <q-list>
                    <q-item :active="false" clickable v-ripple to="/">
                        <q-item-section avatar>
                            <q-icon name="home"></q-icon>
                        </q-item-section>
                        <q-item-section> Home </q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-item
                        v-if="isAuthenticated"
                        clickable
                        :active="false"
                        v-ripple
                        to="/profile"
                    >
                        <q-item-section avatar>
                            <q-icon name="person"></q-icon>
                        </q-item-section>
                        <q-item-section> Profile </q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-item
                        v-if="isAdmin"
                        clickable
                        :active="false"
                        v-ripple
                        to="/add-pull-up-bar"
                    >
                        <q-item-section avatar>
                            <q-icon name="add"></q-icon>
                        </q-item-section>
                        <q-item-section> Add Pull Up Bar </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();

export default {
    setup() {
        async function authenticateUser() {
            if (!authStore.isAuthenticated) {
                await authStore.getProfileData();
            }
        }
        authenticateUser();
    },
    data() {
        return {
            leftDrawerOpen: false,
        };
    },
    methods: {
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen;
        },
    },
    computed: {
        isAdmin() {
            return authStore.isStaff;
        },
        isAuthenticated() {
            return authStore.isAuthenticated;
        },
    },
};
</script>
