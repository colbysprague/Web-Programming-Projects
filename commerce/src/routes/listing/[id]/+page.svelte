<script>
    import { onMount, onDestroy } from "svelte";
    import { pb } from "../../../lib/pocketbase";
    import Auction from "../../../lib/Auction.svelte";
    export let data;

    let listing = data.listing;
    let bids = data.bids;
    let active = true;
    console.log(listing.id);

    onMount(async () => {
        pb.collection("listings").subscribe(
            listing.id,
            async ({ action, record }) => {
                // on update event
                if (action === "update") {
                    console.log("listing updated");
                    console.log(record);
                    listing = record;
                }

                // if deleted
                if (action === "delete") {
                    active = false;
                }
            },
            { expand: "seller,highestBid" },
        );
        pb.collection("bids").subscribe(
            "*",
            async ({ action, record }) => {
                // on update event
                if (action === "create") {
                    bids = [record, ...bids];
                }
            },
            { expand: "bidder", filter: `bidOn="${listing.id}"` },
        );
    });

    onDestroy(() => {
        pb.collection("listings").unsubscribe(listing.id); // remove all '*' topic subscriptions
    });
</script>

<Auction {listing} {bids} />
