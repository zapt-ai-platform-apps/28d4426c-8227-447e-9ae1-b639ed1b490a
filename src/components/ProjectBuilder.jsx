import { createSignal, Show, For, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function ProjectBuilder() {
  const [sceneItems, setSceneItems] = createSignal([]);
  const [availableItems, setAvailableItems] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [feedback, setFeedback] = createSignal('');
  const navigate = useNavigate();

  const fetchAvailableItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getAvailableItems');
      if (response.ok) {
        const data = await response.json();
        setAvailableItems(data.items);
      } else {
        console.error('Error fetching items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchAvailableItems);

  const handleAddItem = (item) => {
    setSceneItems([...sceneItems(), { ...item, id: Date.now() }]);
  };

  const handleSaveScene = () => {
    setFeedback('Your scene has been saved to your Toolbox!');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div class="p-6 h-full bg-gradient-to-br from-yellow-100 to-orange-100">
      <button
        class="mb-4 text-blue-500 underline cursor-pointer"
        onClick={handleBack}
      >
        &larr; Back to Home
      </button>
      <h2 class="text-4xl font-bold text-orange-600 mb-4">
        Build Your Construction Scene!
      </h2>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/4 p-2">
          <h3 class="text-2xl font-semibold mb-2">Available Items</h3>
          <Show when={loading()}>
            <p>Loading...</p>
          </Show>
          <Show when={!loading()}>
            <div class="grid grid-cols-2 gap-2">
              <For each={availableItems()}>
                {(item) => (
                  <img
                    src={item.image}
                    alt={item.name}
                    class="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-105 transition duration-300"
                    onClick={() => handleAddItem(item)}
                  />
                )}
              </For>
            </div>
          </Show>
        </div>
        <div class="w-full md:w-3/4 p-2">
          <h3 class="text-2xl font-semibold mb-2">Your Scene</h3>
          <div class="relative w-full h-96 bg-blue-100 border border-gray-300 rounded-lg overflow-hidden">
            <For each={sceneItems()}>
              {(item) => (
                <img
                  src={item.image}
                  alt={item.name}
                  class="absolute top-0 left-0 w-20 h-20 object-cover cursor-move"
                  style={{
                    transform: `translate(${Math.random() * 80}%, ${
                      Math.random() * 80
                    }%)`,
                  }}
                />
              )}
            </For>
          </div>
          <button
            class="mt-4 bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={handleSaveScene}
          >
            Save Scene
          </button>
          <Show when={feedback()}>
            <p class="mt-2 text-lg">{feedback()}</p>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default ProjectBuilder;