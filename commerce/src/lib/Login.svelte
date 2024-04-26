<script>
    import { currentUser, pb } from "./pocketbase.js";
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";

    async function login() {
        await pb.collection("users").authWithPassword(email, password);
    }

    async function handleSignUp() {
        try {
            const data = {
                email: email,
                password,
                passwordConfirm: password,
            };

            const createdUser = await pb.collection("users").create(data);
            await login();

            goto("./active");
            alert("Running");
        } catch (err) {
            alert("Error: ", err);
        }
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>

<!-- <form on:submit|preventDefault>
        <input type="text" bind:value={email} placeholder="email" />
        <input type="password" bind:value={password} placeholder="Password" />

        <button on:click={login}>Login</button>
        <button on:click={handleSignUp}>Sign Up</button>
    </form> -->

<div
    class="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
    {#if !$currentUser}
        <h2 class="font-bold text-xl">Login or Sign Up</h2>
        <form class="max-w-sm mx-auto" on:submit|preventDefault>
            <div class="mb-5">
                <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Email</label
                >
                <input
                    bind:value={email}
                    type="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                />
            </div>
            <div class="mb-5">
                <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Password</label
                >
                <input
                    bind:value={password}
                    type="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <div class="flex justify-center gap-x-4">
                <button
                    on:click={login}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Login</button
                >
                <button
                    on:click={handleSignUp}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Sign Up</button
                >
            </div>
        </form>
    {:else}
        <div class="flex-col">
            <p class="text-white pb-4">Logged in as {$currentUser.email}</p>
            <button
                on:click={signOut}
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Log Out</button
            >
        </div>
    {/if}
</div>
