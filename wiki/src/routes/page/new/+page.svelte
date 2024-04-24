<script>
    import { pb } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { currentUser } from "../../../lib/pocketbase";

    let title = "";
    let content = "";

    async function createPage() {
        console.log("click");

        // example create data
        const data = {
            title: title,
            md: content,
            author:
                currentUser === undefined ? "Anonymous" : $currentUser.username,
        };

        const record = await pb.collection("pages").create(data);

        goto(`/page/${record.id}`);
    }
</script>

<form class="max-w-full my-10 mx-10" on:submit|preventDefault>
    <h2 class="text-2xl font-bold mb-5">Create New Page</h2>
    <div class="mb-5">
        <label
            for="base-input"
            class="block mb-2 text-lg font-medium text-gray-900">Title</label
        >
        <input
            type="text"
            id="base-input"
            bind:value={title}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
    </div>
    <div class="mb-5">
        <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-gray-900">Content</label
        >
        <textarea
            type="text"
            id="large-input"
            bind:value={content}
            class="block w-full min-h-64 h-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
    <a
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        href="/page/new"
        on:click={createPage}>Create</a
    >
</form>
