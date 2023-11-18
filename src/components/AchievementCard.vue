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
import { NO_IMAGE_URL, LOCKED_ACHIEVEMENT_URL } from 'src/constants/static'

export default defineComponent({
    name: "AchievementCard",
    props: ['achievement'],
    methods: {
        getImageToDisplay(achievement) {
            if (!achievement.done) {
                return LOCKED_ACHIEVEMENT_URL
            }
            return achievement.image ? achievement.image : NO_IMAGE_URL
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
