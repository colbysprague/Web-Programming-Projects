<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    $: if (count <= 0) {
        // console.log(count);
        dispatch("closeAuction", true);
    }

    export let endsAt;
    let now;

    let endTime = new Date(endsAt.toLocaleString());

    let interval = setInterval(updateTimer, 1000);

    let active = true;

    function updateTimer() {
        const nowUniversal = new Date();
        now = new Date(nowUniversal.toLocaleString());
    }

    $: count = Math.round((endTime - now) / 1000);
    $: h = Math.floor(count / 3600);
    $: m = Math.floor((count - h * 3600) / 60);
    $: s = count - h * 3600 - m * 60;
</script>

{#if count < 0}
    <span
        class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-slate-900"
    >
        Auction has ended</span
    >{:else}
    <span
        class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-blue-800"
    >
        {#if !count}
            Loading...
        {:else}
            {`${h} hours ${m} minutes ${s} seconds remaining`}
        {/if}
    </span>
{/if}
