const SITE_NAME = 'MY Bank'

export const getTitle = title => {
	return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}
