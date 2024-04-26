<script>
    import { currentUser, pb } from "../../lib/pocketbase";
    import { goto } from "$app/navigation";

    let title = "";
    let file;
    let category;

    let previewURL = "";

    async function previewImage(e) {
        console.log("running");
        file = e.target.files[0];
        previewURL = URL.createObjectURL(file);
    }

    async function createListing() {
        console.log("calling createListing");
        const data = {
            title: title,
            thumbnail: file,
            category: category,
            seller: $currentUser.id,
        };

        const record = await pb.collection("listings").create(data);
    }
</script>

<div class="w-full flex justify-center">
    <!-- {title}
    {imageFile}
    {category} -->

    <div
        class=" m-10 w-[1/2] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            List Item on Marketplace
        </h5>
        <div
            class=" justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
        >
            <form on:submit|preventDefault class="space-y-4 mt-4">
                {#if previewURL}
                    <img src={previewURL} alt="" />
                {/if}
                <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input">Upload file</label
                >
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    on:change={previewImage}
                />

                <p
                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                >
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>

                <div>
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Title</label
                    >
                    <input
                        bind:value={title}
                        type="text"
                        class="bg-gray-50 w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="What are you selling?"
                        required
                    />
                </div>

                <div>
                    <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Select a category</label
                    >
                    <select
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        bind:value={category}
                    >
                        <option selected disabled>Choose a country</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Home">Home</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Kitchen">Kitchen</option>
                    </select>
                </div>
                <br />
                <button
                    on:click={() => createListing()}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >List Item</button
                >
            </form>
        </div>
    </div>
</div>
