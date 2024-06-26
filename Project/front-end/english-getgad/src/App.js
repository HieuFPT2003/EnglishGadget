import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import { CheckingContextProvider } from "./store/CheckingContext";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";
import AdminPage from "./pages/Admin";
import Authentication, { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./components/Authenticator/Logout";
import { checkAuthLoader, tokenLoader, checkPremiumAccount,redirectNotPremium } from "./util/auth";
import BlogPage from "./pages/Blog";
import BlogRoot from "./pages/BlogRoot";
import BlogDetails, {
  loader as loadDetail,
  action as deletePost,
} from "./components/Blog/BlogDetail/BlogDetail";
import Profile from "./components/Blog/Profile/Profile";
import EditBlog from "./components/Blog/BlogDetail/EditBlog/EditBlog";
import CreatePost, {
  action as newPostAction,
} from "./components/Blog/Profile/CreatePost/CreatePost";
import CheckingRoot from "./pages/CheckingRoot";
import PersonalPage from "./components/Personal/PersonalPage";
import CheckingSpelling from "./components/Checking/SpellingCheck/CheckSpelling";
import CheckingGrammar from "./components/Checking/GrammarCheck/CheckingGrammar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "checking",
        element: <CheckingRoot />,
        id: "checking",
        loader: checkPremiumAccount,
        children: [
          { index: true, element: <CheckingSpelling /> },
          { path: "grammar",loader:redirectNotPremium, element: <CheckingGrammar /> },
          { path: "history", element: <CheckingSpelling /> },
        ],
      },
      {
        path: "blog",
        element: <BlogRoot />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <BlogPage /> },
          {
            path: ":id",
            id: "page-detail",
            loader: loadDetail,
            action: deletePost,
            children: [
              { index: true, element: <BlogDetails /> },
              { path: "edit", element: <EditBlog /> },
            ],
          },
          { path: "home", element: <BlogPage /> },
          {
            path: "page",
            children: [
              { index: true, element: <BlogPage /> },
              { path: ":page", element: <BlogPage /> },
            ],
          },
          {
            path: "profile",
            id: "profile",
            children: [
              { index: true, element: <Profile /> },
              {
                path: "create",
                element: <CreatePost />,
                action: newPostAction,
              },
            ],
          },
          {
            path: "category",
            children: [{ path: ":category", element: <BlogPage /> }],
          },
        ],
      },
      {path:"personal",element:<PersonalPage />},
      { path: "premium", element: <HomePage /> },
      { path: "auth", element: <Authentication />, action: authAction },
      { path: "admin", element: <AdminPage /> },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return (
    <CheckingContextProvider>
      <RouterProvider router={router} />
    </CheckingContextProvider>
  );
}

export default App;
