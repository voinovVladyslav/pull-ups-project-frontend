const routes = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/TrainingGroundsPage.vue"),
                meta: {
                    authOnly: false,
                    adminOnly: false,
                    unauthenticatedOnly: false,
                },
            },
            {
                path: "/registration",
                component: () => import("pages/RegistrationPage.vue"),
                meta: {
                    authOnly: false,
                    adminOnly: false,
                    unauthenticatedOnly: true,
                },
            },
            {
                path: "/login",
                component: () => import("pages/LoginPage.vue"),
                meta: {
                    authOnly: false,
                    adminOnly: false,
                    unauthenticatedOnly: true,
                },
            },
            {
                path: "/profile",
                component: () => import("pages/UserProfile.vue"),
                meta: {
                    authOnly: true,
                    adminOnly: false,
                    unauthenticatedOnly: false,
                },
            },
            {
                path: "/favorites",
                component: () => import("pages/FavoriteBars.vue"),
                meta: {
                    authOnly: true,
                    adminOnly: false,
                    unauthenticatedOnly: false,
                },
            },
            {
                path: "/add-pull-up-bar",
                component: () => import("pages/AddPullUpBar.vue"),
                meta: {
                    authOnly: false,
                    adminOnly: true,
                    unauthenticatedOnly: false,
                },
            },
            {
                path: "/achievements",
                component: () => import("pages/AchievementsPage.vue"),
                meta: {
                    authOnly: true,
                    adminOnly: false,
                    unauthenticatedOnly: false,
                },
            },
            {
                path: "/bar/:id/edit",
                component: () => import("pages/EditPullUpBar.vue"),
                meta: {
                    authOnly: false,
                    adminOnly: true,
                    unauthenticatedOnly: false,
                },
            },
            {
                path: "/workout/:id/",
                component: () => import("pages/WorkoutPage.vue"),
                meta: {
                    authOnly: true,
                    adminOnly: false,
                    unauthenticatedOnly: false,
                },
            },
        ],
        meta: {
            authOnly: false,
            adminOnly: false,
            unauthenticatedOnly: false,
        },
    },
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
        meta: {
            authOnly: false,
            adminOnly: false,
            unauthenticatedOnly: false,
        },
    },
];

export default routes;
