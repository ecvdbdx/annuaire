import type { Actions } from './$types';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 53f712a (feat: handle form error and email / password validation)
import { fail } from '@sveltejs/kit';

import { supabase } from '$lib/auth';
import { isPasswordValid } from '$lib/validators/auth';
<<<<<<< HEAD
=======

<<<<<<< HEAD
import { supabase } from '@utils/supabaseClient';
>>>>>>> 2a5a1f6 (feat: init supabase auth)
=======
import { supabase } from '$lib/auth';
>>>>>>> 8f79a83 (feat: handle signup form errors (wip))
=======
>>>>>>> c8a9396 (feat: externalise form validators and check email)

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
<<<<<<< HEAD
<<<<<<< HEAD

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const confirmedPassword = formData.get('confirmedPassword')?.toString();
		const termAndConditions = formData.get('termAndConditions')?.toString();

		if (!email || !password || !confirmedPassword || !termAndConditions) {
			return fail(400, {
				email_error: !email ? 'Veuillez renseigner votre adresse email' : null,
				password_error: !password ? 'Veuillez renseigner votre mot de passe' : null,
				confirmedPassword_error: !confirmedPassword
					? 'Veuillez confirmer votre mot de passe'
					: null,
				termAndConditions_error: !termAndConditions
					? "Veuillez accepter les conditions d'utilisation"
					: null,
				email,
				password,
			});
		}

		if (!isPasswordValid(password)) {
			return fail(400, {
				password_error:
					'Votre mot de passe doit contenir 9 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial',
				email,
				password,
			});
		}

		if (password !== confirmedPassword) {
			return fail(400, {
				password_error: 'Les mots de passe ne correspondent pas',
				confirmedPassword_error: 'Les mots de passe ne correspondent pas',
				email,
				password,
			});
		}

		const isEmailValid = await supabase.from('AuthorizedEmail').select('*').eq('email', email);

		if (isEmailValid.data?.length === 0) {
			return fail(400, {
				email_error: "Cette adresse email n'est pas autorisée",
				email,
				password,
			});
		}

		try {
			const { data } = await supabase.auth.signUp({
				email: email as string,
				password: password as string,
			});

			const user_information = await supabase
				.from('AuthorizedEmail')
				.select('*')
				.eq('email', email);

			if (user_information.data === null) {
				throw new Error('Profile cannot be created');
			}

			await supabase.from('Profile').insert({
				created_at: new Date().toISOString(),
				user_id: data.user?.id,
				first_name: user_information.data[0].firstname,
				last_name: user_information.data[0].lastname,
				speciality: user_information.data[0].speciality,
				grade: user_information.data[0].grade,
				date_of_birth: user_information.data[0].birth,
			});
		} catch (error) {
			console.error(error);
		}

		return { success: true };
=======
		const email = formData.get('email');
		const password = formData.get('password');
		const termAndConditions = formData.get('termAndConditions');
=======
>>>>>>> 53f712a (feat: handle form error and email / password validation)

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const confirmedPassword = formData.get('confirmedPassword')?.toString();
		const termAndConditions = formData.get('termAndConditions')?.toString();

		if (!email || !password || !confirmedPassword || !termAndConditions) {
			return fail(400, {
				email_error: !email ? 'Veuillez renseigner votre adresse email' : null,
				password_error: !password ? 'Veuillez renseigner votre mot de passe' : null,
				confirmedPassword_error: !confirmedPassword
					? 'Veuillez confirmer votre mot de passe'
					: null,
				termAndConditions_error: !termAndConditions
					? "Veuillez accepter les conditions d'utilisation"
					: null,
				email,
				password,
			});
		}
<<<<<<< HEAD
>>>>>>> 2a5a1f6 (feat: init supabase auth)
=======

		if (!isPasswordValid(password)) {
			return fail(400, {
				password_error:
					'Votre mot de passe doit contenir 9 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial',
				email,
				password,
			});
		}

		if (password !== confirmedPassword) {
			return fail(400, {
				password_error: 'Les mots de passe ne correspondent pas',
				confirmedPassword_error: 'Les mots de passe ne correspondent pas',
				email,
				password,
			});
		}

<<<<<<< HEAD
		await supabase.auth.signUp({
			email: email as string,
			password: password as string,
		});
<<<<<<< HEAD
>>>>>>> 8f79a83 (feat: handle signup form errors (wip))
=======
=======
		const isEmailValid = await supabase.from('AuthorizedEmail').select().eq('email', email);

		if (isEmailValid.data?.length === 0) {
			return fail(400, {
				email_error: "Cette adresse email n'est pas autorisée",
				email,
				password,
			});
		}

		try {
			await supabase.auth.signUp({
				email: email as string,
				password: password as string,
			});

			// @TODO: Create profil based on email
		} catch (error) {
			console.error(error);
		}
>>>>>>> c8a9396 (feat: externalise form validators and check email)

		return { success: true };
>>>>>>> c206b2d (feat: add success message)
	},
};
