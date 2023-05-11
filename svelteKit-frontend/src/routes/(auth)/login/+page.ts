import type { PageLoad } from './$types';

export const load: PageLoad = async (input) => {
	console.log(input);
	return {};
};
