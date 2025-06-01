import { addRelease } from '$lib/js/db.server';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();

	const { success, error, message } = await addRelease(data.title, data.resource_id, data.type);

	return json({
		success,
		error,
		message
	});
}
