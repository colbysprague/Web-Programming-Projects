<script>
    import { pb } from "../lib/pocketbase";
    import { goto } from "$app/navigation";

    async function gotoRandom() {
        const pages = await pb.collection("pages").getList(1, 50);

        const pageIds = pages.items.map((page) => page.id);

        const randomPageId =
            pageIds[Math.floor(Math.random() * pageIds.length)];

        goto(`/page/${randomPageId}`);
    }
</script>

<div class="h-screen w-full flex items-center justify-center">
    <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        on:click={gotoRandom}>Go to Random Page</button
    >
</div>
