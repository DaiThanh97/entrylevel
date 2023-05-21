export const Environment = {
  API_URL: process.env.REACT_APP_API_URL,
};

Object.entries(Environment).forEach(([k, v]) => {
  if (v === undefined) {
    throw new Error(
      `EnvironmentError: ${k} is undefined, make sure it is provided in setel-web.config.js.`
    );
  }
});
