import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({
					router: this.router
				}),
				Search,
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
