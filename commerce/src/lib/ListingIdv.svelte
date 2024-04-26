<script>
    import { afterUpdate, tick } from "svelte";
    import { pb, currentUser } from "../lib/pocketbase";

    export let listing;
    console.log(listing);
    export let bids;

    let element;

    afterUpdate(() => {
        if (bids) scrollToBottom(element);
    });

    $: if (bids && element) {
        console.log("tick");
        scrollToBottom(element);
    }

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };

    let bidAmount = listing.highestBid;

    $: console.log(bidAmount);

    async function placeBid() {
        // create bid
        const bidData = {
            bidder: $currentUser.id,
            amount: bidAmount,
            bidOn: listing.id,
        };
        const newBid = await pb.collection("bids").create(bidData);
        console.log(newBid);
        // once bid is created we need to update highest bid on the listing record
        const updatedListing = await pb
            .collection("listings")
            .update(listing.id, {
                highestBid: newBid.amount,
            });
    }
</script>

<div
    class="w-full max-w-lg mt-5 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
    {bidAmount < listing.highestBid}
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
            <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                >Active</span
            >
            <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-blue-800"
                >{listing.created}</span
            >
        </div>
        <div class="text-white my-5">
            <h2
                class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
                Bids
            </h2>
            <ul
                bind:this={element}
                class="max-w-md overflow-auto h-24 scroll-snap-y-container space-y-1 text-gray-500 list-inside dark:text-gray-400"
            >
                {#each bids.slice().reverse() as bid}
                    <li>
                        <span
                            class="font-semibold text-gray-900 dark:text-white"
                        ></span>
                        bids
                        <span
                            class="font-semibold text-gray-900 dark:text-white"
                            >${bid.amount}</span
                        >
                        @ {bid.created}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
                ${listing.highestBid}
                <span class="text-sm font-thin"> Current Bid</span></span
            >
        </div>

        <form on:submit|preventDefault>
            <div class="flex justify-start space-x-2 mt-1">
                <input
                    bind:value={bidAmount}
                    min={listing.highestBid}
                    type="number"
                    id="number-input"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={listing.highestBid + 1}
                    required
                />

                <button
                    on:click={placeBid}
                    disabled={bidAmount < listing.highestBid}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Place Bid</button
                >
            </div>
        </form>
    </div>
</div>
