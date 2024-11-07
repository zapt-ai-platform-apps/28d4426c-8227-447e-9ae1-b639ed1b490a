import { createSignal, onMount, Show, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function RoleList() {
  const [roles, setRoles] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getRoles');
      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles);
      } else {
        console.error('Error fetching roles:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchRoles);

  const handleRoleClick = (id) => {
    navigate(`/roles/${id}`);
  };

  return (
    <div class="p-6 min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <h2 class="text-4xl font-bold text-orange-600 mb-4 text-center">Choose a Role to Explore!</h2>
      <Show when={loading()}>
        <p>Loading...</p>
      </Show>
      <Show when={!loading() && roles().length > 0} fallback={<p>No roles available.</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={roles()}>
            {(role) => (
              <div
                class="bg-white p-4 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
                onClick={() => handleRoleClick(role.title)}
              >
                <img src="https://images.unsplash.com/photo-1502781252888-9143ba7f074e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwyfHxjYXJ0b29uJTIwa2lkcyUyMGNlbGVicmF0aW5nJTIwd2l0aCUyMGNvbmZldHRpfGVufDB8fHx8MTczMDk3ODAwOXww&ixlib=rb-4.0.3&q=80&w=1080"
                  src={role.image}
                  alt={role.title}
                  class="w-full h-40 object-cover rounded-md mb-4"
                />
          <button
            class="bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 cursor-pointer mb-4"
            onClick={handleRetakeQuiz}
          >
            Play Again
          </button>
        </div>
      </Show>
      <Show when={!loading() && !quizCompleted() && questions().length > 0}>
        <div>
          <h2 class="text-3xl font-bold text-orange-600 mb-4">
            Question {currentQuestionIndex() + 1} of {questions().length}
          </h2>
          <p class="text-xl mb-6">{questions()[currentQuestionIndex()].question}</p>
          <div class="space-y-4 mb-6">
            <For each={questions()[currentQuestionIndex()].options}>
              {(option) => (
                <div
                  class={`p-4 border rounded-lg cursor-pointer ${
                    selectedOption() === option ? 'bg-orange-200' : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              )}
            </For>
          </div>
          <button
            class={`bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md ${
              selectedOption() === null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transform hover:scale-105 transition duration-300'
            }`}
            onClick={handleNextQuestion}
            disabled={selectedOption() === null}
          >
            Next
          </button>
        </div>
      </Show>
      <Show when={!loading() && !quizCompleted() && questions().length === 0}>
        <p>No questions available.</p>
      </Show>
    </div>
  );
}

export default QuizPage;