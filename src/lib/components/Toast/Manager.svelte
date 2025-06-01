<script module>
	/** @type {{id: string, type: 'general' | 'success' | 'error', message: string, time: number}[]} */
	let items = $state([]);

	/**
	 *
	 * @param {string} message
	 * @param {{type?: 'general' | 'success' | 'error', time?: number}} [opts]
	 */
	export function addToast(message, { type = 'general', time = 2500 } = {}) {
		const id = Date.now().toString();

		items.push({
			id,
			message,
			type,
			time
		});

		return () => clearToast(id);
	}

	/**
	 *
	 * @param {string} id
	 */
	function clearToast(id) {
		const i = items.slice();

		i.splice(
			i.findIndex((item) => item.id === id),
			1
		);

		items = i;
	}
</script>

<script>
	import Item from './Item.svelte';
</script>

<div>
	{#each items as item}
		<Item {...item} onClear={clearToast} />
	{/each}
</div>

<style lang="scss">
	div {
		position: fixed;

		top: 0;
		left: 50%;

		transform: translateX(-50%);

		z-index: 10;

		padding: 0.5em;

		display: flex;

		flex-direction: column;
		gap: 0.5em;
	}
</style>
