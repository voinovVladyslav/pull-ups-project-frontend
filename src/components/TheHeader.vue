<template>
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn flat to="/">
                <q-toolbar-title>Workout UA</q-toolbar-title>
            </q-btn>
            <q-space></q-space>
            <q-btn flat to="/registration">Register</q-btn>
            <q-btn flat to="/login">Login</q-btn>
        </q-toolbar>
    </q-header>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "TheHeader",
});
</script>
