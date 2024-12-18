import { customQuery } from '@/core/custom-query/custom-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return customQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
