/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * 
 * @param  {String} str the user-submitted string
 * 
 * @return {String} the sanitized string
 */

 const sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};


export default sanitizeHTML;
