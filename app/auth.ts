export const AUTH_COOKIE = "authenticated=true";

export function isAuthenticated() {
  return document.cookie.split(";").some((cookie) => cookie.trim() === AUTH_COOKIE);
}
