<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { Movie } from '$lib/db/movie';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import { API_URL, fetchMovies } from '$lib/utils';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { PageServerData } from './$types';

	let movies: Movie[] = [];
	let admin: boolean = false;
	let dismiss = true;
	let variant: 'book' | 'movie' = 'movie';
	let page_title: string;

	export let data: PageServerData;
	movies = data.movies;
	admin = data.admin;
	variant = data.variant;
	page_title = data.page_title;

	let link: HTMLLinkElement | null;

	onMount(() => {
		let lastRefresh = new Date();
		setInterval(async () => {
			const res = await fetch(`${API_URL}/movie/lastupdate`);
			if (!res.body) return;

			let data = await res.json();
			let lastUpdate = new Date(data.lastupdate);

			if (lastRefresh >= lastUpdate) return;

			movies = await fetchMovies();
			lastRefresh = lastUpdate;
		}, 500);
	});
</script>

<div
	class="h-full w-full"
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
	<NavBar bind:movies bind:variant bind:page_title />
	<MovieList bind:movies bind:admin bind:variant />
	<LoginModal bind:movies bind:admin />
	<MovieOfTheWeek bind:movies bind:dismiss bind:admin />
</div>

<style>
</style>
