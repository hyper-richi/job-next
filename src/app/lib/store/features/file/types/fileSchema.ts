export interface ImageFile {
  bytes: number;
  fileName: string;
  format: string;
  height: number;
  id: number;
  url: string;
  width: number;
}



export interface FileSchema {
  status: 'idle' | 'loading' | 'error';
  file: ImageFile | null;
  error: ResponseError | null;
  uploadImg: string | null;
}
