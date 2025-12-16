/**
 * ES6+ Async/Await - Interview Examples
 * Async/await makes asynchronous code look synchronous
 */

// Simulate API calls
function apiCall(endpoint, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve({
          endpoint,
          data: `Response from ${endpoint}`,
          timestamp: new Date().toISOString()
        });
      } else {
        reject(new Error(`API call to ${endpoint} failed`));
      }
    }, delay);
  });
}

// Example 1: Basic async/await
async function fetchUserData(userId) {
  console.log('Starting to fetch user data...');

  try {
    const userResponse = await apiCall(`/api/users/${userId}`);
    console.log('User data received:', userResponse.data);

    const postsResponse = await apiCall(`/api/users/${userId}/posts`);
    console.log('Posts data received:', postsResponse.data);

    return {
      user: userResponse.data,
      posts: postsResponse.data
    };

  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw to allow caller to handle
  }
}

// Usage
fetchUserData(123)
  .then(result => console.log('Final result:', result))
  .catch(error => console.error('Failed:', error));

// Example 2: Parallel vs Sequential execution
async function fetchSequential(userIds) {
  console.log('=== Sequential Execution ===');
  const startTime = Date.now();

  const results = [];
  for (const userId of userIds) {
    try {
      const result = await fetchUserData(userId);
      results.push(result);
    } catch (error) {
      console.error(`Failed to fetch user ${userId}:`, error.message);
    }
  }

  const endTime = Date.now();
  console.log(`Sequential execution took ${endTime - startTime}ms`);
  return results;
}

async function fetchParallel(userIds) {
  console.log('=== Parallel Execution ===');
  const startTime = Date.now();

  // Start all requests simultaneously
  const promises = userIds.map(userId => fetchUserData(userId));

  try {
    const results = await Promise.all(promises);
    const endTime = Date.now();
    console.log(`Parallel execution took ${endTime - startTime}ms`);
    return results;
  } catch (error) {
    console.error('One of the parallel requests failed:', error.message);
    throw error;
  }
}

// Example 3: Error handling patterns
async function fetchWithRetry(endpoint, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} for ${endpoint}`);
      const result = await apiCall(endpoint);
      console.log(`Success on attempt ${attempt}`);
      return result;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Example 4: Async in loops
async function processUsers(users) {
  // Wrong way - doesn't wait for each iteration
  console.log('=== Wrong way (parallel but unordered) ===');
  const promises = users.map(async (user) => {
    const data = await apiCall(`/api/users/${user.id}`);
    return { user, data };
  });

  const results1 = await Promise.all(promises);
  console.log('Results (may be in different order):', results1.map(r => r.user.name));

  // Right way for sequential processing
  console.log('=== Right way (sequential) ===');
  const results2 = [];
  for (const user of users) {
    try {
      const data = await apiCall(`/api/users/${user.id}`);
      results2.push({ user, data });
      console.log(`Processed ${user.name}`);
    } catch (error) {
      console.error(`Failed to process ${user.name}:`, error.message);
    }
  }

  console.log('All users processed sequentially');
}

// Example 5: Async iterators (ES2018)
async function* asyncRange(start, end, delay = 500) {
  for (let i = start; i <= end; i++) {
    yield i;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

async function processAsyncRange() {
  console.log('=== Async Iterator Example ===');

  // Using for-await-of
  for await (const num of asyncRange(1, 5)) {
    console.log(`Processing number: ${num}`);
  }

  console.log('Async iteration complete');
}

// Example 6: Top-level await (ES2022)
async function initializeApp() {
  console.log('Initializing application...');

  try {
    // Fetch configuration
    const config = await apiCall('/api/config');
    console.log('Config loaded:', config.data);

    // Fetch user preferences
    const preferences = await apiCall('/api/preferences');
    console.log('Preferences loaded:', preferences.data);

    // Initialize components
    await initializeComponents(config, preferences);

    console.log('Application initialized successfully');
    return { config, preferences };

  } catch (error) {
    console.error('Failed to initialize app:', error.message);
    // Fallback initialization
    return initializeFallback();
  }
}

async function initializeComponents(config, preferences) {
  // Simulate component initialization
  console.log('Initializing components...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Components initialized');
}

async function initializeFallback() {
  console.log('Using fallback initialization');
  return { config: 'default', preferences: 'default' };
}

// Example 7: Async function expressions and methods
const userService = {
  // Async method
  async getUser(id) {
    const response = await apiCall(`/api/users/${id}`);
    return response.data;
  },

  // Async arrow function method
  fetchPosts: async (userId) => {
    const response = await apiCall(`/api/users/${userId}/posts`);
    return response.data;
  },

  // Async function as property
  updateUser: async function(id, data) {
    const response = await apiCall(`/api/users/${id}`, 'PUT', data);
    return response.data;
  }
};

// Example 8: Mixing async/await with Promise methods
async function complexDataProcessing() {
  console.log('=== Complex Data Processing ===');

  const userIds = [1, 2, 3, 4, 5];

  // Use Promise.allSettled for partial failures
  const results = await Promise.allSettled(
    userIds.map(id => fetchUserData(id))
  );

  const successful = results.filter(result => result.status === 'fulfilled');
  const failed = results.filter(result => result.status === 'rejected');

  console.log(`${successful.length} requests succeeded`);
  console.log(`${failed.length} requests failed`);

  // Process successful results
  const processedData = successful.map(result => ({
    userId: result.value.user.id,
    postCount: result.value.posts.length
  }));

  console.log('Processed data:', processedData);

  // Handle failures
  failed.forEach((failure, index) => {
    console.error(`Request ${index + 1} failed:`, failure.reason.message);
  });

  return processedData;
}

// Example 9: Async generators with for-await-of
async function* fetchPages(apiEndpoint, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const response = await apiCall(`${apiEndpoint}?page=${page}`);
    yield {
      page,
      data: response.data,
      hasMore: page < totalPages
    };
  }
}

async function processAllPages() {
  console.log('=== Processing All Pages ===');

  let totalItems = 0;
  for await (const pageData of fetchPages('/api/items', 3)) {
    console.log(`Page ${pageData.page}: ${pageData.data.length} items`);
    totalItems += pageData.data.length;

    if (!pageData.hasMore) {
      console.log(`Finished processing ${totalItems} total items`);
    }
  }
}

// Demo execution
async function runAllExamples() {
  try {
    console.log('🚀 Starting Async/Await Examples\n');

    // Basic example
    await fetchUserData(1);

    // Sequential vs Parallel
    const userIds = [1, 2, 3];
    await fetchSequential(userIds.slice(0, 2));
    await fetchParallel(userIds.slice(0, 2));

    // Retry logic
    await fetchWithRetry('/api/reliable-endpoint');

    // Loop processing
    const sampleUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    await processUsers(sampleUsers);

    // Async iterators
    await processAsyncRange();

    // App initialization
    const appData = await initializeApp();
    console.log('App initialized with:', appData);

    // Complex processing
    await complexDataProcessing();

    // Page processing
    await processAllPages();

    console.log('\n✅ All async/await examples completed successfully!');

  } catch (error) {
    console.error('❌ Example execution failed:', error.message);
  }
}

// Export for use in other modules or run directly
if (require.main === module) {
  runAllExamples();
}

module.exports = {
  fetchUserData,
  fetchSequential,
  fetchParallel,
  fetchWithRetry,
  apiCall,
  runAllExamples
};
