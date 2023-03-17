import { supabase } from '$lib/auth';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { data: profile, error: err } = await supabase
		.from('Profile')
		.select()
		.eq('id', params.id)
		.maybeSingle();

	if (err) {
		throw error(500, {
			code: 500,
			message: 'Une erreur est survenue',
		});
	}

	if (!profile) {
		throw error(404, {
			code: 404,
			message: "L'étudiant n'existe pas",
		});
	}

	return {
		profile,
	};
}) satisfies PageLoad;
