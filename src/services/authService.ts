export const signInWithGoogle = async (): Promise<void> => {
  // Simulate Google sign-in logic
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Simulate success or failure
      if (success) {
        resolve();
      } else {
        reject(new Error('Google sign-in failed'));
      }
    }, 1000); // Simulate network delay
  });
};

export const signInWithGitHub = async (): Promise<void> => {
  // Simulate GitHub sign-in logic
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Simulate success or failure
      if (success) {
        resolve();
      } else {
        reject(new Error('GitHub sign-in failed'));
      }
    }, 1000); // Simulate network delay
  });
};
