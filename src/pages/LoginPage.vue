<template>
    <q-page class="flex flex-center">
        <q-card>
            <div class="q-pa-md">
                <q-form
                    @submit.prevent="onSubmit"
                    @reset="null"
                    class="q-gutter-md form-width"
                >
                    <q-input
                        v-model="email"
                        label="Your email"
                        lazy-rules
                        :rules="[(val) => isEmailValid(val) || 'Invalid email']"
                        :error="error"
                        error-message="Invalid credentials"
                    />
                    <q-input
                        v-model="password"
                        type="password"
                        label="Your password"
                        :rules="[(val) => !!val || 'Enter password']"
                    />
                    <q-btn
                        label="Submit"
                        type="submit"
                        color="primary"
                        :loading="loading"
                    />
                </q-form>
            </div>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/auth";
const authStore = useAuthStore();

export default defineComponent({
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: "",
            loading: false,
            error: false,
        };
    },
    methods: {
        async onSubmit() {
            this.loading = true;
            const result = await authStore.loginUser(this.email, this.password);
            this.error = !result;
            if (result) {
                authStore.getProfileData();
                this.$router.push("/");
            }
            this.loading = false;
        },

        isEmailValid(email) {
            const emailPattern =
                /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(email);
        },
    },
});
</script>

<style scoped>
.form-width {
    min-width: 300px;
    max-width: 400px;
}
</style>
