<script>
	/**
	 * @typedef {object} Props
	 * @property {string} [to]
	 * @property {(e: MouseEvent) => void} [onClick]
	 * @property {boolean} [disabled]
	 * @property {import('svelte').Snippet} children
	 * @property {'standard'} [theme]
	 * @property {'standard'} [size]
	 */

	/** @type {Props} */
	let { to, onClick, disabled, children, theme = 'standard', size = 'standard' } = $props();

	let attrs = $derived(
		to && to.startsWith('http')
			? {
					target: '_blank'
				}
			: {}
	);
</script>

{#snippet inner()}
	<span class="inner">{@render children()}</span>
{/snippet}

{#if to}
	<a class={`btn theme-${theme} size-${size}`} class:disabled href={to} {...attrs} onclick={onClick}
		>{@render inner()}</a
	>
{:else}
	<button class={`btn theme-${theme} btn-reset`} class:disabled {disabled} onclick={onClick}
		>{@render inner()}</button
	>
{/if}

<style lang="scss">
	.btn {
		position: relative;

		display: inline-flex;

		text-decoration: none;

		justify-content: var(--btn-justify, center);

		color: var(--btn-fg);
		border: var(--btn-border);
		background-color: var(--btn-bg);

		font-family: var(--font-family-sans-serif);

		@include hover {
			color: var(--btn-active-fg);
			background-color: var(--btn-active-bg);
		}

		&:not(.disabled) {
			cursor: pointer;
		}
	}

	.inner {
		display: block;

		padding: var(--btn-padding, 1em 1.5em);
	}

	.size-standard {
	}

	.theme-standard {
		--btn-fg: white;
		--btn-bg: black;

		--btn-active-bg: white;
		--btn-active-fg: black;
	}
</style>
