import { createSignal, onMount } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';

function QuizPage() {
  const [questions, setQuestions] = createSignal([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [selectedOption, setSelectedOption] = createSignal(null);
  const [score, setScore] = createSignal(0);
  const [quizCompleted, setQuizCompleted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();
  const params = useParams();

  const fetchQuizQuestions = async () => {
    setLoading(true);
    const response = await fetch(`/api/getQuizQuestions?roleTitle=${params.roleTitle}`);
    if (response.ok) {
      const data = await response.json();
      setQuestions(data.questions);
    } else {
      console.error('Error fetching quiz questions:', response.statusText);
    }
    setLoading(false);
  };

  onMount(fetchQuizQuestions);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption() === questions()[currentQuestionIndex()].correctAnswer) {
      setScore(score() + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex() + 1 < questions().length) {
      setCurrentQuestionIndex(currentQuestionIndex() + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleBack = () => {
    navigate('/roles');
  };

  return (
    <div class="p-6">
      <button
        class="mb-4 text-blue-500 underline cursor-pointer"
        onClick={handleBack}
      >
        &larr; Back to Roles
      </button>
      {loading() ? (
        <p>Loading...</p>
      ) : quizCompleted() ? (
        <div class="text-center">
          <h2 class="text-3xl font-bold text-blue-700 mb-4">Quiz Completed!</h2>
          <p class="text-lg mb-6">Your Score: {score()} / {questions().length}</p>
          <button
            class="bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 mb-4"
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </button>
        </div>
      ) : questions().length > 0 ? (
        <div>
          <h2 class="text-2xl font-bold text-blue-700 mb-4">
            Question {currentQuestionIndex() + 1} of {questions().length}
          </h2>
          <p class="text-lg mb-6">{questions()[currentQuestionIndex()].question}</p>
          <div class="space-y-4 mb-6">
            {questions()[currentQuestionIndex()].options.map((option) => (
              <div
                class={`p-4 border rounded-lg cursor-pointer ${
                  selectedOption() === option ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
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
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}

export default QuizPage;