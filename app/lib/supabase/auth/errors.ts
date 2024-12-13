export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class SignUpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SignUpError';
  }
}

export class SignOutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SignOutError';
  }
}