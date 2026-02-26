import React from 'react';
import type { Column as IColumn } from './kanbanTypes';
import { Card } from './Card';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

interface ColumnProps {
    column: IColumn;
    onAddCard: (columnId: string) => void;
    onEditCard: (columnId: string, cardId: string, newTitle: string) => void;
    onDeleteCard: (columnId: string, cardId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
    column,
    onAddCard,
    onEditCard,
    onDeleteCard
}) => {
    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className="bg-slate-50 dark:bg-slate-900 flex flex-col w-full min-w-[280px] md:min-w-0 flex-shrink-0 h-[55vh] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-300"
        >
            <div className="p-4 flex items-center justify-between bg-white dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                <h3 className="font-semibold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                    {column.title}
                    <span className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 px-2 py-0.5 rounded-full text-xs">
                        {column.cards.length}
                    </span>
                </h3>
                <button
                    onClick={() => onAddCard(column.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-500 dark:text-slate-400 transition-colors"
                    title="Add card"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto">
                <SortableContext items={column.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    {column.cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            columnId={column.id}
                            onEdit={onEditCard}
                            onDelete={onDeleteCard}
                        />
                    ))}
                    {column.cards.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm italic border-2 border-dashed border-gray-200 rounded-lg p-6">
                            Drop cards here
                        </div>
                    )}
                </SortableContext>
            </div>
        </div>
    );
};
