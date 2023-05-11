<script lang="ts">
    import {page} from "$app/stores";

    $: user = $page.data.user; // AutoSubscribing
</script>

<section>
    <h3>Profile Screen</h3>
    <p>Username: {user.email}</p>  
</section>

<style></style>