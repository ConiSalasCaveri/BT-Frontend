export class RefreshTokenNotFoundError implements Error {
  readonly name: string = 'RefreshTokenNotFoundError';
  readonly message: 'Can not find the "refreshToken" in the browser variables';
}
