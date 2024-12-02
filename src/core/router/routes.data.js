import { AboutUs } from '@/components/screens/about-us/about-us.component'
import { Auth } from '@/components/screens/auth/auth.component'
import { Home } from '@/components/screens/home/home.component'
import { NotFound } from '@/components/screens/not-found/not-found.component'

export const ROUTES = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/auth',
		component: Auth
	},
	{
		path: '/about-us',
		component: AboutUs
	}
]
