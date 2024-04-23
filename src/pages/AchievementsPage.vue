<template>
    <q-page
        class="q-pa-md row items-start q-gutter-md justify-center default-page-container">
        <AchievementCard v-for="achievement in achievements"
            :key="achievement.id" :achievement="achievement">
        </AchievementCard>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { useAchievementsStore } from 'src/stores/achievements';
import AchievementCard from 'src/components/AchievementCard.vue';

const achievementsStore = useAchievementsStore()

export default defineComponent({
    name: "AchievementsPage",
    components: {
        AchievementCard
    },
    setup() {
        achievementsStore.getAchievements()
    },
    computed: {
        achievements() {
            return achievementsStore.achievements
        }
    }
})
</script>
