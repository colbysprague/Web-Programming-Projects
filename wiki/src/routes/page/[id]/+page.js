import { error } from '@sveltejs/kit';
import { pb } from '../../../lib/pocketbase';

export const load = async ({ params }) => {
    const page = await pb.collection('pages').getOne(params.id);

    if (!page) {
        // Throw a 404 error if the page is not found
        error(404, 'Page not found');
    }

    return {
        page
    };
};
