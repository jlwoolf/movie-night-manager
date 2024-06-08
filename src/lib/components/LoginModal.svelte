<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import { API_URL, fetchMovies } from '$lib/utils';

	export let admin: boolean;
	export let movies: MovieType[] = [];
	let value: string = '';
	let error: boolean = false;
	let errorMsg: string = '';
	let input: HTMLInputElement;

	$: inputClass = error ? 'input-bordered input-error placeholder-error' : '';
	$: value && onValueChange();

	let onClick = async (e: MouseEvent) => {
		if (!admin) {
			let modal = <HTMLDialogElement>document.getElementById('login_modal');
			modal.showModal();
		} else {
			const res = await fetch(`${API_URL}/admin`, {
				method: 'POST',
				body: JSON.stringify({
					admin: false
				})
			});

			let data = await res.json();
			admin = data.admin;
			value = '';

			movies = await fetchMovies();
		}

		
	};

	let onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const res = await fetch(`${API_URL}/admin`, {
			method: 'POST',
			body: JSON.stringify({
				admin: true,
				password: value
			})
		});

		if (!res.ok) {
			error = true;
			errorMsg = (await res.json()).message;
			return false;
		}

		let data = await res.json();
		admin = data.admin;
		value = '';
		let modal = <HTMLDialogElement>document.getElementById('login_modal');
		modal.close();

		movies = await fetchMovies();
	};

	let onValueChange = () => {
		if (value) {
			input.type = 'password';
		} else {
			input.type = 'text';
		}
	};
</script>

<div class="flex w-full items-center justify-center p-4">
	<button class="btn w-full max-w-screen-sm" on:click={onClick}>
		{#if admin}
			Logout
		{:else}
			Login
		{/if}
	</button>
</div>

<dialog id="login_modal" class="modal z-[-1]">
	<div class="modal-box overflow-y-visible">
		<form class="flex w-full flex-row gap-2" on:submit={onSubmit}>
			<!-- if there is a button in form, it will close the modal -->
			<input
				type="text"
				placeholder="Password"
				class="input flex-grow {inputClass}"
				bind:value
				bind:this={input}
			/>
			<button class="btn btn-primary justify-end" type="submit">Submit</button>
		</form>

		{#if error}
			<p
				class="error-msg absolute translate-y-2 rounded-md bg-error px-2 text-error-content before:border-transparent before:border-r-error"
			>
				{errorMsg}
			</p>
		{/if}
	</div>

	<form method="dialog" class="modal-backdrop fixed h-full w-full">
		<button
			on:click={() => {
				error = false;
				errorMsg = '';
			}}>close</button
		>
	</form>
</dialog>

<style>
	.error-msg:before {
		content: '\A';
		border-style: solid;
		border-width: 20px 10px 20px 0;
		position: absolute;
		rotate: 90deg;
		translate: 10px -50%;
	}
</style>
