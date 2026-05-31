<template>
    <nav class="p-4 flex justify-between bg-neutral-800" :key="refreshKey">
        <NuxtLink to="/">Home</NuxtLink>

        <TransitionGroup tag="ul" class="inline-flex gap-4" name="fade-nav">

            <li>
                <NuxtLink to="/about">About</NuxtLink>
            </li>

            <div v-if="!user" class="inline-flex gap-4" key="guest">
                <li>
                    <NuxtLink to="/register">Register</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>

            </div>
            <div v-else class="inline-flex gap-4" key="user">
                <div class="hover:bg-gray-500 cursor-pointer" @click="logout">
                    Log out
                </div>
                {{ user.username }}
            </div>

        </TransitionGroup>
    </nav>
</template>

<script setup lang="ts">

const refreshKey = useState<number>("navbarRefreshKey", () => 0)

const { data: user } = await useAsyncData('navbar-user', verifyAuthentication, {
    watch: [refreshKey]
})

async function logout() {
    useCookie('jwt_token').value = undefined
    refreshKey.value++
}

async function verifyAuthentication() {
    const token = useCookie('jwt_token')

    if (!token) {
        return
    }

    const result = await $fetch('/api/auth/verifytoken', {
        method: 'POST',
        body: { token: token.value }
    })

    if (!result.success) {
        return
    }

    return result.user as JwtUserInfo
}

</script>

<style>
.fade-nav-enter-active,
.fade-nav-leave-active {
    transition: all 0, 1s ease;
}

.fade-nav-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-nav-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.fade-nav-leave-active {
    position: absolute;
    right: 1rem;
}
</style>