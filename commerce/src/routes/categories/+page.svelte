<script>
    import { onMount, onDestroy } from "svelte";
    import { pb } from "../../lib/pocketbase";
    import Listing from "../../lib/Listing.svelte";

    export let data;
    let listings = data.listings.items;

    let categories = [];
    listings.forEach((obj) => {
        if (!categories.includes(obj.category)) {
            categories.push(obj.category);
        }
    });

    let activeCategory = "All";
    let filteredListings = listings;
    $: {
        filteredListings =
            activeCategory === "All"
                ? listings
                : listings.filter((obj) => obj.category === activeCategory);
    }

    onMount(async () => {
        pb.collection("listings").subscribe(
            "*",
            async ({ action, record }) => {
                console.log(action, record);

                if (action === "create") {
                    listings = [record, ...listings];
                }

                // on update event
                if (action === "update") {
                    // replace changed document with new data
                    console.log(record);
                    listings[getListingIdxById(record.id)] = record;
                }

                // if deleted
                if (action === "delete") {
                    listings = listings.filter(
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

<div class="flex no-wrap mx-5 py-2 overflow-x-scroll">
    <button
        on:click={() => (activeCategory = "All")}
        type="button"
        class={activeCategory === "All"
            ? "text-gray-900 bg-white border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:bg-blue-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"}
        >All</button
    >
    {#each categories as category}
        <button
            on:click={() => (activeCategory = category)}
            type="button"
            class={activeCategory === category
                ? "text-gray-900 bg-white border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:bg-blue-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"}
            >{category}</button
        >
    {/each}
</div>

<div class="overflow-scroll h-screen pb-[200px]">
    {#each filteredListings as listing}
        <Listing {listing} />
    {/each}
</div>
