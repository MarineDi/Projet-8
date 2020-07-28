/*global NodeList */
/**
 * @function Helpers
 */
(function (window) {
	'use strict';

	/**
	 * Get elements by querySelector (.qs) 
	 * Used in {@link View}
	 * @memberof Helpers
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	/**
	 * Get elements by CSS selector: qsa = querySelectorAll
	 * Used in {@link View}
	 * @memberof Helpers
	 */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * addEventListener wrapper:
	 * Used in {@link View} and {@link App}
	 * @memberof Helpers
	 * @param {object} target  
	 * @param {boolean} type Focus || Blur
  	 * @param {function} callback 
	 * @param {object} useCapture captured element
	 */
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/** 
	 * Attaches a handler to event for every element that matches the selector
	 * Used in {@link View}
	 * @memberof Helpers
	 * @param  {object} target  
	 * @param  {function} selector Compares children with parents
	 * @param {boolean} type 
	 * @param  {function} handler Callback executed under one condition
	 */ 
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * Find the element's parent with the given tag name: 
	 * $parent(qs('a'), 'div');
	 * Used in {@link View}
	 * @memberof Helpers
	 * @param {object} element
	 * @param {string} tagName
	 */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
