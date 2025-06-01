/**
 * @typedef {(inview: boolean) => void} Handler
 *
 * @param {HTMLElement} node
 * @param {Handler | {handler: Handler, persistent: boolean}} opts
 */
export const inview = (node, opts) => {
	const { handler, persistent = true } = typeof opts === 'function' ? { handler: opts } : opts;

	/** @type {IntersectionObserverCallback} */
	const onObserve = (entries) => {
		handler(entries[0].isIntersecting);

		if (!persistent) {
			io.disconnect();
		}
	};

	const io = new IntersectionObserver(onObserve);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
};
