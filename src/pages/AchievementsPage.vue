<template>
    <div> {{ achievements }} </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useAchievementsStore } from 'src/stores/achievements';

const achievementsStore = useAchievementsStore()

export default defineComponent({
    name: "AchievementsPage",
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
