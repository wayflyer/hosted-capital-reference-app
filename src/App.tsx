import { BrowserRouter } from "react-router";

import { QueryProvider } from './components/query-provider/QueryProvider.tsx';
import { ContentManager } from "./components/content-manager/ContentManager.tsx";

export const App = () => {

  return (
    <BrowserRouter>
      <QueryProvider>
        <ContentManager />
      </QueryProvider>
    </BrowserRouter>
  );
};
