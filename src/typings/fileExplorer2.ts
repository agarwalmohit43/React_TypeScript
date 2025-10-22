export interface ListData {
  id: string;
  name: string;
  isFolder: boolean;
  isExpanded?: boolean;
}

export type FolderStructure = ListData & { children?: ListData[] };
