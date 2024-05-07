<script>
    import Listing from "../../lib/Listing.svelte";
    export let data;

    let listings = data.listings.items;
    // console.log(data.listings);
</script>

<div class="overflow-scroll h-screen pb-[200px]">
    {#each listings as listing}
        <Listing {listing} />
    {/each}
</div>
