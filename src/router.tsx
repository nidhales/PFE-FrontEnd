import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Result from './content/pages/Components/results';
import Chat from './content/pages/Components/chat';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const SignIn = Loader(
  lazy(() => import('src/content/Authentification/SignInPage'))
);
const Register = Loader(
  lazy(() => import('src/content/Authentification/RegisterPage'))
);

//const Feeds = Loader(lazy(() => import('src/content/dashboards/Feeds')));
const Feeds = Loader(lazy(() => import('src/content/dashboards/Feeds')));

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

const UserList = Loader(
  lazy(() => import('src/content/applications/UserList'))
);

const Errors = Loader(
  lazy(() => import('src/content/pages/Components/Errors'))
);

const Solutions = Loader(
  lazy(() => import('src/content/pages/Components/Solutions'))
);

const Subjects = Loader(
  lazy(() => import('src/content/pages/Components/Subjects'))
);

const Code = Loader(lazy(() => import('src/content/pages/Components/Code')));

const Article = Loader(
  lazy(() => import('src/content/pages/Components/Article'))
);

const Categories = Loader(
  lazy(() => import('src/content/pages/Components/Categories'))
);

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: 'signin',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          }
        ]
      }
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/register',
        element: <Register />
      },
      {
        path: 'register',
        element: <Navigate to="/register" replace />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="feeds" replace />
      },
      {
        path: 'feeds',
        element: <Feeds />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="UserList" replace />
      },
      {
        path: 'UserList',
        element: <UserList />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'categories',
        element: <Categories />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'errors',
        element: <Errors />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'solutions',
        element: <Solutions />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'subjects',
        element: <Subjects />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'code',
        element: <Code />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'article',
        element: <Article />
      }
    ]
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'result',
        element: <Result />
      }
    ]
  }
];

export default routes;
