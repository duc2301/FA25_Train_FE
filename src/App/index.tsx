import { AppProviders } from "./provider";
import { AppRoutes } from "./Router";

const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
