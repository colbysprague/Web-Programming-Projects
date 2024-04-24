<script>
    export let data;

    import { currentUser, pb } from "../../../lib/pocketbase";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { markdownToHtml } from "../../../lib/index";

    // do not edit by default
    let editing = false;

    // show options by default and hide while editing a file
    let showOptions = true;
    $: showOptions = !editing;

    // load and render md -> HTML
    let markdownView;
    $: markdownView = markdownToHtml(data.page.md);

    // save changes to a page
    async function saveChanges() {
        const changes = {
            title: data.page.title,
            md: data.page.md,
            author:
                $currentUser === undefined
                    ? "Anonymous"
                    : $currentUser.username,
        };

        // update record
        const record = await pb
            .collection("pages")
            .update(data.page.id, changes);

        // stop editing
        editing = false;
    }

    // delete page after confirmation from user
    async function deletePage() {
        const response = confirm("Are you sure you want to delete this page?");
        if (response) {
            await pb.collection("pages").delete(data.page.id);
            goto("../");
        } else {
            console.log("Not deleting");
        }
    }

    // copy URL to clipboard and show confirmation
    function copyToClipboard() {
        navigator.clipboard
            .writeText($page.url)
            .then(() => {
                alert("Link copied to clipboard");
            })
            .catch((err) => {
                console.error("Error copying text: ", err);
            });
    }
</script>

<svelte:head>
    <title>{data.page.title}</title>
</svelte:head>
<div
    class="block max-w-full min-h-full p-6 bg-white border border-gray-200 flex flex-col"
>
    {#if showOptions}
        <div class="w-full flex">
            <button
                type="button"
                on:click={() => goto("../")}
                class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >Go Back</button
            >
            <button
                type="button"
                on:click={copyToClipboard}
                class="text-white mr-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >Copy Link</button
            >
            <button
                type="button"
                on:click={() => (editing = true)}
                class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >Edit</button
            >
            <button
                type="button"
                on:click={deletePage}
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >Delete Page</button
            >
        </div>
    {/if}

    {#if editing}
        <h1 class="text-2xl font-bold">Edit Page</h1>
        <form class="max-w-full my-10 mx-10" on:submit|preventDefault>
            <div class="mb-5">
                <label
                    for="base-input"
                    class="block mb-2 text-lg font-medium text-gray-900"
                    >Title</label
                >
                <input
                    type="text"
                    bind:value={data.page.title}
                    id="base-input"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div class="mb-5">
                <label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Content</label
                >
                <textarea
                    type="text"
                    id="large-input"
                    bind:value={data.page.md}
                    class="block w-full min-h-64 h-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                on:click={saveChanges}>Save</button
            >
            <button
                class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                on:click={() => (editing = false)}>Cancel</button
            >
        </form>
    {:else}
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-5">
            {data.page.title}
        </h5>

        {@html markdownView}

        <div class="mt-auto flex">
            <div>
                <p class="text-slate-400 text-sm">
                    Created: {data.page.created}
                </p>
                <p class="text-slate-400 text-sm">
                    Last Updated: {data.page.updated}
                </p>
                <p class="text-slate-400 text-sm">
                    Author: {data.page.author.length === 0
                        ? "Anonymous"
                        : data.page.author}
                </p>
            </div>
        </div>
    {/if}
</div>
