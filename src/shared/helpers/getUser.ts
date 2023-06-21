export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch (err) {
    return null;
  }
};

// Function to refresh user data
const refreshUserData = () => {
  // Place your logic here to refresh the user data
  // For example, you can make an API call to fetch the latest user data and update it in localStorage

  // After refreshing the user data, update the 'user' in localStorage
  const updatedUser = getCurrentUser();
  if (updatedUser) {
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
};

// Refresh user data every 5 seconds
setInterval(refreshUserData, 5000);
