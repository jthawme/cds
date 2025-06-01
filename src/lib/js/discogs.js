import { DISCOGS_KEY, DISCOGS_SECRET } from '$env/static/private';

/**
 *
 * @param {string} route
 * @param {object} params
 */
const apiCall = (route, params) => {
	const url = new URL(`https://api.discogs.com${route}`);
	url.search = new URLSearchParams({
		...params,
		key: DISCOGS_KEY,
		secret: DISCOGS_SECRET
	}).toString();

	return fetch(url, {
		headers: {
			'User-Agent': 'JthawmeCds/1.0.0 (hi@jthaw.me)'
		}
	}).then((resp) => resp.json());
};

/**
 *
 * @param {string} barcode
 */
export const searchReleaseByBarcode = (barcode) => {
	return apiCall('/database/search', {
		barcode
	});
};
