<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md">
            <div>email: {{ email }}</div>
            <q-btn
                v-if="!editForm"
                label="Edit Profile"
                color="primary"
                @click="openEditForm"
            ></q-btn>
            <div v-if="editForm">
                <q-form class="q-gutter-md" @submit="submitForm" @reset="null">
                    <q-input label="Email" v-model="editEmail"></q-input>
                    <q-btn label="Save" color="primary" type="submit"></q-btn>
                    <q-btn
                        label="Cancel"
                        color="grey"
                        type="button"
                        @click="editForm = !editForm"
                    ></q-btn>
                </q-form>
            </div>

            <q-btn
                label="Logout"
                color="negative"
                type="button"
                @click="logout"
            >
            </q-btn>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();

export default defineComponent({
    name: "UserProfile",
    data: () => ({
        editEmail: null,
        editPassword1: null,
        editPassword2: null,
        editForm: false,
    }),
    computed: {
        email() {
            return authStore.email;
        },
    },
    methods: {
        async submitForm() {
            const payload = {
                email: this.editEmail,
            };
            const res = await authStore.updateProfileData(payload);
            this.editForm = !this.editForm;
            return;
        },
        openEditForm() {
            this.editForm = !this.editForm;
            this.editEmail = this.email;
        },
        logout() {
            authStore.logout();
            this.$router.push("/");
        },
    },
});
</script>
