<template>
    <q-layout view="hHh lpR fFf">
        <the-header @toggleLeftDrawer="toggleLeftDrawer"></the-header>
        <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile"
            elevated>
            <q-scroll-area class="fit">
                <q-list>
                    <div v-if="isAuthenticated">
                        <q-item clickable :active="false" v-ripple to="/profile">
                            <q-item-section avatar>
                                <q-icon name="person"></q-icon>
                            </q-item-section>
                            <q-item-section> Profile </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAuthenticated">
                        <q-item clickable :active="false" v-ripple
                            @click="notificationDrawerOpen = !notificationDrawerOpen">
                            <q-item-section avatar>
                                <q-icon name="notifications"></q-icon>
                            </q-item-section>
                            <q-item-section> Notifications </q-item-section>
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
                        <q-item clickable :active="false" v-ripple
                            to="/registration">
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
                        <q-item clickable :active="false" v-ripple to="/favorites">
                            <q-item-section avatar>
                                <q-icon name="star"></q-icon>
                            </q-item-section>
                            <q-item-section> Favorites </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAuthenticated">
                        <q-item :active="false" clickable v-ripple
                            to="/achievements">
                            <q-item-section avatar>
                                <q-icon name="emoji_events"> </q-icon>
                            </q-item-section>
                            <q-item-section> Achievements </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAdmin">
                        <q-item clickable :active="false" v-ripple
                            to="/add-pull-up-bar">
                            <q-item-section avatar>
                                <q-icon name="add"></q-icon>
                            </q-item-section>
                            <q-item-section> Add Pull Up Bar </q-item-section>
                        </q-item>
                    </div>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-drawer v-model="notificationDrawerOpen" side="left" overlay
            behavior="mobile" elevated>
            <q-scroll-area class="fit">
                <q-list>
                    <div>
                        <q-item v-ripple>
                            <q-item-section>Read All</q-item-section>
                            <q-item-section avatar>
                                <q-icon name="checklist_rtl" size="md"
                                    class="cursor-pointer"
                                    @click="markNotificationsAsRead" />
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-for="notification in notifications"
                        :key="notification.id">
                        <q-item :to="notification.redirect_to">
                            <q-item-section>
                                {{ notification.message }}
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
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
import { useNotificationsStore } from "src/stores/notifications"

const authStore = useAuthStore();
const notificationsStore = useNotificationsStore()

export default {
    setup() {
        async function authenticateUser() {
            if (!authStore.isAuthenticated) {
                await authStore.getProfileData();
            }
        }
        notificationsStore.getUnreadNotifications()
        authenticateUser();
    },
    data() {
        return {
            leftDrawerOpen: false,
            notificationDrawerOpen: false,
        };
    },
    methods: {
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen;
        },
        async markNotificationsAsRead() {
            await notificationsStore.markNotificationsAsRead()
            await notificationsStore.getUnreadNotifications()
        }
    },
    computed: {
        isAdmin() {
            return authStore.isStaff;
        },
        isAuthenticated() {
            return authStore.isAuthenticated;
        },
        notifications() {
            return notificationsStore.notifications
        }
    },
};
</script>
