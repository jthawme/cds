<script>
	import BarcodeScan from '$lib/components/BarcodeScan.svelte';
	import { addToast } from '$lib/components/Toast/Manager.svelte';
	import { api } from '$lib/js/api';
	import { INFO_TYPE_USER } from '$lib/js/constants';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	let busy = $state(false);
	let barcode = $state('');

	/** @type {null | {title: string, resource_id: string, type: 'user' | 'discogs' | 'musicbrainz'}} */
	let temporaryRelease = $state(null);

	async function submit(e) {
		e.preventDefault();

		const fd = new FormData(e.target);

		busy = true;

		try {
			const { release } = await api.scan.barcode(fd.get('barcode'));

			temporaryRelease = !release
				? {
						title: '',
						resource_id: 'NA',
						type: INFO_TYPE_USER
					}
				: release;

			addToast('Release found');
		} catch (e) {
			console.log(e);
		} finally {
			busy = false;
		}
	}

	async function submitRelease(e) {
		e.preventDefault();

		const fd = new FormData(e.target);
		const data = Object.fromEntries(fd.entries());

		busy = true;

		try {
			const { error, message = 'Unknown', success } = await api.release.add(data);

			if (error) {
				addToast(message, { type: 'error' });
			} else {
				addToast('Release added', { type: 'success' });
				clear();
			}
		} catch (e) {
			console.log(e);
		} finally {
			busy = false;
		}
	}

	function clear() {
		barcode = '';
		temporaryRelease = null;
	}

	function onBarcodeDetect(code) {
		if (!temporaryRelease && !barcode) {
			barcode = code;
		}
	}
</script>

<BarcodeScan onDetect={onBarcodeDetect} />

{#if temporaryRelease}
	<form onsubmit={submitRelease}>
		<input type="hidden" name="resource_id" value={temporaryRelease.resource_id} />

		<label>
			<span>Title</span>
			<input disabled={busy} type="text" name="title" value={temporaryRelease.title} />
		</label>

		<label>
			<span>Type</span>
			<input readonly type="text" name="type" value={temporaryRelease.type} />
		</label>

		<button disabled={busy}>Submit</button>
		<button type="button" onclick={clear}>Clear</button>
	</form>
{/if}

<form onsubmit={submit}>
	<label>
		<span>Barcode</span>
		<input bind:value={barcode} disabled={busy || temporaryRelease} type="text" name="barcode" />
	</label>

	<button disabled={busy || temporaryRelease}>Submit</button>
	<button type="reset">Clear</button>
</form>

<style lang="scss">
	form {
		padding: 1em;
		border-radius: 0.5em;
		border: 1px solid black;

		margin: 1em;
	}

	form,
	label {
		display: flex;

		flex-direction: column;
		align-items: flex-start;
		gap: 0.5em;
	}
</style>
