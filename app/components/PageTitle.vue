<template>
    <div class="text-3xl font-black text-shadow-2xs" :class="props.colorClass">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
interface PageTitleProperties {
    colorClass?: string
}

const props = withDefaults(defineProps<PageTitleProperties>(), {
    colorClass: "text-gray-100"
})
</script>