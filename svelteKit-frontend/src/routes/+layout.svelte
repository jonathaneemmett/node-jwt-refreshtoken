<script lang="ts">
    import '$styles/global.css';
	import Navbar from '../lib/components/Navbar.svelte';
</script>

<Navbar />
<main class="container">
    <div class='Title'>
        <h1>SvelteKit Frontend</h1>
    </div>
    <slot />
</main>


<style>

</style>