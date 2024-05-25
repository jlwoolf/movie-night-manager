<script lang="ts">
	import { Icon, PlusCircle } from 'svelte-hero-icons';
	import SearchBar from './SearchBar.svelte';
	import AddModal from './AddModal.svelte';
	import type { MovieType } from '$lib/db/movie';

	export let movies: MovieType[];

	let addButtonOnClick = (e: MouseEvent) => {
		let modal = <HTMLDialogElement>document.getElementById('add_modal');
		modal.showModal();
	};
</script>

<div class="fixed top-0 navbar bg-base-200 px-2 z-[1] w-screen">
	<div class="flex-1 gap-2">
		<SearchBar bind:movies/>
	</div>
	<!-- <span class="flex-1">
		Movie Night
	</span> -->
	<div class="flex-none">
		<button class="btn btn-primary tooltip-left h-12 w-12 justify-end border-0 tooltip mr-4" on:click={addButtonOnClick} data-tip="Add Movie">
			<Icon src={PlusCircle} />
		</button>
	</div>
</div>
<AddModal id="add_modal" bind:movies />

<style>
</style>
