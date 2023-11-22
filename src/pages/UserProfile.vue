<template>
    <q-page class="">
        <div class="q-pa-md row">
            <h4 class="col-12 q-mt-xs text-center">Profile</h4>
            <div class="col-12 q-mb-md" v-if="!editForm">
                <strong>Email:</strong> {{ email }}
            </div>
            <div v-if="!editForm" class="col-12 row justify-between">
                <q-btn class="col-5" label="Edit Profile" color="primary"
                    @click="openEditForm"></q-btn>

                <q-btn class="col-5" label="Logout" color="negative" type="button"
                    @click="logout">
                </q-btn>
            </div>
            <div v-else class="col-12 row">
                <q-form class="q-gutter-md col-12 row justify-center"
                    @submit="submitForm" @reset="null">
                    <div class="col-11">
                        <q-input label="Email" v-model="editEmail"></q-input>
                    </div>

                    <q-space></q-space>
                    <div class="col-11 row justify-between">
                        <q-btn class="col-5" label="Save" color="primary"
                            type="submit"></q-btn>
                        <q-btn class="col-5" label="Cancel" color="grey"
                            type="button" @click="editForm = !editForm"></q-btn>
                    </div>
                </q-form>
            </div>

            <div class="col-12 q-mt-md row">
                <DisplayStatistics :stats="stats"></DisplayStatistics>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import DisplayStatistics from "src/components/DisplayStatistics.vue";

const authStore = useAuthStore();

export default defineComponent({
    name: "UserProfile",
    components: {
        DisplayStatistics
    },
    setup() {
        authStore.getStats()
    },
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
        stats() {
            return authStore.stats;
        }
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
