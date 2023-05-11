<script lang="ts">
    import {page} from "$app/stores";
    import userStore from "$lib/store/Store";

    $: user = $userStore; // AutoSubscribing
    $: $page, console.log($page, "Location: ", window.location.pathname);
    
</script>

<section>
    <h3>Profile Screen</h3>
    <p>Username: {user.email}</p>  
</section>

<style></style>