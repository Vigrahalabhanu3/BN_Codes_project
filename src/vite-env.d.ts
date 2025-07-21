/// <reference types="vite/client" />

declare module '*.jsx' {
  const component: React.FC<any>;
  export default component;
}

declare module '*.js' {
  const value: any;
  export default value;
}
