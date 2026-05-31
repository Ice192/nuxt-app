<template>
    <div>
        Profile: {{ profilesid }}
    </div>
</template>

<script setup lang="ts">
const profilesid = useRoute().params.profilesid

definePageMeta({
    layout: 'profiles'
})
</script>