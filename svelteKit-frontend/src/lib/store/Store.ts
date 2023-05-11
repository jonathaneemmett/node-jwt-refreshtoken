import { writable } from 'svelte/store';

const userStore = writable({
	_id: '',
	email: '',
	role: '',
	token: ''
});

export default userStore;
