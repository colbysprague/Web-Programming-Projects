<script>
    import { currentUser, pb } from "./pocketbase.js";

    let username = "";
    let password = "";

    async function login() {
        await pb.collection("users").authWithPassword(username, password);
    }

    async function handleSignUp() {
        try {
            const data = {
                username,
                password,
                passwordConfirm: password,
                name: "hi mom",
            };

            const createdUser = await pb.collection("users").create(data);
            await login();
        } catch (err) {
            console.log("Error: ", err);
        }
    }
</script>

{#if $currentUser}
    {$currentUser.username}
{:else}
    <form on:submit|preventDefault>
        <input type="text" bind:value={username} placeholder="Username" />
        <input type="password" bind:value={password} placeholder="Password" />

        <button on:click={login}>Login</button>
        <button on:click={handleSignUp}>Sign Up</button>
    </form>
{/if}
