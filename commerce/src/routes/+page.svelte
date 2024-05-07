<script>
    import { goto } from "$app/navigation";

    function handleButtonClick() {
        console.log("running click");
        goto("/active");
    }
</script>

<div class="w-full flex">
    <button
        on:click={handleButtonClick}
        class="mx-auto mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white"
        >Go to Active Listings</button
    >
</div>
