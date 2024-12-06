import { BaseScreen } from '@/core/component/base-screen.component'
import html from './home.template.html'
import renderService from '@/core/services/render.service'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(html)
		console.log(element)

		return '<p>Home</p>'
	}
}
