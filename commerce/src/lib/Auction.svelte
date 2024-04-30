<!-- 
    TODO

    [x] 1. Update winner to bidder w/ highest bid on auction close
    [] 2. Add watchlist button (w/ counter?)
 -->

<script>
    import { afterUpdate, onMount } from "svelte";
    import { pb, currentUser } from "./pocketbase";
    import Timer from "./Timer.svelte";

    export let listing;
    export let bids;
    export let watching;

    // scroll behavior for bids
    let element;
    afterUpdate(() => {
        if (bids) scrollToBottom(element);
    });
    $: if (bids && element) {
        scrollToBottom(element);
    }
    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };

    // place bid
    let bidAmount = listing.highestBid;
    async function placeBid() {
        // create bid
        const bidData = {
            bidder: $currentUser.id,
            amount: bidAmount,
            bidOn: listing.id,
        };
        const newBid = await pb.collection("bids").create(bidData);
        // once bid is created we need to update highest bid on the listing record
        const updatedListing = await pb
            .collection("listings")
            .update(listing.id, {
                highestBid: newBid.id,
                highestBidAmt: newBid.amount,
            });
    }

    // close auction
    async function closeAuction(msg) {
        console.log("closing Auction");
        if (!listing.closed) {
            // get highest bid information
            const highestBid = await pb
                .collection("bids")
                .getOne(listing.highestBid);

            console.log("Highest Bidder is", highestBid);

            // record winner
            const auction = await pb.collection("listings").update(listing.id, {
                closed: true,
                winner: highestBid.bidder,
            });
        }
    }

    // watchlist behavior
    async function toggleWatchlist() {
        if (watching) {
            // console.log(watchingRecord);
            // creating watching
            const newWatchRecord = await pb.collection("watches").create({
                watching: listing.id,
                watcher: $currentUser.id,
            });
        } else {
            // removing watching
            const watchingRecord = await pb
                .collection("watches")
                .getList(1, 50, {
                    filter: `watching="${listing.id}" && watcher="${$currentUser?.id}"`,
                });

            const deletedRecord = await pb
                .collection("watches")
                .delete(watchingRecord.items[0].id);
        }
    }
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
        <div class="w-full flex justify-between">
            <h5
                class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
                {listing.title}
            </h5>

            <div>
                <label class="inline-flex cursor-pointer">
                    <input
                        type="checkbox"
                        bind:checked={watching}
                        on:change={toggleWatchlist}
                        class="sr-only peer"
                    />
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span
                        class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Watching</span
                    >
                </label>
            </div>
        </div>

        <div class="flex items-center mt-2.5 mb-5 space-x-2">
            {#if !listing.closed}
                <Timer endsAt={listing.endsAt} on:closeAuction={closeAuction} />
            {:else}
                <span
                    class="bg-red-100 text-red-800 text-s font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-slate-900"
                >
                    Auction has ended</span
                >
            {/if}
        </div>

        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Seller
        </h2>
        <div class="flex items-center gap-4">
            <img
                class="w-10 h-10 rounded-full"
                src="https://lh3.googleusercontent.com/a/ACg8ocK8_M6Ro2sHozr2zSg0u3ryaPNG6UGgmd6-SaX88t6pstS3bkI=s288-c-no"
                alt=""
            />
            <div class="font-medium dark:text-white">
                <!-- <div>{listing.expand.seller.username}</div> -->
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Joined in 2024
                </div>
            </div>
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
                            >{bid?.expand?.bidder?.username}</span
                        >
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
        {#if listing.closed}
            <div class="flex items-center justify-between">
                {#if listing.winner === $currentUser.id}
                    <span
                        class="bg-blue-100 text-blue-800 text-s font-semibold px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-blue-800"
                        >You won this auction</span
                    >
                {/if}
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                    ${listing.highestBidAmt}
                </span>
            </div>
        {:else}
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                    ${listing.highestBidAmt}
                    <span class="text-sm font-thin"> Current Bid</span></span
                >
            </div>

            <form on:submit|preventDefault>
                <div class="flex justify-start space-x-2 mt-1">
                    <input
                        bind:value={bidAmount}
                        min={listing.highestBidAmt}
                        type="number"
                        id="number-input"
                        aria-describedby="helper-text-explanation"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={listing.highestBidAmt + 1}
                        required
                    />

                    <button
                        on:click={placeBid}
                        disabled={bidAmount <= listing.highestBidAmt}
                        class={`${bidAmount <= listing.highestBidAmt ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"} font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white`}
                        >Place Bid</button
                    >
                </div>
            </form>
        {/if}
    </div>
</div>
