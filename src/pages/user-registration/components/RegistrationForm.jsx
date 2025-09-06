import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import PersonaCard from './PersonaCard';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    selectedPersona: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const aiPersonas = [
    {
      id: 'professional',
      name: 'Professional Assistant',
      icon: 'Briefcase',
      description: 'Formal, precise, and business-focused communication style',
      traits: ['Formal', 'Analytical', 'Efficient']
    },
    {
      id: 'creative',
      name: 'Creative Companion',
      icon: 'Palette',
      description: 'Imaginative, inspiring, and artistic in approach',
      traits: ['Creative', 'Inspiring', 'Artistic']
    },
    {
      id: 'friendly',
      name: 'Friendly Guide',
      icon: 'Heart',
      description: 'Warm, conversational, and approachable personality',
      traits: ['Warm', 'Supportive', 'Casual']
    },
    {
      id: 'technical',
      name: 'Technical Expert',
      icon: 'Code',
      description: 'Detail-oriented, logical, and technically precise',
      traits: ['Logical', 'Precise', 'Technical']
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePersonaSelect = (personaId) => {
    setFormData(prev => ({
      ...prev,
      selectedPersona: personaId
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store registration data for email verification
      localStorage.setItem('registrationData', JSON.stringify({
        name: formData?.name,
        email: formData?.email,
        selectedPersona: formData?.selectedPersona,
        registeredAt: new Date()?.toISOString()
      }));

      navigate('/email-verification');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    // Store guest session
    localStorage.setItem('guestSession', JSON.stringify({
      isGuest: true,
      startedAt: new Date()?.toISOString()
    }));
    navigate('/chat-interface');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Create Your Account
        </h1>
        <p className="text-muted-foreground text-sm">
          Join Agnis AI and unlock your personalized assistant experience
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors?.name}
            required
            className="glow-effect focus:shadow-glow-lg"
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="glow-effect focus:shadow-glow-lg"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            description="Must be at least 8 characters with uppercase, lowercase, and number"
            required
            className="glow-effect focus:shadow-glow-lg"
          />
        </div>

        {/* AI Persona Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              Choose Your AI Persona (Optional)
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Select a personality style for your AI assistant. You can change this later.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {aiPersonas?.map((persona) => (
              <PersonaCard
                key={persona?.id}
                persona={persona}
                isSelected={formData?.selectedPersona === persona?.id}
                onSelect={handlePersonaSelect}
              />
            ))}
          </div>
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          className="glow-effect hover:shadow-glow-lg"
          iconName="UserPlus"
          iconPosition="left"
          iconSize={18}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Alternative Options */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleContinueAsGuest}
            className="micro-interaction"
            iconName="Users"
            iconPosition="left"
            iconSize={18}
          >
            Continue as Guest
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-primary hover:text-primary/80 font-medium smooth-transition"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;