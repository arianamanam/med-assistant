import { getEnv } from './environment.base';

// const baseUrl = 'https://pilot.easymed.ir:30110';
// //TODO:Change Back Url https://devapi.easymed.ir
// export const environment = {
//   ...getEnv(baseUrl),
// };http://192.168.25.162:30800/core
const baseUrl = 'https://testapi.demisco.ai';

export const environment = {
  ...getEnv(baseUrl),
  production: true,
};
