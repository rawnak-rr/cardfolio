/**
 * Set while any site page is showing, so the card knows its next mount is a return
 * from inside the site (play the drop-in) rather than a fresh load (just sit there).
 * Module state survives client-side navigation and resets on a full reload.
 */
export const cardReturn = { pending: false };
