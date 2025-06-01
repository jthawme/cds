/**
 *
 * @param {string} route
 * @param {object} params
 */
const apiCall = (route, params) => {
	const url = new URL(`https://musicbrainz.org/ws/2${route}/`);
	url.search = new URLSearchParams({
		...params,
		fmt: 'json'
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
	return apiCall('/release', {
		query: `barcode:${barcode}`
	});
};
