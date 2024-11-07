import { createSignal, onMount } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';

function RoleDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [role, setRole] = createSignal(null);

  const fetchRoleDetail = async () => {
    // Replace with actual API call to fetch role details
    const response = await fetch(`/api/getRoleDetail?id=${params.id}`);
    if (response.ok) {
      const data = await response.json();
      setRole(data.role);
    } else {
      console.error('Error fetching role details:', response.statusText);
    }
  };

  onMount(fetchRoleDetail);

  const handleBack = () => {
    navigate('/roles');
  };

  const handleQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div class="p-6">
      <button
        class="mb-4 text-blue-500 underline cursor-pointer"
        onClick={handleBack}
      >
        &larr; Back to Roles
      </button>
      {role() ? (
        <div>
          <h2 class="text-3xl font-bold text-blue-700 mb-4">{role().title}</h2>
          <img
            src={role().image}
            alt={role().title}
            class="w-full h-64 object-cover rounded-md mb-6"
          />
          <p class="text-lg mb-4">{role().description}</p>
          <h3 class="text-2xl font-semibold text-blue-600 mb-2">Required Skills</h3>
          <ul class="list-disc list-inside mb-4">
            {role().skills.map((skill) => (
              <li>{skill}</li>
            ))}
          </ul>
          <h3 class="text-2xl font-semibold text-blue-600 mb-2">Educational Path</h3>
          <p class="mb-4">{role().education}</p>
          <button
            class="bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
            onClick={handleQuiz}
          >
            Take Quiz
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RoleDetail;