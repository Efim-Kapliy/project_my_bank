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
		this.store.removeObserver(this)
		this.store.addObserver(this)

		this.userItem = new UserItem(
			{
				avatarPath: '/',
				name: 'Name'
			},
			false,
			() => alert('Hey')
		)

		this.router = router
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $R(this.element).find('#auth-side')

		if (this.user) {
			authSideElement.show()
			this.userItem.update(this.user)
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
				this.userItem
			],
			styles
		)

		this.update()

		return this.element
	}
}
