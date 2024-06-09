<script lang="ts">
	import '../app.css';
	import { fly } from 'svelte/transition';
	import NavBar from '$lib/components/NavBar.svelte';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';
	import type { MovieType } from '$lib/db/movie';

	let movies: MovieType[] = [];
	let admin = false;
	let dismiss = true;
	export let data;
	movies = data.movies;
	admin = data.admin;
</script>

<div class="h-full min-h-screen w-full overflow-hidden">
	<NavBar bind:movies />
	{#key data.url}
		<div in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
			<slot {data}></slot>
		</div>
	{/key}
	<MovieOfTheWeek bind:movies bind:dismiss bind:admin />
</div>

<style>
</style>
