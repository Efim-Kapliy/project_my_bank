import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

/**
 * Represents the RQuery class for working with DOM element.
 */
class RQuery {
	/**
	 * Create a new RQuery instance.
	 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}

		this.selector = selector
	}

	/* START FIND */
	/**
	 * Find the first element that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {RQuery} A new RQuery instance for the found element.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found!`)
		}
	}
	/* END FIND */

	/**
	 * Get or set the inner HTML of the selected element.
	 * @param {string} [htmlContent] - Optional HTML content to set. If not provided, the current inner HTML will be returned.
	 * @returns {RQuery|string} The current RQuery instance for chaining when setting HTML content or the current inner HTML when getting.
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/* START EVENTS */
	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	click(callback) {
		this.element.addEventListener('click', callback)
		return this
	}
	/* END EVENTS */

	/* START FORM */
	/**
	 * Set attributes adn event listeners for an input element.
	 * @param {object} options - An object containing input options.
	 * @param {function(Event): void} [options.onInput] - The event listener for the input's input event.
	 * @param {object} [options.rest] - Optional attributes to set on the input element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLocaleLowerCase() !== 'input') {
			throw new Error('Element must be an input')
		}

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener('input', onInput)
		}

		return this
	}

	/**
	 * Set attributes and event listeners for a number input element.
	 * @param {number} [limit] - The maximum length of input value.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.tagName.toLowerCase() !== 'number'
		) {
			throw new Error('Element must be an input with type "number"')
		}

		this.element.addEventListener('input', event => {
			let value = event.target.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})

		return this
	}

	/**
	 * Set attributes and event listeners for a credit card input.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	creditCardInput() {
		const limit = 16

		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.tagName.toLowerCase() !== 'text'
		) {
			throw new Error('Element must be an input with type "test"')
		}

		this.element.addEventListener('input', event => {
			let value = event.target.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})

		return this
	}
	/* END FORM */

	/* START STYLES */
	/**
	 * Set the CSS style of the selected element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be strings')
		}

		this.element.style[property] = value
		return this
	}

	/**
	 * Add a class or a list of classes to the current element.
	 * @param {string | string[]} classNames - A single class name or an array of class names to add to the element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}
	}

	/**
	 * Removes a class or a list of classes to the current element.
	 * @param {string | string[]} classNames - A single class name or an array of class names to remove from the element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}
	}
	/* END STYLES */

	/* START INSERT */
	/**
	 * Append a new element as a child of the selected element.
	 * @param {HTMLElement} child - The new child element to append.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	append(childElement) {
		this.element.append(childElement)
		return this
	}

	/**
	 * Insert a new element before the selected element.
	 * @param {HTMLElement} newElement - The new element to insert before the selected element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement')
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('Element does not have a parent element')
		}
	}
	/* END INSERT */
}

/**
 * Create a new RQuery instance for the given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance for the given selector.
 */
function $R(selector) {
	return new RQuery(selector)
}

export default $R
