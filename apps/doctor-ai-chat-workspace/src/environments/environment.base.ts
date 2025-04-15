export function getEnv(baseUrl: string) {
  const environment = {
    production: false,
    endpoints: {
      base: `${baseUrl}`,
    },
  };
  return environment;
}
