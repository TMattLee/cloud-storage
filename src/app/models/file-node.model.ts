export class FileNode {
  filename:       string;
  mimeType:       string;
  kind:           string;
  id:             string;
  parentFolderId: any;
  
  constructor(
    filename:       string,
    kind:           string,
    id:             string,
    mimeType:       string,
    parentFolderId: string
  ){}
  
}