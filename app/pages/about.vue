<template>
    <div>
        <PageTitle>About</PageTitle>

        <p class="mt-4">Counter: {{ counter }}</p>
    </div>


</template>

<script setup lang="ts">

const counter = useState('counter', () => 0)
</script>