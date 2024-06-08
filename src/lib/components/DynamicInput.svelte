<script lang="ts">
	import { onMount } from 'svelte';

	let input: HTMLInputElement;
	export let value: string;

	$: value && onValueChangePrivate();

	onMount(() => {
		onValueChangePrivate();
	});

	let onValueChangePrivate = () => {
		if (!input) return;

		let width = `${(value.length == 0 ? 1 : value.length) * 8}px`;
		input.style.setProperty('width', width);

		onValueChange(value, input);
	};

	let onFocusoutPrivate = async (e: FocusEvent) => {
		value = await onFocusout(e);
		onValueChangePrivate();
	};

	export let onValueChange = (value: string, input: HTMLInputElement) => {};

	export let onFocusout = (e: FocusEvent): Promise<string> | string => {
		return value;
	};
</script>

<div class="input h-auto rounded-md p-2">
	<input
		class="w-0 border-none bg-transparent p-0 text-sm outline-none"
		bind:value
		bind:this={input}
		on:keyup={onValueChangePrivate}
		on:focusout={onFocusoutPrivate}
	/>
</div>

<style>
</style>
