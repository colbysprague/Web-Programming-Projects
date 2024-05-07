<script>
    import { onMount, onDestroy } from "svelte";
    import { pb } from "../lib/pocketbase";
    import Timer from "./Timer.svelte";
    export let listing;

    onMount(async () => {
        pb.collection("listings").subscribe(
            listing.id,
            async ({ action, record }) => {
                console.log(action, record);

                // on update event
                if (action === "update") {
                    // replace changed document with new data
                    listing = record;
                }

                // if deleted
                if (action === "delete") {
                    goto("../active");
                }
            },
            { expand: "seller" },
        );
    });

    onDestroy(() => {
        pb.collection("listings").unsubscribe("*"); // remove all '*' topic subscriptions
    });
</script>

<div
    class="w-full max-w-lg mt-5 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
    <a
        href={`http://127.0.0.1:8090/api/files/listings/${listing.id}/${listing.thumbnail}`}
    >
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
        <div class="flex items-center mt-2.5 mb-5 space-x-2">
            <Timer endsAt={listing.endsAt} />
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white"
                >${listing.highestBidAmt}</span
            >
            <a
                href={`./listing/${listing.id}`}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >View</a
            >
        </div>
    </div>
</div>
