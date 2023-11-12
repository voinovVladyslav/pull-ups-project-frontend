<template>
    <q-card class="achievement_card">
        <q-img :src="getImageToDisplay(achievement)">
            <div
                class="absolute-bottom text-subtitle2 text-center achievement_title">
                {{ achievement.title }}
            </div>
        </q-img>
        <q-card-section class="text-center">
            {{ achievement.description }}
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "AchievementCard",
    props: ['achievement'],
    methods: {
        getImageToDisplay(achievement) {
            if (!achievement.done) {
                return 'src/assets/locked_achievement.png'
            }
            return achievement.image ? achievement.image : 'src/assets/no_image_available.png'
        }
    }
})
</script>


<style scoped>
.achievement_card {
    width: 100%;
    max-width: 150px;
}

.achievement_title {
    padding: 2px;
}
</style>
