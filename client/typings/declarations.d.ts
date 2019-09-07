// Global declaration for Typed CSS Modules
declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}
