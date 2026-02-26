import React, { useState } from 'react';
import type { BoardData, Card as ICard } from './kanbanTypes';
import { initialKanbanData } from '../../mockData/kanbanMockData';
import { Column } from './Column';
import type {
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Card } from './Card';

export const KanbanBoard: React.FC = () => {
    const [data, setData] = useState<BoardData>(initialKanbanData);
    const [activeCard, setActiveCard] = useState<ICard | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddCard = (columnId: string) => {
        const newCard: ICard = {
            id: `card-${Date.now()}`,
            title: 'New Task',
        };
        setData((prev) => ({
            ...prev,
            columns: prev.columns.map((col) =>
                col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
            ),
        }));
    };

    const handleEditCard = (columnId: string, cardId: string, newTitle: string) => {
        setData((prev) => ({
            ...prev,
            columns: prev.columns.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        cards: col.cards.map((card) =>
                            card.id === cardId ? { ...card, title: newTitle } : card
                        ),
                    }
                    : col
            ),
        }));
    };

    const handleDeleteCard = (_columnId: string, cardId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setData((prev) => ({
                ...prev,
                columns: prev.columns.map((col) => ({
                    ...col,
                    cards: col.cards.filter((card) => card.id !== cardId)
                })),
            }));
        }
    };

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === 'Card') {
            setActiveCard(event.active.data.current.card);
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveACard = active.data.current?.type === 'Card';
        const isOverACard = over.data.current?.type === 'Card';

        if (!isActiveACard) return;

        // Dropping a card over another card
        if (isActiveACard && isOverACard) {
            setData((prev) => {
                const activeColumn = prev.columns.find((col) =>
                    col.cards.some((c) => c.id === activeId)
                );
                const overColumn = prev.columns.find((col) =>
                    col.cards.some((c) => c.id === overId)
                );

                if (!activeColumn || !overColumn) return prev;

                if (activeColumn !== overColumn) {
                    const activeIndex = activeColumn.cards.findIndex((c) => c.id === activeId);
                    const overIndex = overColumn.cards.findIndex((c) => c.id === overId);

                    return {
                        ...prev,
                        columns: prev.columns.map((col) => {
                            if (col.id === activeColumn.id) {
                                return {
                                    ...col,
                                    cards: col.cards.filter((c) => c.id !== activeId),
                                };
                            }
                            if (col.id === overColumn.id) {
                                const newCards = [...col.cards];
                                newCards.splice(overIndex, 0, activeColumn.cards[activeIndex]);
                                return { ...col, cards: newCards };
                            }
                            return col;
                        }),
                    };
                }
                return prev;
            });
        }

        // Dropping a card over a column
        const isOverAColumn = over.data.current?.type === 'Column';
        if (isActiveACard && isOverAColumn) {
            setData((prev) => {
                const activeColumn = prev.columns.find((col) =>
                    col.cards.some((c) => c.id === activeId)
                );
                const overColumnId = over.id;

                if (!activeColumn || activeColumn.id === overColumnId) return prev;

                return {
                    ...prev,
                    columns: prev.columns.map((col) => {
                        if (col.id === activeColumn.id) {
                            return {
                                ...col,
                                cards: col.cards.filter((c) => c.id !== activeId),
                            };
                        }
                        if (col.id === overColumnId) {
                            const activeCardObj = activeColumn.cards.find((c) => c.id === activeId)!;
                            return {
                                ...col,
                                cards: [...col.cards, activeCardObj],
                            };
                        }
                        return col;
                    }),
                };
            });
        }
    };

    const onDragEnd = (event: DragEndEvent) => {
        setActiveCard(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        setData((prev) => {
            const activeColumn = prev.columns.find((col) =>
                col.cards.some((c) => c.id === activeId)
            );
            if (!activeColumn) return prev;

            const overIndex = activeColumn.cards.findIndex((c) => c.id === overId);
            const activeIndex = activeColumn.cards.findIndex((c) => c.id === activeId);

            if (activeIndex !== -1 && overIndex !== -1) {
                return {
                    ...prev,
                    columns: prev.columns.map((col) =>
                        col.id === activeColumn.id
                            ? { ...col, cards: arrayMove(col.cards, activeIndex, overIndex) }
                            : col
                    ),
                };
            }
            return prev;
        });
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-200 transition-colors">Project Board</h2>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <div className="flex md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0">
                        {data.columns.map((col) => (
                            <Column
                                key={col.id}
                                column={col}
                                onAddCard={handleAddCard}
                                onEditCard={handleEditCard}
                                onDeleteCard={handleDeleteCard}
                            />
                        ))}
                    </div>
                </div>

                <DragOverlay dropAnimation={{
                    sideEffects: defaultDropAnimationSideEffects({
                        styles: {
                            active: {
                                opacity: '0.5',
                            },
                        },
                    }),
                }}>
                    {activeCard ? (
                        <div className="w-[300px]">
                            <Card
                                card={activeCard}
                                columnId=""
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};
