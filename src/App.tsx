import { TreePine, LayoutGrid } from 'lucide-react';
import { ShowcaseLayout } from './components/Layout/ShowcaseLayout';
import { ShowcaseSection } from './components/Layout/ShowcaseSection';
import { TreeView } from './components/TreeView/TreeView';
import { KanbanBoard } from './components/Kanban/KanbanBoard';

function App() {
  return (
    <ShowcaseLayout>
      <ShowcaseSection
        title="Question 1 — Tree View Component"
        icon={<TreePine className="w-5 h-5" />}
      >
        <TreeView />
      </ShowcaseSection>

      <ShowcaseSection
        title="Question 2 — Kanban Board Component"
        icon={<LayoutGrid className="w-5 h-5" />}
      >
        <KanbanBoard />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}

export default App;
