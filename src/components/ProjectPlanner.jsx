import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { createEvent } from '../supabaseClient';

function ProjectPlanner() {
  const [projectType, setProjectType] = createSignal('');
  const [material, setMaterial] = createSignal('');
  const [team, setTeam] = createSignal([]);
  const [feedback, setFeedback] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const handlePlanProject = async () => {
    if (projectType() && material() && team().length > 0) {
      setLoading(true);
      const projectDetails = {
        projectType: projectType(),
        material: material(),
        team: team(),
      };

      try {
        const prompt = `Provide feedback on planning a ${projectType()} using ${material()} with a team of ${team().join(', ')}.`;

        const result = await createEvent('chatgpt_request', {
          prompt,
          response_type: 'text',
        });

        setFeedback(result);
      } catch (error) {
        console.error('Error generating feedback:', error);
        setFeedback('There was an error generating feedback.');
      } finally {
        setLoading(false);
      }
    } else {
      setFeedback('Please complete all fields to plan your project.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const toggleTeamMember = (member) => {
    if (team().includes(member)) {
      setTeam(team().filter((m) => m !== member));
    } else {
      setTeam([...team(), member]);
    }
  };

  return (
    <div class="p-6">
      <button
        class="mb-4 text-blue-500 underline cursor-pointer"
        onClick={handleBack}
      >
        &larr; Back to Home
      </button>
      <h2 class="text-3xl font-bold text-blue-700 mb-6">Plan a Construction Project</h2>
      <div class="space-y-6 mb-6">
        <div>
          <label class="block text-lg font-semibold mb-2">Select Project Type:</label>
          <select
            class="w-full p-3 border border-gray-300 rounded-lg box-border"
            value={projectType()}
            onInput={(e) => setProjectType(e.target.value)}
          >
            <option value="">Choose a project</option>
            <option value="House">House</option>
            <option value="Bridge">Bridge</option>
            <option value="School">School</option>
          </select>
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Choose Materials:</label>
          <select
            class="w-full p-3 border border-gray-300 rounded-lg box-border"
            value={material()}
            onInput={(e) => setMaterial(e.target.value)}
          >
            <option value="">Select material</option>
            <option value="Wood">Wood</option>
            <option value="Steel">Steel</option>
            <option value="Concrete">Concrete</option>
          </select>
        </div>
        <div>
          <label class="block text-lg font-semibold mb-2">Select Team Members:</label>
          <div class="flex flex-wrap">
            {['Architect', 'Engineer', 'Builder', 'Electrician', 'Plumber'].map((member) => (
              <div class="mr-4 mb-2">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={team().includes(member)}
                    onChange={() => toggleTeamMember(member)}
                  />
                  <span class="ml-2">{member}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        class={`bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handlePlanProject}
        disabled={loading()}
      >
        {loading() ? 'Planning...' : 'Plan Project'}
      </button>
      {feedback() && (
        <p class="mt-4 text-lg font-semibold">{feedback()}</p>
      )}
    </div>
  );
}

export default ProjectPlanner;