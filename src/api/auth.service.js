import { customQuery } from '@/core/custom-query/custom-query.lib'
import { NotificationService } from '@/core/services/notification.service'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		// store

		this.notificationService = new NotificationService()
	}

	main(type, body) {
		const typePath = type === 'register' ? 'register' : 'login'

		return customQuery({
			path: `${this.#BASE_URL}/${typePath}`,
			body,
			onSuccess: data => {
				// login store

				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			},
			method: 'POST'
		})
	}
}
