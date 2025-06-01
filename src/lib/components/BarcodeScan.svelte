<script>
	import { BarcodeDetector } from 'barcode-detector/ponyfill';
	import { onMount } from 'svelte';
	import { addToast } from './Toast/Manager.svelte';

	let { onDetect } = $props();

	/** @type {BarcodeDetector | null} */
	let detector = $state(null);

	/** @type {HTMLVideoElement | null } */
	let videoEl = $state(null);

	/** @type {MediaStream | null} */
	let videoStream = $state(null);

	async function initCam() {
		try {
			videoStream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: {
						ideal: 'environment'
					},
					width: {
						ideal: 1920
					}
				}
			});
		} catch (e) {
			addToast(e.message ?? e.toString, {
				type: 'error',
				time: 10000
			});
		}
	}

	function initDetector() {
		detector = new BarcodeDetector({
			formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e']
		});
	}

	function periodicDetections(time = 2000) {
		const scan = async () => {
			try {
				const canvas = new OffscreenCanvas(videoEl?.videoWidth, videoEl?.videoHeight);
				const ctx = canvas.getContext('2d');
				ctx?.drawImage(videoEl, 0, 0);

				const barcodes = await detector.detect(canvas);

				if (barcodes.length) {
					onDetect(barcodes[0].rawValue);
				}
			} catch (e) {
				console.log(e);
			}

			timerId = setTimeout(() => {
				scan();
			}, time);
		};

		let timerId = setTimeout(() => {
			scan();
		}, time);

		return () => clearTimeout(timerId);
	}

	$effect(() => {
		if (videoStream && videoEl) {
			videoEl.srcObject = videoStream;

			return () => {
				videoStream?.getTracks().forEach((track) => track.stop());
			};
		}
	});

	$effect(() => {
		if (detector && videoStream && videoEl) {
			return periodicDetections();
		}
	});

	onMount(() => {
		initCam();
		initDetector();
	});
</script>

<video bind:this={videoEl} playsinline autoplay muted></video>

<style lang="scss">
	video {
		max-width: 100%;

		aspect-ratio: 16/9;
		object-fit: cover;
	}
</style>
