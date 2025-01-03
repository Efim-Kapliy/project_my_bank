import { customQuery } from '@/core/custom-query/custom-query.lib'

export class TransactionService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return customQuery({
			path:
				this.#BASE_URL +
				`?${new URLSearchParams({
					orderBy: 'desc'
				})}`,
			onSuccess
		})
	}
}
