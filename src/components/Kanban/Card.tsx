import React, { useState, useRef, useEffect } from 'react';
import type { Card as ICard } from './kanbanTypes';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit2, Trash2, GripVertical } from 'lucide-react';

interface CardProps {
    card: ICard;
    columnId: string;
    onEdit: (columnId: string, cardId: string, newTitle: string) => void;
    onDelete: (columnId: string, cardId: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, columnId, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(card.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: card.id,
        data: {
            type: 'Card',
            card,
            columnId,
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleEditSubmit = () => {
        if (editValue.trim() && editValue !== card.title) {
            onEdit(columnId, card.id, editValue);
        } else {
            setEditValue(card.title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleEditSubmit();
        if (e.key === 'Escape') {
            setEditValue(card.title);
            setIsEditing(false);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm dark:shadow-md border border-slate-200 dark:border-slate-700 group relative mb-3 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all duration-200"
        >
            <div className="flex items-start gap-3">
                <div {...attributes} {...listeners} className="mt-1 cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500 transition-colors">
                    <GripVertical className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            className="w-full bg-white dark:bg-slate-900 border border-blue-500 rounded-lg px-2 py-1 text-sm outline-none shadow-sm dark:text-white"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditSubmit}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <div
                            className="text-sm font-medium text-slate-700 dark:text-slate-200 cursor-text py-0.5 break-words"
                            onClick={() => setIsEditing(true)}
                        >
                            {card.title}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit task"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(columnId, card.id); }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        title="Delete task"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
