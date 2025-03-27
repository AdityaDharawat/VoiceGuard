import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiMail, FiChevronRight, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signInWithGoogle, signInWithGitHub } from '../services/authService';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Form submitted:', formData);
      alert(isLogin ? 'Login successful!' : 'Account created successfully!');
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Authentication failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Google sign-in failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGitHub();
    } catch (err) {
      setError((err instanceof Error ? err.message : 'GitHub sign-in failed'));
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setUseEmail(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const panelVariants = {
    hidden: { x: isLogin ? -100 : 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: isLogin ? 100 : -100, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-6xl bg-gray-800 bg-opacity-30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col lg:flex-row"
      >
        {/* Left Section - Content (50% width on large screens) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={isLogin ? 'login-content' : 'signup-content'}
            variants={panelVariants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`w-full lg:w-1/2 p-12 ${isLogin ? 'bg-gradient-to-br from-blue-600 to-purple-700' : 'bg-gradient-to-br from-purple-600 to-blue-700'}`}
          >
            <div className="h-full flex flex-col justify-center">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-8 text-center lg:text-left"
                variants={itemVariants}
              >
                {isLogin ? 'Welcome Back!' : 'Create Your Account'}
              </motion.h2>

              <motion.div className="space-y-8" variants={itemVariants}>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                    <FiShield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-3">
                      {isLogin ? 'Secure Access' : 'Get Started'}
                    </h3>
                    <p className="text-gray-200 text-lg">
                      {isLogin 
                        ? 'Access your account with industry-standard security' 
                        : 'Create your account in just a few simple steps'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                    <FiUser className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-3">
                      {isLogin ? 'Your Data' : 'Your Privacy'}
                    </h3>
                    <p className="text-gray-200 text-lg">
                      {isLogin
                        ? 'Your information is always encrypted and protected'
                        : 'We use end-to-end encryption to keep your data safe'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Section - Form (50% width on large screens) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={isLogin ? 'login-form' : 'signup-form'}
            variants={panelVariants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full lg:w-1/2 p-12 bg-gray-900 bg-opacity-50"
          >
            <motion.div 
              variants={containerVariants}
              className="max-w-md mx-auto"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-8 text-center lg:text-left"
                variants={itemVariants}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </motion.h2>

              {error && (
                <motion.div 
                  className="mb-6 p-4 bg-red-900 bg-opacity-50 text-red-200 rounded-lg text-base"
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              )}

              {!useEmail ? (
                <>
                  <motion.div 
                    className="space-y-6 mb-10"
                    variants={itemVariants}
                  >
                    <button 
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full py-4 px-6 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300 rounded-xl text-white flex items-center justify-center gap-3 border border-gray-700 hover:border-gray-500 disabled:opacity-50 text-lg"
                    >
                      <FaGoogle className="w-6 h-6" />
                      {loading ? 'Processing...' : 'Continue with Google'}
                    </button>
                    <button 
                      type="button"
                      onClick={handleGitHubSignIn}
                      disabled={loading}
                      className="w-full py-4 px-6 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300 rounded-xl text-white flex items-center justify-center gap-3 border border-gray-700 hover:border-gray-500 disabled:opacity-50 text-lg"
                    >
                      <FaGithub className="w-6 h-6" />
                      {loading ? 'Processing...' : 'Continue with GitHub'}
                    </button>
                  </motion.div>

                  <motion.div 
                    className="relative my-10"
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <motion.button
                        onClick={() => setUseEmail(true)}
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        Or use email
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  variants={containerVariants}
                >
                  {!isLogin && (
                    <motion.div 
                      className="flex gap-6"
                      variants={itemVariants}
                    >
                      <div className="flex-1">
                        <label className="block text-lg font-medium text-gray-300 mb-2">First Name</label>
                        <div className="relative">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-14 pr-6 py-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-white text-lg"
                            placeholder="John"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-lg font-medium text-gray-300 mb-2">Last Name</label>
                        <div className="relative">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full pl-14 pr-6 py-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-white text-lg"
                            placeholder="Doe"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants}>
                    <label className="block text-lg font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-white text-lg"
                        placeholder="your@email.com"
                        required
                        disabled={loading}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-lg font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-14 pr-16 py-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-white text-lg"
                        placeholder="••••••••"
                        minLength={8}
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                      </button>
                    </div>
                    <p className="text-base text-gray-400 mt-2">Minimum 8 characters</p>
                  </motion.div>

                  {isLogin && (
                    <motion.div 
                      variants={itemVariants}
                      className="flex justify-end"
                    >
                      <button 
                        type="button"
                        className="text-lg text-blue-400 hover:text-blue-300 transition-colors"
                        disabled={loading}
                      >
                        Forgot Password?
                      </button>
                    </motion.div>
                  )}

                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-8 py-5 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 text-xl"
                  >
                    {loading ? (
                      'Processing...'
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <FiChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </motion.button>

                  <motion.div 
                    className="mt-8 text-center"
                    variants={itemVariants}
                  >
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="text-gray-400 hover:text-white text-lg font-medium transition-colors"
                      disabled={loading}
                    >
                      {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;