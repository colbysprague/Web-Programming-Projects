
import { pb } from '../../../lib/pocketbase';

export const load = async ({ params }) => {
    const listing = await pb.collection('listings').getOne(params.id);
    const bids = await pb.collection('bids').getFullList({
        filter: `bidOn="${listing.id}"`,
        sort: '-amount',
        expand: "bidder"
    });

    return {
        listing: listing,
        bids: bids
    };
};
