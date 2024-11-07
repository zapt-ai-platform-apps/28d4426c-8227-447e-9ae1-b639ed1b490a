import { Routes, Route } from '@solidjs/router';
import LandingPage from './components/LandingPage';
import RoleList from './components/RoleList';
import RoleDetail from './components/RoleDetail';
import QuizPage from './components/QuizPage';
import ProjectPlanner from './components/ProjectPlanner';
import './index.css';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 text-gray-800">
      <Routes>
        <Route path="/" component={LandingPage} />
        <Route path="/roles" component={RoleList} />
        <Route path="/roles/:id" component={RoleDetail} />
        <Route path="/quiz" component={QuizPage} />
        <Route path="/planner" component={ProjectPlanner} />
      </Routes>
    </div>
  );
}

export default App;