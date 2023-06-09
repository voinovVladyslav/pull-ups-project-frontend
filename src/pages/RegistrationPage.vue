<template>
    <q-page class="flex flex-center">
        <q-card>
            <q-card-section class="q-pa-md">
                <div class="q-pa-md">
                    <q-form
                        @submit.prevent="onSubmit"
                        @reset="null"
                        class="q-gutter-md form-width"
                    >
                        <q-input
                            v-model="email"
                            label="Your email"
                            :error="!!emailError"
                            :error-message="emailError"
                            @blur="validateEmail"
                            @update:model-value="emailAlreadyExists = false"
                        />
                        <q-input
                            v-model="password1"
                            type="password"
                            label="Your password"
                            :error="!!passwordError"
                            :error-message="passwordError"
                            @blur="validatePassword"
                        />
                        <q-input
                            v-model="password2"
                            type="password"
                            label="Confirm password"
                            :error="!!passwordError"
                            :error-message="passwordError"
                            @blur="validatePassword"
                        />
                        <div>
                            <q-btn
                                class="full-width"
                                label="Submit"
                                type="submit"
                                color="primary"
                                :loading="loading"
                            />
                        </div>
                    </q-form>
                </div>
            </q-card-section>
            <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">
                    Already have account?
                    <q-btn unelevated flat to="/login">Login</q-btn>
                </p>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/auth";
const authStore = useAuthStore();

export default defineComponent({
    name: "RegistrationPage",
    data() {
        return {
            email: "",
            password1: "",
            password2: "",
            emailAlreadyExists: false,
            loading: false,
            emailError: null,
            passwordError: null,
        };
    },
    methods: {
        async onSubmit() {
            self.loading = true;
            const result = await authStore.registerUser(
                this.email,
                this.password1
            );
            if (result) {
                this.$router.push("/login");
            } else {
                this.emailAlreadyExists = true;
                this.emailError = "Email already exists";
            }
            self.loading = false;
        },
        isEmailValid(email) {
            const emailPattern =
                /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(email);
        },
        validateEmail() {
            if (this.emailAlreadyExists) {
                this.emailError = "Email already exist";
                return;
            }
            if (!this.isEmailValid(this.email)) {
                this.emailError = "Invalid email format";
                return;
            }
            this.emailError = null;
        },
        validatePassword() {
            if (this.password1.length < 7) {
                this.passwordError = "Should be at lead 8 character";
                return;
            }

            if (this.password2 !== this.password1) {
                this.passwordError = "Passwords do not match";
                return;
            }
            this.passwordError = null;
        },
    },
});
</script>

<style scoped>
.form-width {
    min-width: 400px;
    max-width: 500px;
}
</style>
