// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: true,
  tenant: '56f677ed-ab0d-4f36-8dad-f20db89d4bd4',
  clientID: 'b2623207-50a6-4b64-af52-2af7e4b4b5df',
  // clientID: '2ef88888-99c5-4e91-89db-4cabe6ae661d',
  graphScopes: ['user.read', 'user.read.all', 'people.read.all'],
  graphUrl: 'https://graph.microsoft.com/v1.0',
  apiUrl: ''
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
