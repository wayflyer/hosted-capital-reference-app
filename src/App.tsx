import { QueryProvider } from './components/query-provider/QueryProvider.tsx';
import { ThemeProvider } from "./components/theme-provider/ThemeProvider.tsx";
import { ContentManager } from "./components/content-manager/ContentManager.tsx";

export const App = () => {

  return (
    <QueryProvider>
      <ThemeProvider>
        <ContentManager />
      </ThemeProvider>
    </QueryProvider>
  );
};
