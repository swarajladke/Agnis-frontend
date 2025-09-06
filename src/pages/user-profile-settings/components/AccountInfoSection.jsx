import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountInfoSection = ({ userInfo, onUpdateInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    phone: userInfo?.phone || '',
    bio: userInfo?.bio || ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData?.phone && !/^\+?[\d\s-()]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateInfo(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone || '',
      bio: userInfo?.bio || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 glow-effect">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Account Information</h2>
            <p className="text-sm text-muted-foreground">Manage your personal details and preferences</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
            className="glow-effect hover:shadow-glow-lg"
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            disabled={!isEditing}
            required
            className="mb-4"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            disabled={!isEditing}
            required
            className="mb-4"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            disabled={!isEditing}
            placeholder="Optional"
            className="mb-4"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              value={formData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed smooth-transition resize-none"
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Subscription Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success font-medium">Pro Plan</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Active until December 6, 2025 • Unlimited chats & file uploads
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-primary hover:text-primary/80"
            >
              Manage Subscription
            </Button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
            className="glow-effect hover:shadow-glow-lg"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountInfoSection;