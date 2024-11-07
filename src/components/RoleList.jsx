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
    <div class="p-6 h-full bg-gradient-to-br from-green-100 to-blue-100">
      <h2 class="text-4xl font-bold text-orange-600 mb-4 text-center">
        Choose a Role to Explore!
      </h2>
      <Show when={loading()}>
        <p>Loading...</p>
      </Show>
      <Show
        when={!loading() && roles().length > 0}
        fallback={<p>No roles available.</p>}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={roles()}>
            {(role) => (
              <div
                class="bg-white p-4 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
                onClick={() => handleRoleClick(role.title)}
              >
                <img
                  src={role.image}
                  alt={role.title}
                  class="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 class="text-2xl font-semibold text-blue-700 mb-2">
                  {role.title}
                </h3>
                <p class="text-gray-700">{role.description}</p>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default RoleList;