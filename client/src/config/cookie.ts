export function setCookie(
  cname: string,
  cvalue: string,
  options: { maxAge: number; path: string } = { maxAge: 3600, path: "/" }
) {
  const d = new Date();
  d.setTime(d.getTime() + options.maxAge * 1000);
  const expires = "expires=" + d.toUTCString();

  document.cookie =
    cname + "=" + cvalue + "; " + expires + "; path=" + options.path;
}

export function getCookie(cname: string): string | null {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function deleteCookie(cname: string) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
