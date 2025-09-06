import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataPrivacySection = ({ privacySettings, onPrivacyChange }) => {
  const [settings, setSettings] = useState(privacySettings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const privacyOptions = [
    {
      key: 'dataCollection',
      title: 'Data Collection',
      description: 'Allow collection of usage data to improve AI responses',
      icon: 'Database',
      critical: false
    },
    {
      key: 'conversationAnalytics',
      title: 'Conversation Analytics',
      description: 'Analyze conversation patterns for personalized recommendations',
      icon: 'BarChart3',
      critical: false
    },
    {
      key: 'fileStorage',
      title: 'File Storage',
      description: 'Store uploaded files for future reference and analysis',
      icon: 'FileText',
      critical: false
    },
    {
      key: 'shareWithTeam',
      title: 'Share with Development Team',
      description: 'Share anonymized data with our team to improve AI models',
      icon: 'Users',
      critical: false
    },
    {
      key: 'thirdPartyIntegrations',
      title: 'Third-party Integrations',
      description: 'Allow integrations with external services and APIs',
      icon: 'Link',
      critical: false
    },
    {
      key: 'marketingCommunications',
      title: 'Marketing Communications',
      description: 'Receive updates about new features and product announcements',
      icon: 'Mail',
      critical: false
    }
  ];

  const dataRetentionOptions = [
    { value: '30', label: '30 Days', description: 'Minimal retention period' },
    { value: '90', label: '90 Days', description: 'Standard retention period' },
    { value: '365', label: '1 Year', description: 'Extended retention period' },
    { value: 'indefinite', label: 'Indefinite', description: 'Keep data until manually deleted' }
  ];

  const handlePrivacyToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings?.[key]
    };
    setSettings(newSettings);
    onPrivacyChange(newSettings);
  };

  const handleRetentionChange = (period) => {
    const newSettings = { ...settings, dataRetention: period };
    setSettings(newSettings);
    onPrivacyChange(newSettings);
  };

  const handleExportData = () => {
    setShowExportModal(true);
    // Simulate data export
    setTimeout(() => {
      setShowExportModal(false);
      // In a real app, this would trigger a download
      alert('Your data export has been prepared and will be sent to your email.');
    }, 3000);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    // In a real app, this would trigger account deletion process
    alert('Account deletion request has been submitted. You will receive a confirmation email.');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 glow-effect">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-destructive" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Data & Privacy</h2>
          <p className="text-sm text-muted-foreground">Manage your data privacy and account settings</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Privacy Controls */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Privacy Controls</h3>
          <div className="space-y-4">
            {privacyOptions?.map((option) => (
              <div key={option?.key} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mt-0.5">
                    <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{option?.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{option?.description}</p>
                    {option?.critical && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Icon name="AlertTriangle" size={12} className="text-warning" />
                        <span className="text-xs text-warning">Required for core functionality</span>
                      </div>
                    )}
                  </div>
                </div>
                <Checkbox
                  checked={settings?.[option?.key]}
                  onChange={() => handlePrivacyToggle(option?.key)}
                  disabled={option?.critical}
                  className="ml-4"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Data Retention Period</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {dataRetentionOptions?.map((option) => (
              <div
                key={option?.value}
                onClick={() => handleRetentionChange(option?.value)}
                className={`p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
                  settings?.dataRetention === option?.value
                    ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{option?.label}</h4>
                  {settings?.dataRetention === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{option?.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-warning mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Data Retention Notice</h4>
                <p className="text-xs text-muted-foreground">
                  Changing your data retention period will affect how long your conversations and files are stored. 
                  This change will apply to new data going forward.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Data Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Export Data */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Download" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Export Your Data</h4>
                  <p className="text-xs text-muted-foreground">Download all your conversations and files</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleExportData}
                disabled={showExportModal}
                iconName={showExportModal ? "Loader2" : "Download"}
                iconPosition="left"
                iconSize={16}
                className="w-full glow-effect hover:shadow-glow-lg"
              >
                {showExportModal ? 'Preparing Export...' : 'Export Data'}
              </Button>
            </div>

            {/* Clear Chat History */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Trash2" size={16} className="text-warning" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Clear Chat History</h4>
                  <p className="text-xs text-muted-foreground">Delete all your conversation history</p>
                </div>
              </div>
              <Button
                variant="outline"
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="w-full text-warning border-warning hover:bg-warning/10"
              >
                Clear History
              </Button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Account Actions</h3>
          <div className="space-y-4">
            {/* Account Statistics */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium text-foreground text-sm mb-3">Account Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">1,247</div>
                  <div className="text-xs text-muted-foreground">Messages Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-success">89</div>
                  <div className="text-xs text-muted-foreground">Files Uploaded</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-accent">156</div>
                  <div className="text-xs text-muted-foreground">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-warning">2.4 GB</div>
                  <div className="text-xs text-muted-foreground">Data Stored</div>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="flex items-start space-x-3 mb-4">
                <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-1">Delete Account</h4>
                  <p className="text-xs text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="glow-effect hover:shadow-glow-lg"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full glow-effect">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Account Deletion</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-foreground mb-4">
                Are you sure you want to delete your account? This will permanently remove:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• All your conversations and chat history</li>
                <li>• Uploaded files and documents</li>
                <li>• Personal settings and preferences</li>
                <li>• Account information and subscription</li>
              </ul>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="ghost"
          iconName="FileText"
          iconPosition="left"
          iconSize={16}
        >
          Privacy Policy
        </Button>
        <Button
          variant="default"
          iconName="Shield"
          iconPosition="left"
          iconSize={16}
          className="glow-effect hover:shadow-glow-lg"
        >
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default DataPrivacySection;