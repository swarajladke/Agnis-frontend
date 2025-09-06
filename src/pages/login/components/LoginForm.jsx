import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'user@agnisai.com',
    password: 'AgnisPro2025!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/chat-interface');
      } else {
        // Invalid credentials
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    navigate('/chat-interface');
  };

  const handleCreateAccount = () => {
    navigate('/user-registration');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 glow-effect">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 glow-effect">
            <Icon name="LogIn" size={32} color="var(--color-primary-foreground)" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Agnis AI account</p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={18} className="text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="glow-border focus:shadow-glow-lg"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="glow-border focus:shadow-glow-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground smooth-transition"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              className="text-sm"
            />
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 smooth-transition glow-effect"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            fullWidth
            className="h-12 text-base font-medium glow-effect hover:shadow-glow-lg"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">or</span>
          </div>
        </div>

        {/* Continue as Guest */}
        <Button
          variant="outline"
          onClick={handleContinueAsGuest}
          fullWidth
          className="h-12 text-base font-medium mb-6 glow-effect hover:shadow-glow-lg"
          iconName="UserCheck"
          iconPosition="left"
          iconSize={20}
        >
          Continue as Guest
        </Button>

        {/* Create Account Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={handleCreateAccount}
              className="text-primary hover:text-primary/80 font-medium smooth-transition glow-effect"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
      {/* Mock Credentials Info */}
      <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Demo Credentials:</p>
            <p>Email: {mockCredentials?.email}</p>
            <p>Password: {mockCredentials?.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;