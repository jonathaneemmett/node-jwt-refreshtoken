<script lang="ts">
	import axios from "$lib/api/axios";   
    import userStore from "$lib/store/Store";
    import { goto } from "$app/navigation";

    $: user = $userStore; // AutoSubscribing

    async function logout(e: Event) {
        e.preventDefault();

        await axios.post('/users/logout', {
            withCredentials: true,
        });

        userStore.set({
            _id: '',
            email: '',
            role: '',
            token: '',
        })

        goto('/login');
    }

</script>

<nav class="navbar">
    <ul>
        <li><a href="/">Home</a></li>
        
        {#if user?.email}
            {#if user?.role === "admin"}
                <li><a href="/admin">Admin</a></li>
            {/if}
            <li><a href="/profile">Profile</a></li>
            <li><button on:click={logout}>Logout</button></li>
        {:else}
            <li><a href="/login">Login</a></li>
        {/if}
    </ul>
</nav>

<style>
    /* Navbar */

    .navbar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        padding: 1rem 1rem;
    }

    .navbar ul {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
    }

    .navbar ul li a {
        font-size: 1.1rem;
    }

    .navbar button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.1rem;
        color: var(--primary-text-color);
    }

    .navbar button:hover {
        color: var(--secondary-text-color);
    }
</style>