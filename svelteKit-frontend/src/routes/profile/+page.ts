import type { PageLoad } from './$types';
import userStore from '$lib/store/Store';
import type { User } from '$lib/types/types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async () => {
	let user: User = {
		_id: '',
		email: '',
		role: '',
		token: ''
	};

	userStore.subscribe((value) => {
		user = value;
	});

	if (user?.token.length === 0) {
		throw redirect(301, '/login');
	}

	return {
		props: {
			user
		}
	};
};
