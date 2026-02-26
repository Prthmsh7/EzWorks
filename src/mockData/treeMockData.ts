import type { TreeNode } from '../components/TreeView/treeTypes';

export const initialTreeData: TreeNode[] = [
    {
        id: '1',
        label: 'src',
        hasChildren: true,
        isExpanded: true,
        children: [
            {
                id: '1-1',
                label: 'components',
                hasChildren: true,
                isExpanded: true,
                children: [
                    {
                        id: '1-1-1',
                        label: 'App.tsx',
                        hasChildren: false,
                    },
                    {
                        id: '1-1-2',
                        label: 'Layout.tsx',
                        hasChildren: false,
                    },
                ],
            },
            {
                id: '1-2',
                label: 'utils',
                hasChildren: true,
                isExpanded: false,
                children: [
                    {
                        id: '1-2-1',
                        label: 'api.ts',
                        hasChildren: false,
                    }
                ]
            },
            {
                id: '1-3',
                label: 'main.tsx',
                hasChildren: false,
            },
        ],
    },
    {
        id: '2',
        label: 'public',
        hasChildren: true,
        isExpanded: false,
        children: [
            {
                id: '2-1',
                label: 'assets',
                hasChildren: true,
                isExpanded: false,
                children: [
                    {
                        id: '2-1-1',
                        label: 'logo.svg',
                        hasChildren: false,
                    }
                ]
            },
            {
                id: '2-2',
                label: 'favicon.ico',
                hasChildren: false,
            },
        ],
    },
    {
        id: '3',
        label: 'legacy_dist (Lazy Loading)',
        hasChildren: true,
        isExpanded: false,
    },
    {
        id: '4',
        label: 'package.json',
        hasChildren: false,
    },
];
