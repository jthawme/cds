<script>
	import { fade, slide } from 'svelte/transition';

	let { id, type, time = 2500, message, onClear } = $props();

	$effect(() => {
		const timerId = setTimeout(() => {
			onClear(id);
		}, time);

		return () => clearTimeout(timerId);
	});
</script>

<div in:slide={{ duration: 500 }} out:fade={{ duration: 250 }} class={type}>
	{message}
</div>

<style lang="scss">
	div {
		padding: 0.5em 1em;

		border-radius: 0.5em;
	}

	.general {
		background-color: #e5e5e5;
		color: #111;
	}

	.success {
		background-color: #e8ffe1;
		color: #6bcd7b;
	}

	.error {
		background-color: #ffe1e1;
		color: #c64f4f;
	}
</style>
