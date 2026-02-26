import type { BoardData } from '../components/Kanban/kanbanTypes';

export const initialKanbanData: BoardData = {
    columns: [
        {
            id: 'todo',
            title: 'Todo',
            cards: [
                { id: 'card-1', title: 'Task 1' },
                { id: 'card-2', title: 'Question 1' },
                { id: 'card-5', title: 'Fix 1' },
            ],
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            cards: [
                { id: 'card-3', title: 'Task 2' },
                { id: 'card-6', title: 'Fix 2' },
            ],
        },
        {
            id: 'done',
            title: 'Done',
            cards: [
                { id: 'card-4', title: 'Question 2' },
            ],
        },
    ],
};
