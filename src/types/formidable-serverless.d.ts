declare module 'formidable-serverless' {
  import { IncomingMessage } from 'http';
  import { EventEmitter } from 'events';
  import * as stream from 'stream';

  namespace formidable {
    interface Fields {
      [key: string]: string | string[];
    }

    interface File {
      size: number;
      path: string;
      name: string | null;
      type: string;
      mtime: Date;
      filepath: string;
      originalFilename: string | null;
      newFilename: string;
      mimetype: string | null;
      hash?: string | 'sha1' | 'md5' | 'sha256' | 'sha512' | false | null;
      lastModifiedDate?: Date | null;
      length: number;
      filename: string;
      mime: string;
    }

    interface Files {
      [key: string]: File | File[];
    }

    interface Options {
      encoding?: string;
      uploadDir?: string;
      keepExtensions?: boolean;
      maxFileSize?: number;
      maxFieldsSize?: number;
      maxFields?: number;
      hash?: boolean | string;
      multiples?: boolean;
    }

    class IncomingForm extends EventEmitter {
      constructor(options?: Options);
      encoding: string;
      uploadDir: string;
      keepExtensions: boolean;
      maxFileSize: number;
      maxFieldsSize: number;
      maxFields: number;
      hash: string | boolean;
      multiples: boolean;
      type: string;
      bytesReceived: number;
      bytesExpected: number;
      parse(req: IncomingMessage, callback?: (err: Error, fields: Fields, files: Files) => void): void;
      onPart(part: any): void;
    }
  }

  export = formidable;
}
