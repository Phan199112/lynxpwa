import { appTitle, PORTRAIT } from '../constants';
import strings from './strings';

export const browserHistory = {
  push(url: string) { window.location.href = url; },
};

export function setBrowserHistory(history: { push: (route: {}) => void }) {
  browserHistory.push = history.push;
}

export function generateCaptchaCode() {
  const code = `${Math.random()}`.substr(2, 3);

  return code.length < 3 ? `${Math.round(parseInt(code, 10) + 100)}` : code;
}

export function isPortrait(orientation: string = '', size?: string) {
  const { innerHeight, innerWidth } = window;

  if (orientation && orientation !== PORTRAIT) return false;

  if (!orientation && innerHeight < innerWidth) return false;

  const width = orientation ? Math.min(innerHeight, innerWidth) : innerWidth;

  if (size === 'mdMax') return width < 960;

  return true;
}

export function isChildOf(element: Element, parentId: string) {
  let parent = element.parentElement;

  while (parent) {
    if (parent.id === parentId) return true;

    parent = parent.parentElement;
  }

  return false;
}

export const isActiveRoute = (route: string, location: { pathname: string }) =>
  location.pathname.indexOf(route) > -1;

const routes: MapInterface<string> = {
  profile: 'My Profile',
  'profile-edit': 'Edit Profile',
  settings: 'Settings',
  dashboard: 'Dashboard',
  login: 'Login',
  'sign-up': 'Sign up',
};

export function getRouteName(pathname: string) {
  return routes[pathname] || appTitle;
}

export function isValidEmail(email: string) {
  // tslint:disable-next-line:max-line-length
  const emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailFormat.test(email);
}

export function getEmptyFieldsError(fields: string[]) {
  if (fields.filter(field => !field).length) {
    return strings.no_empty_fields;
  }
}

export function getEmailError(email: string, emailRepeat?: string) {
  if (!emailRepeat) {
    return !isValidEmail(email) && strings.invalid_email_format;
  }

  if (email !== emailRepeat) {
    return strings.mismatching_emails;
  }

  if (!isValidEmail(email) || !isValidEmail(emailRepeat)) {
    return strings.invalid_email_format;
  }
}

function isValidPassword(password: string) {
  return password.length > 7;
}

export function getPasswordError(
  passwordNew: string,
  passwordNewRepeat?: string,
  passwordCurrent?: string,
) {
  if (!passwordNewRepeat) {
    if (!passwordNew) return strings.required_field;

    if (!isValidPassword(passwordNew)) return strings.invalid_password_format;

    return;
  }

  if (!passwordNew || !passwordNewRepeat) {
    return strings.required_field;
  }

  if (passwordNew !== passwordNewRepeat) {
    return strings.mismatching_passwords;
  }

  if (passwordCurrent && passwordCurrent === passwordNew) {
    return strings.same_password;
  }

  if (!isValidPassword(passwordNew) || !isValidPassword(passwordNewRepeat)) {
    return strings.invalid_password_format;
  }
}
