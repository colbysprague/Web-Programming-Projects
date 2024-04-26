import { error } from '@sveltejs/kit';
import { pb } from '../../lib/pocketbase';

export const load = async () => {
    const listings = await pb.collection('listings').getList(1, 50, {
        sort: '-created',
        expand: "bids_via_bidOn,seller"
    });

    return {
        listings
    };
};
