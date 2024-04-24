<script>
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let resultsList;
    let pages;
    let query = "";

    // keep track of current page and adjust indicator
    let current;
    $: current = $page.params.id;

    // fetch from pocketbase
    async function getPages() {
        resultsList = await pb.collection("pages").getList(1, 50, {
            sort: "-created",
        });
        pages = resultsList.items;
    }

    // retrieve pages
    onMount(() => {
        getPages();
    });

    // handle changes in search query and filter matches
    $: if (pages !== undefined) {
        if (query.length === 0) {
            pages = resultsList.items;
        }

        pages = pages.filter((result) => {
            return (
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.md.toLowerCase().includes(query.toLowerCase())
            );
        });
    }
</script>

<div class="w-[450px] h-screen bg-white border border-gray-200 shadow sm:p-8">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-2xl font-bold leading-none text-gray-900">
            Recent Pages
        </h5>
    </div>
    <div class="flow-root pt-5 h-full">
        <input
            type="text"
            id="base-input"
            bind:value={query}
            placeholder="Search pages"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0"></div>
                    <div class="flex-1 min-w-0 ms-4">
                        <a
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            href="/page/new">Create New</a
                        >
                    </div>
                </div>
            </li>
            {#if pages}
                {#each pages as page}
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center">
                            {#if current === page.id}
                                <span
                                    class="flex w-3 h-3 me-3 bg-blue-600 rounded-full"
                                ></span>
                            {:else}
                                <span
                                    class="flex w-3 h-3 me-3 bg-slate-200 rounded-full"
                                ></span>
                            {/if}
                            <div class="flex-1 min-w-0 ms-4">
                                <p
                                    class="text-lg font-medium text-gray-900 truncate"
                                >
                                    <a href={`/page/${page.id}`}>{page.title}</a
                                    >
                                </p>
                                <p class="text-sm text-gray-500 truncate">
                                    {page.updated}
                                </p>
                            </div>
                        </div>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</div>
