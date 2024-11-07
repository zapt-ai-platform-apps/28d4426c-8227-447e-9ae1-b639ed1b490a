import { createSignal, createEffect, onMount, Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import LandingPage from './components/LandingPage';
import RoleList from './components/RoleList';
import RoleDetail from './components/RoleDetail';
import QuizPage from './components/QuizPage';
import ProjectPlanner from './components/ProjectPlanner';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
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
    setCurrentPage('login');
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 text-gray-800">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">Sign in with ZAPT</h2>
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
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                showLinks={false}
                view="magic_link"
              />
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" component={LandingPage} />
          <Route path="/roles" component={RoleList} />
          <Route path="/roles/:id" component={RoleDetail} />
          <Route path="/quiz/:roleTitle" component={QuizPage} />
          <Route path="/planner" component={ProjectPlanner} />
        </Routes>
        <Show when={user()}>
          <button
            class="fixed top-4 right-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </Show>
      </Show>
    </div>
  );
}

export default App;