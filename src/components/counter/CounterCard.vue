<template>
    <q-card class="card shadow q-my-md flex justify-between">
        <q-card-section v-if="!confirmDelete" class="self-center q-ml-sm">
            <div style="min-width:20px">{{ counter.reps }}</div>
        </q-card-section>
        <q-card-section v-if="!confirmDelete" class="q-ml-sm q-py-sm">
            <div class="text-center">{{ renderDate(counter.created_at) }}</div>
            <div class="text-center">{{ renderTime(counter.created_at) }}</div>
        </q-card-section>
        <q-card-section v-if="!confirmDelete" class="self-center q-py-none">
            <q-icon name="fa-solid fa-trash-can" class="cursor-pointer"
                color="negative" size="sm" @click="confirmDelete = true" />
        </q-card-section>
        <q-card-section v-else class="self-center flex justify-between"
            style="min-width: 100%;">
            <q-btn label="delete" class="button" color="negative"
                @click="handleDelete" />
            <q-btn label="dismiss" color="primary" class="button"
                @click="confirmDelete = false" />
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { renderDate, renderTime } from 'src/utils/datetime'

export default defineComponent({
    name: 'CounterCard',
    emits: ['delete'],
    props: {
        counter: {
            type: Object,
            required: true
        },
    },
    setup() {
        return {
            renderDate,
            renderTime,
        }
    },
    data() {
        return {
            confirmDelete: false,
        }
    },
    methods: {
        handleDelete() {
            this.$emit('delete', this.counter.id);
        }
    }
});
</script>

<style scoped>
.card {
    min-height: 50px;
    max-height: 70px;
    min-width: 314px;
}

.button {
    min-width: 40%;
}
</style>
