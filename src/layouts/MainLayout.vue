<template>
    <q-layout view="hHh lpR fFf">
        <the-header @toggleLeftDrawer="toggleLeftDrawer"></the-header>
        <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile"
            elevated>
            <q-scroll-area class="fit">
                <q-list>
                    <div v-if="isAuthenticated">
                        <q-item clickable :active="false" v-ripple
                            to="/profile">
                            <q-item-section avatar>
                                <q-icon name="person" size="md"></q-icon>
                            </q-item-section>
                            <q-item-section> Profile </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAuthenticated">
                        <q-item clickable :active="false" v-ripple
                            @click="notificationDrawerOpen = !notificationDrawerOpen">
                            <q-item-section avatar>
                                <q-icon name="notifications" size="md"></q-icon>
                            </q-item-section>
                            <q-item-section> Notifications </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div>
                        <q-item :active="false" clickable v-ripple to="/">
                            <q-item-section avatar>
                                <q-icon name="search" size="md"></q-icon>
                            </q-item-section>
                            <q-item-section> Training Grounds </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="!isAuthenticated">
                        <q-item clickable :active="false" v-ripple
                            to="/registration">
                            <q-item-section avatar>
                                <q-icon name="person" size="md"></q-icon>
                            </q-item-section>
                            <q-item-section> Registration</q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="!isAuthenticated">
                        <q-item clickable :active="false" v-ripple to="/login">
                            <q-item-section avatar>
                                <q-icon name="login" size="md"></q-icon>
                            </q-item-section>
                            <q-item-section> Login </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAuthenticated">
                        <q-item :active="false" clickable v-ripple
                            to="/achievements">
                            <q-item-section avatar>
                                <q-icon name="emoji_events" size="md"> </q-icon>
                            </q-item-section>
                            <q-item-section> Achievements </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAdmin">
                        <q-item :active="false" clickable v-ripple
                            to="/add-training-ground">
                            <q-item-section avatar>
                                <q-icon name="add" size="md"> </q-icon>
                            </q-item-section>
                            <q-item-section> Add Training Ground
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
                    </div>
                    <div v-if="isAuthenticated">
                        <q-item :active="false" clickable v-ripple to="/charts">
                            <q-item-section avatar>
                                <q-icon name="fa-solid fa-chart-line" size="sm">
                                </q-icon>
                            </q-item-section>
                            <q-item-section> Charts
                            </q-item-section>
                        </q-item>
                        <q-separator></q-separator>
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
                    <div v-if="!notifications.length"
                        class="q-mt-md text-center">
                        <q-item>
                            <q-item-section>You don't have unread
                                notifications</q-item-section>
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
import { useNotificationsStore } from "src/stores/notifications"

const authStore = useAuthStore();
const notificationsStore = useNotificationsStore()

export default {
    setup() {
        async function authenticateUser() {
            if (!authStore.isAuthenticated) {
                await authStore.getProfileData();
            }
            if (authStore.isAuthenticated) {
                notificationsStore.getUnreadNotifications()
            }
        }
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
