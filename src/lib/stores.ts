import { writable } from 'svelte/store';

export const MoviesStore = writable([]);
export const AdminStore = writable(false);