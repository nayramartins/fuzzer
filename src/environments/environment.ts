// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  spotify: {
    clientId: '14b382314807492a96d24d5a513d71d0',
    scopes: 'user-library-read user-top-read user-read-email playlist-modify-private',
    redirectUri: 'http://localhost:4200/login'
  }
};
