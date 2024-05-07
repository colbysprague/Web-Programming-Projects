
import { pb, currentUser } from '../../../lib/pocketbase';
import { get } from 'svelte/store'

export const load = async ({ params }) => {
    const listing = await pb.collection('listings').getOne(params.id);
    const bids = await pb.collection('bids').getFullList({
        filter: `bidOn="${listing.id}"`,
        sort: '-amount',
        expand: "bidder"
    });

    // access userStore in page.js file
    const userInfo = get(currentUser)


    const watchingRecord = await pb.collection('watches').getList(1, 50, {
        filter: `watching="${listing.id}" && watcher="${userInfo?.id}"`
    })


    let watching = false
    if (watchingRecord?.items.length > 0) {
        watching = true
    }

    return {
        listing: listing,
        bids: bids,
        watching: watching
    };
};
