<template>
    <div class="p-4 flex items-center justify-center grow">
        <form class="flex flex-col gap-2 items-center" @submit.prevent="submitForm">
            <div class="flex gap-2 items-center justify-center">
                <label for="username">Username:</label>
                <input v-model="form.username" type="text" name="username" id="username" placeholder="Input Username">
            </div>

            <div class="flex gap-2 items-center justify-center">
                <label for="password">Password:</label>
                <input v-model="form.password" type="password" name="password" id="password"
                    placeholder="Input Password">
            </div>


            <button type="submit" class="px-6!">Submit</button>
        </form>
        <div v-if="error" class="flex items-center justify-center">
            {{ error }}
        </div>
    </div>

</template>

<script setup lang="ts">
const error = ref<string | null>(null)

async function submitForm() {
    error.value = null
    if (!form.username) {
        error.value = "Username needed"
        return
    }

    if (!form.password) {
        error.value = "Username password"
        return
    }

    const result = await $fetch.raw('/api/auth/register', {
        method: 'POST',
        body: {
            username: form.username,
            password: form.password
        }
    })

    if (!result.ok) {
        error.value = 'Something wrong with username and password'
        return
    }

    error.value = 'Success, you can login'
}

const form = reactive({
    username: '',
    password: ''
})
</script>

<style scoped>
@import "tailwindcss";

input,
button {
    @apply bg-neutral-700 border border-neutral-500 p-2 rounded-full;
}
</style>