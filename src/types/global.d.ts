interface Window {
  env?: {
    VITE_AWS_REGION: string;
    VITE_AWS_ACCESS_KEY_ID: string;
    VITE_AWS_SECRET_ACCESS_KEY: string;
    [key: string]: string;
  };
}
