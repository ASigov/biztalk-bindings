declare module 'node-expat' {
  import stream from 'stream';

  interface XmlAttributes {
    [key: string]: string | void;
  }

  class Parser extends stream.Stream implements NodeJS.WritableStream {
    private encoding: string;

    public constructor(encoding: string);

    public on(
      event: 'startElement',
      listener: (name: string, attr: XmlAttributes) => void,
    ): this;

    public on(
      event: 'endElement' | 'text' | 'error',
      listener: (value: string) => void,
    ): this;

    public on(event: 'end', listener: () => void): this;

    public writable: boolean;

    public write(
      buffer: Buffer | Uint8Array | string,
      cb?: (err?: Error | null) => void,
    ): boolean;

    public write(
      str: string,
      encoding?: string,
      cb?: (err?: Error | null) => void,
    ): boolean;

    public end(cb?: () => void): void;

    public end(data: string | Uint8Array | Buffer, cb?: () => void): void;

    public end(str: string, encoding?: string, cb?: () => void): void;
  }

  function createParser(cb: (name: string, ...attr: string[]) => void): Parser;
}
