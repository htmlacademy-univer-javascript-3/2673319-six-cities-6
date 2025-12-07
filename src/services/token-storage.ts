const TOKEN_NAME = 'six-cities-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_NAME, token);
}

export function deleteToken(): void {
  localStorage.removeItem(TOKEN_NAME);
}
