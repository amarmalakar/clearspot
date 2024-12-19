import { useRoutes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { AuthProvider } from "./components/provider/auth-provider";
import Home from "./components/screens/Home";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];
  const routesElement = useRoutes(routesArray);

  console.log("import.meta.env.NAME",import.meta.env)

  return (
    <AuthProvider>
      <main>{routesElement}</main>
    </AuthProvider>
  );
}

export default App;
