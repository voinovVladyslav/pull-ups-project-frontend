<template>
    <q-page>
        <div>
            <h5 class="text-center q-my-md">Training Ground #{{ id }}</h5>
        </div>
        <div>

        </div>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrainingGroundsStore } from 'src/stores/tg';

const tgStore = useTrainingGroundsStore();

export default defineComponent({
    name: 'WorkoutPage',
    setup() {
        const route = useRoute();
        const router = useRouter();
        async function fetchTg() {
            const id = route.params.id;
            await tgStore.getTrainingGround(id);
            if (!tgStore.trainingGround) {
                router.push('/');
            }
        }
        fetchTg();
        return {};
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    }
});
</script>
