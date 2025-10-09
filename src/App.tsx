import { QueryProvider } from './components/query-provider/QueryProvider.tsx';
import { ContentManager } from "./components/content-manager/ContentManager.tsx";

export const App = () => {

  return (
    <QueryProvider>
      <ContentManager />
    </QueryProvider>
  );
};
