export interface TreeNode {
    id: string;
    label: string;
    hasChildren: boolean;
    children?: TreeNode[];
    isExpanded?: boolean;
    isLoading?: boolean;
}
