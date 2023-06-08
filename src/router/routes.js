const routes = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/IndexPage.vue"),
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
