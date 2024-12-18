import { customQuery } from '@/core/custom-query/custom-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return customQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
						})}`
					: ''
			}`,
			onSuccess
		})
	}
}
