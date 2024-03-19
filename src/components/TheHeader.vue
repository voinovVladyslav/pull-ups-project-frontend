<template>
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn dense flat round icon="menu"
                @click="$emit('toggleLeftDrawer')" />
        </q-toolbar>
    </q-header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "TheHeader",
    emits: ["toggleLeftDrawer"],
});
</script>
