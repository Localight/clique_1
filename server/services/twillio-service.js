
/**
 * Twillio service. Does three things:
 * - init: sets up Twillio API key.
 * - hook: listens for POSTs from Twillio
 * - send: sends a given TEXT to a given # via Twillio
 */

function init () {};
function hook (req, res) {
    // create personas or load existing etc
    //
};
function send () {};

module.exports = {
    init: init,
    hook: hook,
    send: send
}