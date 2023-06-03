<template>
    <q-page class="flex flex-center">
        <q-card>
            <div class="q-pa-md">
                <q-form
                    @submit.prevent="onSubmit"
                    class="q-gutter-md form-width"
                >
                    <q-input
                        v-model="email"
                        label="Your email"
                        :rules="[(val) => isEmailValid(val) || 'Invalid email']"
                    />
                    <q-input
                        v-model="password1"
                        type="password"
                        label="Your password"
                        lazy-rules
                        :rules="[
                            (val) =>
                                val.length > 7 ||
                                'Password should be at least 8 character',
                        ]"
                    />
                    <q-input
                        v-model="password2"
                        type="password"
                        label="Confirm password"
                        :rules="[
                            (val) =>
                                val === password1 || 'Passwords do not match',
                        ]"
                    />
                    <q-btn label="Submit" type="submit" color="primary" />
                </q-form>
            </div>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "RegistrationPage",
    data() {
        return {
            email: "",
            password1: "",
            password2: "",
        };
    },
    methods: {
        onSubmit() {
            console.log("Submit");
            console.log("email:", this.email);
            console.log("password1", this.password1);
            console.log("password2", this.password2);
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
