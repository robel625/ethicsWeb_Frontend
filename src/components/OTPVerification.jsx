import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { withTranslation } from 'react-i18next';
import i18n from '../translation';
import { postDataAPI } from '../utils/fetchData';

const OTPVerification = ({ phoneNumber, onVerificationSuccess, onClose, t }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      await postDataAPI('otp/send/', {
        phoneNumber: phoneNumber
      });
      
      notification.success({
        message: i18n.language === 'en' ? 'OTP Sent' : 'OTP ተልኳል',
        description: i18n.language === 'en' 
          ? `OTP has been sent to ${phoneNumber}` 
          : `OTP ወደ ${phoneNumber} ተልኳል`,
      });
    } catch (error) {
      notification.error({
        message: i18n.language === 'en' ? 'Error' : 'ስህተት',
        description: i18n.language === 'en' 
          ? 'Failed to send OTP. Please try again.' 
          : 'OTP መላክ አልተሳካም። እንደገና ይሞክሩ።',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      notification.error({
        message: i18n.language === 'en' ? 'Invalid OTP' : 'ትክክል ያልሆነ OTP',
        description: i18n.language === 'en' 
          ? 'Please enter a valid 6-digit OTP' 
          : 'እባክዎ ትክክለኛ 6-አሃዝ OTP ያስገቡ',
      });
      return;
    }

    setIsVerifying(true);
    try {
      const response = await postDataAPI('otp/verify/', {
        phoneNumber: phoneNumber,
        otp: otp
      });

      if (response.data.success) {
        notification.success({
          message: i18n.language === 'en' ? 'Verification Successful' : 'ማረጋገጫ ተሳክቷል',
          description: i18n.language === 'en' 
            ? 'Phone number verified successfully' 
            : 'የስልክ ቁጥር ማረጋገጫ በተሳካ ሁኔታ ተጠናቋል',
        });
        onVerificationSuccess();
      } else {
        notification.error({
          message: i18n.language === 'en' ? 'Invalid OTP' : 'ትክክል ያልሆነ OTP',
          description: i18n.language === 'en' 
            ? 'The OTP you entered is incorrect' 
            : 'ያስገቡት OTP ትክክል አይደለም',
        });
      }
    } catch (error) {
      notification.error({
        message: i18n.language === 'en' ? 'Verification Failed' : 'ማረጋገጫ አልተሳካም',
        description: i18n.language === 'en' 
          ? 'Failed to verify OTP. Please try again.' 
          : 'OTP ማረጋገጥ አልተሳካም። እንደገና ይሞክሩ።',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOTP = async () => {
    setCountdown(60);
    setCanResend(false);
    await sendOTP();
  };

  // Send OTP when component mounts
  useEffect(() => {
    sendOTP();
  }, []);

  return (
    <div className="otp-verification-popup">
      <div className="absolute right-2 top-2 cursor-pointer" onClick={onClose}>
        <svg width={20} height={20} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="mt-10">
        <div className="font-bold text-2xl mb-4">
          {i18n.language === 'en' ? 'Verify Phone Number' : 'የስልክ ቁጥር ማረጋገጫ'}
        </div>
        
        <p className="text-gray-600 mb-6">
          {i18n.language === 'en' 
            ? `We've sent a 6-digit code to ${phoneNumber}. Please enter it below.`
            : `6-አሃዝ ኮድ ወደ ${phoneNumber} ልከናል። እባክዎ ከታች ያስገቡት።`
          }
        </p>

        <div className="mb-4">
          <label className="inboxTitle text-left text-lg mb-1">
            {i18n.language === 'en' ? 'Enter OTP' : 'OTP ያስገቡ'}
          </label>
          <div className="wrapper">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              className="input3 text-lg text-center tracking-widest"
              type="number"
              placeholder="000000"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              disabled={isVerifying}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={resendOTP}
            disabled={!canResend || isLoading}
            className={`text-sm ${canResend ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400'} cursor-pointer`}
          >
            {isLoading 
              ? (i18n.language === 'en' ? 'Sending...' : 'በመላክ ላይ...')
              : canResend 
                ? (i18n.language === 'en' ? 'Resend OTP' : 'OTP እንደገና ላክ')
                : `${i18n.language === 'en' ? 'Resend in' : 'እንደገና ላክ በ'} ${countdown}s`
            }
          </button>
        </div>

        <button
          type="button"
          onClick={verifyOTP}
          disabled={isVerifying || !otp || otp.length !== 6}
          className="w-full text-white font-bold text-base px-11 border border-[#edf3f5] rounded-[30px] py-[13px] cursor-pointer transition-all duration-300 ease-in-out shadow-[0_16px_30px_rgba(23,31,114,0.2)] bg-[#F9A34C] hover:bg-[#FF825C] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isVerifying 
            ? (i18n.language === 'en' ? 'Verifying...' : 'በማረጋገጥ ላይ...')
            : (i18n.language === 'en' ? 'Verify OTP' : 'OTP አረጋግጥ')
          }
        </button>
      </div>
    </div>
  );
};

export default withTranslation()(OTPVerification);