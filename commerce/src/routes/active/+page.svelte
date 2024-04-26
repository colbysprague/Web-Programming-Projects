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
        <!-- <div
            class="w-full max-w-lg mt-10 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <a href="#">
                <img
                    class="p-8 rounded-t-lg"
                    src={`http://127.0.0.1:8090/api/files/listings/${listing.id}/${listing.thumbnail}`}
                    alt="product "
                />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                    >
                        {listing.title}
                    </h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <span
                        class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                        >Active</span
                    >
                </div>
                <div class="flex items-center justify-between">
                    <span
                        class="text-3xl font-bold text-gray-900 dark:text-white"
                        >$599</span
                    >
                    <a
                        href="#"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Place Bid</a
                    >
                </div>
            </div>
        </div> -->
    {/each}
</div>
