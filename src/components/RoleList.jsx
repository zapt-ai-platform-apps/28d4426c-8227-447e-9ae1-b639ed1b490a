import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function RoleList() {
  const [roles, setRoles] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const fetchRoles = async () => {
    setLoading(true);
    const response = await fetch('/api/getRoles');
    if (response.ok) {
      const data = await response.json();
      setRoles(data.roles);
    } else {
      console.error('Error fetching roles:', response.statusText);
    }
    setLoading(false);
  };

  onMount(fetchRoles);

  const handleRoleClick = (id) => {
    navigate(`/roles/${id}`);
  };

  return (
    <div class="p-6">
      <h2 class="text-3xl font-bold text-blue-700 mb-4">Construction Roles</h2>
      {loading() ? (
        <p>Loading...</p>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles().map((role) => (
            <div
              class="bg-white p-4 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={() => handleRoleClick(role.title)}
            >
              <img
                src={role.image}
                alt={role.title}
                class="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 class="text-xl font-semibold text-blue-600">{role.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoleList;