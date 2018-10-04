export class FolderNode {
  children:       FolderNode[];
  foldername:     string;
  mimeType:       string = 'inode/directory';
  kind:           string;
  id:             string;
  contents:       Array<Object>;
  parentFolderId: any;
  isBottomFolder: boolean;
}