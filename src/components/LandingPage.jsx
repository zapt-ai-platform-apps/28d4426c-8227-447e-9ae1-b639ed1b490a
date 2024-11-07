import { useNavigate } from '@solidjs/router';

function LandingPage() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/roles');
  };

  return (
    <div class="flex flex-col items-center justify-center h-full p-6">
      <h1 class="text-4xl font-bold text-blue-700 mb-4">Welcome to Construction Career</h1>
      <p class="text-lg text-center mb-6">
        Explore exciting construction careers with Tilbury Douglas!
      </p>
      <img src="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwd2l0aCUyMGtpZHMlMjBsZWFybmluZ3xlbnwwfHx8fDE3MzA5NzI3Mzd8MA&ixlib=rb-4.0.3&q=80&w=1080"
        
        alt="Construction site"
        class="w-full max-w-md mb-6"
        data-image-request="construction site with kids learning"
      />
      <button
        class="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
        onClick={handleExplore}
      >
        Explore Careers
      </button>
    </div>
  );
}

export default LandingPage;