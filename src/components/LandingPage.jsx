import { useNavigate } from '@solidjs/router';

function LandingPage() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/roles');
  };

  return (
    <div class="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-blue-100 to-green-100">
      <h1 class="text-5xl font-extrabold text-orange-600 mb-4">
        Welcome to Construction Career!
      </h1>
      <p class="text-xl text-center mb-6">
        Join <span class="text-orange-500">Constructor Carl</span> on a fun
        adventure and explore the exciting world of construction!
      </p>
      <img src="https://images.unsplash.com/photo-1533378890784-b2a5b0a59d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw3fHxjYXJ0b29uJTIwY29uc3RydWN0aW9uJTIwbWFzY290JTIwY2hhcmFjdGVyJTIwd2F2aW5nJTIwYXQlMjBraWRzJTIwb24lMjBhJTIwYnVpbGRpbmclMjBzaXRlfGVufDB8fHx8MTczMDk3ODAwOHww&ixlib=rb-4.0.3&q=80&w=1080"
        
        alt="Constructor Carl waving"
        class="w-full max-w-md mb-6"
        data-image-request="cartoon construction mascot character waving at kids on a building site"
      />
      <button
        class="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 cursor-pointer"
        onClick={handleExplore}
      >
        Let's Build!
      </button>
    </div>
  );
}

export default LandingPage;