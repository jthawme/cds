import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { INFO_TYPE_USER } from './constants';

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 *
 * @param {string} title
 * @param {string} resource_id
 * @param {string} type
 */
export const addRelease = async (title, resource_id, type) => {
	if (type !== INFO_TYPE_USER) {
		const { count } = await supabase
			.from('cds')
			.select('*', { count: 'exact', head: true })
			.eq('type', type)
			.eq('resource_id', resource_id);

		if (count === null || count > 0) {
			return {
				error: true,
				message: 'exists'
			};
		}
	}

	const { status } = await supabase.from('cds').insert({
		title,
		resource_id,
		type
	});

	return {
		success: status >= 200 && status < 300
	};
};
