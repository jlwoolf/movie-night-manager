<script lang="ts">
	import type { MovieType } from '$lib/db/movie';

	$: value = '';
	$: filteredMovies = movies.filter((movie) => {
		return movie.title.toLowerCase().includes(value);
	});

	export let movies: MovieType[];

	let onClickGenerator = (movie: MovieType) => {
		return (e: MouseEvent) => {
			if (e.target == null) return;

			const el = document.getElementById(`ml-${movie.id}`);
			el?.scrollIntoView({
				behavior: 'smooth'
			});

			const activeElement = <HTMLInputElement>document.activeElement;
			if (activeElement) activeElement.blur();
		};
	};

	let onSubmit = (e: KeyboardEvent) => {
		if (e.code != 'Enter') {
			return;
		}

		let movie = filteredMovies[0];
		if (movie ?? false) {
			console.log(movie);
			const el = document.getElementById(`ml-${movie.id}`);
			el?.scrollIntoView({
				behavior: 'smooth'
			});
		}
	};
</script>

<div class="dropdown w-[300px]">
	<input
		type="text"
		placeholder="Search"
		class="input input-bordered w-full"
		bind:value
		on:keypress={onSubmit}
	/>
	<ul
		class="dropdown-content z-[1] min-w-full flex-nowrap overflow-hidden text-nowrap rounded-b-box bg-base-100 py-2 shadow"
	>
		{#each filteredMovies as movie}
			<li class="px-2">
				<button on:click={onClickGenerator(movie)} class="w-full text-left">
					{movie.title}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
