import React, { useState, useRef, useEffect } from 'react';
import type { TreeNode as ITreeNode } from './treeTypes';
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileCode,
    FileText,
    FileJson,
    Image,
    Plus,
    Edit2,
    Trash2,
    Loader2,
    Package,
    Check,
    X
} from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TreeNodeProps {
    node: ITreeNode;
    onExpand: (id: string) => void;
    onAdd: (parentId: string) => void;
    onEdit: (id: string, newLabel: string) => void;
    onDelete: (id: string) => void;
    depth: number;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    onExpand,
    onAdd,
    onEdit,
    onDelete,
    depth
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(node.label);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: node.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.hasChildren) {
            onExpand(node.id);
        }
    };

    const handleEditSubmit = () => {
        if (editValue.trim() && editValue !== node.label) {
            onEdit(node.id, editValue);
        } else {
            setEditValue(node.label);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleEditSubmit();
        if (e.key === 'Escape') {
            setEditValue(node.label);
            setIsEditing(false);
        }
    };

    const getLevelColor = (d: number) => {
        const colors = [
            'text-blue-600 dark:text-blue-400',    // Root (src, public)
            'text-amber-500 dark:text-amber-400',   // Level 1 (components, utils)
            'text-emerald-600 dark:text-emerald-400', // Level 2
            'text-indigo-500 dark:text-indigo-400',  // Level 3
            'text-rose-500 dark:text-rose-400',    // Level 4
            'text-slate-500 dark:text-slate-400',   // Deep
        ];
        return colors[Math.min(d, colors.length - 1)];
    };

    const getNodeIcon = () => {
        if (node.isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;

        if (node.hasChildren) {
            if (depth === 0) return <Package className="w-4 h-4" />;
            return node.isExpanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />;
        }

        const label = node.label.toLowerCase();
        if (label.endsWith('.tsx') || label.endsWith('.ts')) return <FileCode className="w-4 h-4" />;
        if (label.endsWith('.json')) return <FileJson className="w-4 h-4" />;
        if (label.endsWith('.svg') || label.endsWith('.png') || label.endsWith('.ico')) return <Image className="w-4 h-4" />;
        return <FileText className="w-4 h-4" />;
    };

    return (
        <div
            key={node.id}
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="relative"
        >
            {/* Horizontal elbow line for indented nodes */}
            {depth > 0 && (
                <div
                    className="absolute border-l border-b border-dotted border-slate-400 dark:border-slate-600 rounded-bl"
                    style={{
                        left: `${(depth - 1) * 20 + 10}px`,
                        top: '0',
                        width: '12px',
                        height: '18px',
                    }}
                />
            )}

            <div
                className="group flex items-center py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-all ml-1"
                style={{ paddingLeft: `${depth * 20}px` }}
                onDoubleClick={() => setIsEditing(true)}
            >
                {/* Expand/Collapse Toggle */}
                <div
                    className={`w-5 h-5 flex items-center justify-center mr-1 ${getLevelColor(depth)} hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors z-10 bg-white dark:bg-slate-900`}
                    onClick={handleToggle}
                >
                    {node.hasChildren && !node.isLoading && (
                        node.isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
                    )}
                </div>

                {/* Main Node Icon */}
                <div className={`mr-2.5 ${getLevelColor(depth)} flex items-center bg-white dark:bg-slate-900 z-10 px-0.5`} {...listeners}>
                    {getNodeIcon()}
                </div>

                {/* label */}
                {isEditing ? (
                    <input
                        ref={inputRef}
                        className="flex-1 bg-white dark:bg-slate-800 border-2 border-blue-500 rounded px-1.5 text-sm outline-none font-medium text-slate-900 dark:text-white shadow-sm"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleEditSubmit}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span className={`flex-1 text-sm font-medium truncate ${node.hasChildren ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                        {node.label}
                    </span>
                )}

                {/* Actions */}
                {isConfirmingDelete ? (
                    <div className="flex items-center gap-1 ml-2 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-lg border border-rose-200 dark:border-rose-800">
                        <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 mr-1">Delete?</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="p-0.5 bg-rose-500 hover:bg-rose-600 text-white rounded transition-colors"
                            title="Confirm delete"
                        >
                            <Check className="w-3 h-3" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsConfirmingDelete(false); }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="p-0.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded transition-colors"
                            title="Cancel"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ) : (
                    <div className="hidden group-hover:flex items-center gap-1.5 ml-3 bg-slate-50 dark:bg-slate-800/80 px-2 rounded-lg backdrop-blur-sm shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
                        <button
                            onClick={(e) => { e.stopPropagation(); onAdd(node.id); }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400 transition-colors"
                            title="Add Item"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400 transition-colors"
                            title="Rename"
                        >
                            <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsConfirmingDelete(true); }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-red-100 dark:hover:bg-rose-900/30 rounded text-red-500 dark:text-rose-400 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Vertical line for the children container */}
            {node.isExpanded && node.children && (
                <div className="relative">
                    {/* The actual vertical guide line */}
                    <div
                        className="absolute border-l border-dotted border-slate-400 dark:border-slate-600"
                        style={{
                            left: `${depth * 20 + 10}px`,
                            top: '0',
                            bottom: '12px', // Stops before the last child's elbow
                        }}
                    />

                    <div className="mt-0.5">
                        {node.children.map((child) => (
                            <TreeNode
                                key={child.id}
                                node={child}
                                onExpand={onExpand}
                                onAdd={onAdd}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
