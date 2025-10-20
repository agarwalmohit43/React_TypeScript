export interface ListData {
  id: string;
  name: string;
  isFolder: boolean;
}

export type FolderStructure = ListData & { children?: ListData[] };
