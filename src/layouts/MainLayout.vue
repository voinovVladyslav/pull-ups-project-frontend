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
                    <div v-if="isAuthenticated">
                        <q-item
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
                    </div>
                    <div>
                        <q-item :active="false" clickable v-ripple to="/">
                            <q-item-section avatar>
                                <q-icon name="search"></q-icon>
                            </q-item-section>
                            <q-item-section> Discover </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="!isAuthenticated">
                        <q-item
                            clickable
                            :active="false"
                            v-ripple
                            to="/registration"
                        >
                            <q-item-section avatar>
                                <q-icon name="person"></q-icon>
                            </q-item-section>
                            <q-item-section> Registration</q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="!isAuthenticated">
                        <q-item clickable :active="false" v-ripple to="/login">
                            <q-item-section avatar>
                                <q-icon name="login"></q-icon>
                            </q-item-section>
                            <q-item-section> Login </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAuthenticated">
                        <q-item
                            clickable
                            :active="false"
                            v-ripple
                            to="/favorites"
                        >
                            <q-item-section avatar>
                                <q-icon name="star"></q-icon>
                            </q-item-section>
                            <q-item-section> Favorites </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAdmin">
                        <q-item
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
                    </div>
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
