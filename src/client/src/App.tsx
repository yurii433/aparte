import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header/Header";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
