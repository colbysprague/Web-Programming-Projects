
import { pb, currentUser } from '../../lib/pocketbase';
import { get } from 'svelte/store'

export const load = async ({ params }) => {

    // access userStore in page.js file
    const userInfo = get(currentUser)

    console.log(userInfo?.id)

    const listings = await pb.collection("listings").getList(1, 30, {
        filter: `watches_via_watching.watcher="${userInfo?.id}"`,
        expand: 'watches_via_watching'
    })

    return {
        listings
    };
};
