import { customQuery } from '@/core/custom-query/custom-query.lib'

export class TransactionService {
	#BASE_URL = '/transaction'

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
