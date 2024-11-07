import { createSignal, createEffect, onMount, Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import LandingPage from './components/LandingPage';
import RoleList from './components/RoleList';
import RoleDetail from './components/RoleDetail';
import QuizPage from './components/QuizPage';
import ProjectBuilder from './components/ProjectBuilder';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [userRole, setUserRole] = createSignal(null);

  const checkUserSignedIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
      fetchUserRole();
    }
  };

  const fetchUserRole = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session.access_token;

    try {
      const response = await fetch('/api/getUserRole', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      } else {
        console.error('Failed to fetch user role');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
        fetchUserRole();
      } else {
        setUser(null);
        setUserRole(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setCurrentPage('login');
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 text-gray-800">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-orange-600">
                Sign in with ZAPT
              </h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                showLinks={false}
              />
            </div>
          </div>
        }
      >
        <Show when={userRole() === 'admin'}>
          {/* Admin-specific content */}
          <div>
            <h1 class="text-4xl font-bold text-orange-600 mb-4">
              Admin Dashboard
            </h1>
            <p>Welcome, Admin!</p>
            {/* Add admin functionalities here */}
            <button
              class="fixed top-4 right-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </Show>
        <Show when={userRole() === 'user'}>
          {/* Regular user content */}
          <Routes>
            <Route path="/" component={LandingPage} />
            <Route path="/roles" component={RoleList} />
            <Route path="/roles/:id" component={RoleDetail} />
            <Route path="/quiz/:roleTitle" component={QuizPage} />
            <Route path="/builder" component={ProjectBuilder} />
          </Routes>
          <button
            class="fixed top-4 right-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </Show>
        <Show when={!userRole()}>
          <p>Loading...</p>
        </Show>
      </Show>
    </div>
  );
}

export default App;