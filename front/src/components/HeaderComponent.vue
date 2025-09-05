<script setup></script>

<template>
    <header>
        <nav>
            <ul class="nav-list">
                <li>
                    <router-link class="link" to="/">Home</router-link>
                    <router-link class="link" to="/exercises">Exercises</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: sticky;
    width: 100vw;
    top: 0;
    background-color: var(--header-main-background);
    padding: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

nav {
    max-width: 1200px;
    margin: 0 auto;
}

.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-list li {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.link {
    text-decoration: none;
    color: white;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 5px;
    transition: background 0.3s ease, transform 0.2s ease;
}

.link:hover {
    background-color: var(--button-hover-primary-background);
    transform: scale(1.05);
}

.router-link-active {
    background-color: var(--button-primary-background);
    color: white;
}
</style>