import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VerificationCodeInput = ({ onCodeChange, onSubmit, isLoading, error }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    onCodeChange(code?.join(''));
  }, [code, onCodeChange]);

  const handleInputChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !code?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
    
    if (e?.key === 'Enter' && code?.every(digit => digit)) {
      onSubmit();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.slice(0, 6);
    const newCode = pastedData?.split('')?.concat(Array(6)?.fill(''))?.slice(0, 6);
    setCode(newCode);
    
    // Focus the last filled input or first empty one
    const lastFilledIndex = newCode?.findIndex(digit => !digit);
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.max(0, lastFilledIndex - 1);
    inputRefs?.current?.[focusIndex]?.focus();
  };

  const isCodeComplete = code?.every(digit => digit);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground text-center">
          Enter Verification Code
        </label>
        
        <div className="flex justify-center space-x-3">
          {code?.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e?.target?.value?.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-lg font-semibold bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition ${
                error ? 'border-destructive' : 'border-border hover:border-primary/50'
              } ${digit ? 'text-foreground glow-effect' : 'text-muted-foreground'}`}
              disabled={isLoading}
            />
          ))}
        </div>
        
        {error && (
          <div className="flex items-center justify-center space-x-2 text-destructive text-sm">
            <Icon name="AlertCircle" size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          disabled={!isCodeComplete || isLoading}
          className={`px-8 py-3 rounded-lg font-medium smooth-transition ${
            isCodeComplete && !isLoading
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-effect hover:shadow-glow-lg micro-interaction'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={18} />
              <span>Verify Email</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default VerificationCodeInput;