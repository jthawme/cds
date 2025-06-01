/**
 * @typedef {(rect: DOMRectReadOnly) => void} ResizeHandler
 *
 * @param {HTMLElement} node
 * @param {ResizeHandler} handler
 */
export const resize = (node, handler) => {
	/** @type {ResizeObserverCallback} */
	const onResize = (entries) => {
		handler(entries[0].contentRect);
	};

	const ro = new ResizeObserver(onResize);
	ro.observe(node);

	handler(node.getBoundingClientRect());

	return {
		destroy() {
			ro.disconnect();
		}
	};
};
