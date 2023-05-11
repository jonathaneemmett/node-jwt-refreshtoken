import type { PageLoad } from './$types';
import userStore from '$lib/store/Store';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async () => {
	let user = {
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
	} else if (user?.role !== 'admin') {
		throw redirect(301, '/unauthorized');
	}

	return {
		user
	};
};
