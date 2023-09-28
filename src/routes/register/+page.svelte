<script lang="ts">
	import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 max-w-md mx-auto">

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="post" class="space-y-6">
                {#if form?.invalid}
                    <p class="text-rose-500">Email address and password is required.</p>
                {/if}

                {#if form?.conflict}
                    <p class="text-rose-500">User with this email already exists</p>
                {/if}
            <div>
                <label for="email" class="label">Emaill address</label>

                <div class="mt-2">
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    autocomplete="email" 
                    required 
                    value="asantikuseka@gmail.com" 
                    class="input">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="label">Password</label>

                    <div class="text-sm hidden">
                        <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </div>

                <div class="mt-2">
                    <input type="password" name="password" id="password" autocomplete="current-password" required value="pass1234" class="input">
                </div>
            </div>

            <div>
                <button type="submit" class="button">Sign in</button>
            </div>
        </form>
    </div>
</div>

<style lang="postcss">
    .label {
        @apply block text-sm font-medium leading-6 text-gray-900;
    }
    .input {
        @apply block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6;
    }
    .button {
        @apply flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600;
    }
</style>