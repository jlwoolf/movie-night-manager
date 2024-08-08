<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { MovieType } from '$lib/db/movie';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';
	import { API_URL, fetchMovies } from '$lib/utils';
	import { onMount, setContext } from 'svelte';
	import { AdminStore, MoviesStore } from '$lib/stores';
	import { fly } from 'svelte/transition';

	let movies: MovieType[] = [];
	let admin: boolean = false;
	let dismiss = true;

	MoviesStore.subscribe((data) => (movies = data));
	AdminStore.subscribe((data) => (admin = data));

	export let data;
	MoviesStore.set(data.movies);
	AdminStore.set(data.admin);

	onMount(() => {
		console.log($MoviesStore);
		let lastRefresh = new Date();
		setInterval(async () => {
			const res = await fetch(`${API_URL}/movie/lastupdate`);
			if (!res.body) return;

			let data = await res.json();
			let lastUpdate = new Date(data.lastupdate);

			if (lastRefresh >= lastUpdate) return;

			MoviesStore.set(await fetchMovies());
			lastRefresh = lastUpdate;
		}, 500);
	});

	$: x = data.url.match(/reviews/g) ? -200 : 200;

</script>

<div class="overflow-hidden w-full h-full min-h-screen"
	on:click={(e) => {
		if (dismiss == false) dismiss = true;
	}}
	on:keypress={(e) => {}}
	on:keydown={(e) => {
		if (e.key == ' ' || e.key == '\n') {
			if (dismiss == false) dismiss = true;
		}
	}}
	on:keyup={(e) => {}}
	role="tab"
	tabindex="-1"
>
	<NavBar />
	{#key data.url}
		<div in:fly={{ x: -1*x, delay: 300, duration: 300 }} out:fly={{ x: x, duration: 300 }}>
			<slot></slot>
		</div>
	{/key}

	<MovieOfTheWeek bind:dismiss />
</div>
