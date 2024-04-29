<script>
    import Listing from "../../lib/Listing.svelte";
    import { pb } from "../../lib/pocketbase.js";
    import { onMount, onDestroy } from "svelte";

    export let data;
    let activeListings = data.listings.items;

    console.log(activeListings);

    function getListingIdxById(recordId) {
        return activeListings.findIndex((item) => item.id === recordId);
    }

    onMount(async () => {
        pb.collection("listings").subscribe(
            "*",
            async ({ action, record }) => {
                console.log(action, record);

                if (action === "create") {
                    activeListings = [record, ...activeListings];
                }

                // on update event
                if (action === "update") {
                    // replace changed document with new data
                    console.log(record);
                    activeListings[getListingIdxById(record.id)] = record;
                }

                // if deleted
                if (action === "delete") {
                    activeListings = activeListings.filter(
                        (_, i) => i !== getListingIdxById(record.id),
                    );
                }
            },
            { expand: "seller" },
        );
    });

    onDestroy(() => {
        pb.collection("listings").unsubscribe("*"); // remove all '*' topic subscriptions
    });
</script>

<div class="overflow-scroll h-screen pb-[200px]">
    {#each activeListings as listing}
        <Listing {listing} />
    {/each}
</div>
