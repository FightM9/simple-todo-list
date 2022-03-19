/**
 * List of messages for modal
 */

export const modalMessage = {
  rename: "Change task name",
};

/**
 * Open modal dialog with browser API
 *
 * @param {String} value text in the input field
 *
 * @param {String} message message text in modal
 *
 * @return {String} entered value
 */

export let openModalInput = function (value = "", message) {
  let result = prompt(message, value);
  return result === null ? value : result;
};
