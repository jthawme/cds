/**
 *
 * @param {string} url
 * @param {RequestInit} [opts]
 * @param {typeof fetch} [fetch]
 * @returns {Promise<Response>}
 */
const fetcher = (url, opts, fetch) => {
	const f = fetch ?? window.fetch;

	return f(url, opts);
};

/**
 *
 * @param {Record<string, any>} obj
 * @returns {string}
 */
const paramsToString = (obj) => {
	const params = new URLSearchParams(obj);

	return params.size > 0 ? `?${params.toString()}` : '';
};

export const api = {
	basic: {
		/**
		 *
		 * @param {Record<string, string>} obj
		 * @param {typeof fetch} [fetch]
		 * @returns
		 */
		get(obj, fetch) {
			return fetcher(`/api/basic${paramsToString(obj)}`, {}, fetch).then((resp) => resp.json());
		}
	},
	scan: {
		/**
		 *
		 * @param {string} barcode
		 * @param {typeof fetch} [fetch]
		 * @returns
		 */
		barcode(barcode, fetch) {
			return fetcher(
				`/api/scan/barcode`,
				{
					method: 'POST',
					body: JSON.stringify({
						barcode
					})
				},
				fetch
			).then((resp) => resp.json());
		}
	},

	release: {
		/**
		 *
		 * @param {{title: string, resource_id: string, type: string}} barcode
		 * @param {typeof fetch} [fetch]
		 * @returns
		 */
		add({ title, resource_id, type }, fetch) {
			return fetcher(
				`/api/release/add`,
				{
					method: 'POST',
					body: JSON.stringify({
						title,
						resource_id,
						type
					})
				},
				fetch
			).then((resp) => resp.json());
		}
	}
};
