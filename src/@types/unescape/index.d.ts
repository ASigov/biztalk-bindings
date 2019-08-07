declare module 'unescape' {
  function unescape(text: string): string;

  namespace unescape {
    const chars: { [key: string]: string };
    const extras: { [key: string]: string };
  }

  export = unescape;
}
