import ChildComponent from '@/core/component/child.component'
import $R from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.router = router
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $R(this.element).find('#auth-side')

		if (this.user) {
			authSideElement.show()
			this.router.navigate('/')
		} else {
			authSideElement.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				Search,
				new LogoutButton({
					router: this.router
				}),
				new UserItem(
					{
						avatarPath:
							'https://i.pinimg.com/736x/b7/5b/29/b75b29441bbd967deda4365441497221.jpg',
						name: 'Max'
					},
					false,
					() => alert('Hey')
				)
			],
			styles
		)

		return this.element
	}
}
