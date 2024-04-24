<script>
    import Sidebar from "../lib/Sidebar.svelte";
</script>

<div class="flex">
    <Sidebar />
    <div class="w-full">
        <slot />
    </div>
</div>
