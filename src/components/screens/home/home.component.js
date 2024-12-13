import { BaseScreen } from '@/core/component/base-screen.component'
import $R from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'test',
					placeholder: 'Number...',
					type: 'text',
					variant: 'green'
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

		$R(element).find('h1').css('color', 'black')

		return element
	}
}
