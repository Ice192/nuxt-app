<template>
    <div class="w-full">
        <div>
            <section class="flex flex-col bg-blue-600 p-6 h-80 items-center justify-center">
                <h1 class=" font-black text-4xl">The Best Website</h1>
                <p>The one and only</p>
            </section>

            <section class="flex flex-col bg-purple-400 p-6 h-80 items-center justify-center select-none cursor-pointer"
                @click="counter++">
                <h1 class=" font-black text-2xl">{{ counter }} Clicks</h1>
                <small>Click everywhere in this section</small>
            </section>

            <section class="flex flex-col bg-amber-800 p-6 h-80 items-center">
                <div class="h-1/3 flex items-center">
                    <h1 class=" font-black text-4xl">Our List of Fruits</h1>
                </div>
                <div class="text-xl p-4">
                    <p v-if="pending">Loading....</p>
                    <ul v-else class="list-disc list-inside">
                        <li v-for="fruit in data?.fruits" :key="fruit.id">{{ fruit.name }}</li>
                    </ul>
                </div>
            </section>

        </div>
    </div>
</template>

<script setup lang="ts">


const counter = useState('counter', () => 0)

const { data, pending, error } = await useFetch("/api/hello", {})

useHead({
    title: 'Home'
})
</script>