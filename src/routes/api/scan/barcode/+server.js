import { searchReleaseByBarcode as barcodeMB } from '$lib/js/musicbrainz';
import { searchReleaseByBarcode as barcodeDiscogs } from '$lib/js/discogs';
import { json } from '@sveltejs/kit';
import { INFO_TYPE_DISCOGS, INFO_TYPE_MUSICBRAINZ } from '$lib/js/constants';

const VARIOUS_ARTIST_TITLE = 'Various';

/**
 *
 * @param {{count: number, results: object[]}} mbResult
 * @param {{pagination: {items: number}, releases: object[]}} discogsResult
 * @returns {{resource_id: string, title: string, type: 'discogs' | 'musicbrainz'} | null}
 */
const getRelease = (mbResult, discogsResult) => {
	if (mbResult.count === 0 && discogsResult.pagination.items === 0) {
		return null;
	}

	if (mbResult.count > 0) {
		return {
			title: [
				mbResult.releases[0]['artist-credit'].length === 1
					? mbResult.releases[0]['artist-credit'][0].name
					: VARIOUS_ARTIST_TITLE,
				mbResult.releases[0].title
			].join(' - '),
			resource_id: mbResult.releases[0].id,
			type: INFO_TYPE_MUSICBRAINZ
		};
	}

	return {
		title: discogsResult.results[0].title,
		resource_id: discogsResult.results[0].id,
		type: INFO_TYPE_DISCOGS
	};
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	const resultMB = await barcodeMB(data.barcode);
	const resultDiscogs = await barcodeDiscogs(data.barcode);

	// prefer music brains, idk why
	const release = getRelease(resultMB, resultDiscogs);

	return json({
		release
	});
}
