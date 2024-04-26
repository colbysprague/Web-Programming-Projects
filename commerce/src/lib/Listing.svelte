<script>
    export let listing;
    console.log(listing);
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
            <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                >Active</span
            >
            <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-blue-800"
                >{listing.created}</span
            >
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white"
                >${listing.highestBid}</span
            >
            <a
                href={`./listing/${listing.id}`}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >View</a
            >
        </div>
    </div>
</div>
