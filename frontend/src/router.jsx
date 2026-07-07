import Home from "./pages/Home";


import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
// ... aur routers array mein, catch-all "*" se UPAR:
export const routers = [
  {
    path: "/admin",
    name: "admin",
    element: <Admin />,
  },
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  
  
 
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

window.__routers__ = routers;
