import type { TreeNode } from './treeTypes';

export const findNodeById = (nodes: TreeNode[], id: string): TreeNode | undefined => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findNodeById(node.children, id);
            if (found) return found;
        }
    }
    return undefined;
};

export const updateNodeInTree = (
    nodes: TreeNode[],
    id: string,
    updatedNode: Partial<TreeNode>
): TreeNode[] => {
    return nodes.map((node) => {
        if (node.id === id) {
            return { ...node, ...updatedNode };
        }
        if (node.children) {
            return {
                ...node,
                children: updateNodeInTree(node.children, id, updatedNode),
            };
        }
        return node;
    });
};

export const removeNodeFromTree = (nodes: TreeNode[], id: string): TreeNode[] => {
    return nodes
        .filter((node) => node.id !== id)
        .map((node) => {
            if (node.children) {
                return {
                    ...node,
                    children: removeNodeFromTree(node.children, id),
                };
            }
            return node;
        });
};

export const addNodeToTree = (
    nodes: TreeNode[],
    parentId: string,
    newNode: TreeNode
): TreeNode[] => {
    return nodes.map((node) => {
        if (node.id === parentId) {
            return {
                ...node,
                hasChildren: true,
                isExpanded: true,
                children: [...(node.children || []), newNode],
            };
        }
        if (node.children) {
            return {
                ...node,
                children: addNodeToTree(node.children, parentId, newNode),
            };
        }
        return node;
    });
};
