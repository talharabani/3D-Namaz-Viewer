// Test Firebase Authentication Setup
import { auth } from './firebase';
import authService from './authService';

// Test function to verify Firebase configuration
export const testFirebaseConfig = () => {
  console.log('🔧 Testing Firebase Configuration...');
  console.log('Auth instance:', auth);
  console.log('Auth app:', auth.app);
  console.log('Auth config:', auth.app.options);
  
  // Check if auth is properly configured
  if (auth && auth.app) {
    console.log('✅ Firebase Auth is properly configured');
    console.log('Project ID:', auth.app.options.projectId);
    console.log('Auth Domain:', auth.app.options.authDomain);
    return true;
  } else {
    console.error('❌ Firebase Auth is not properly configured');
    return false;
  }
};

// Test authentication methods
export const testAuthMethods = async () => {
  console.log('🧪 Testing Authentication Methods...');
  
  try {
    // Test auth service instance
    console.log('Auth Service:', authService);
    console.log('Current User:', authService.getCurrentUser());
    console.log('Is Authenticated:', authService.isUserAuthenticated());
    
    console.log('✅ Authentication service is working');
    return true;
  } catch (error) {
    console.error('❌ Authentication service error:', error);
    return false;
  }
};

// Test email validation
export const testEmailValidation = () => {
  console.log('📧 Testing Email Validation...');
  
  const testEmails = [
    'test@example.com',
    'invalid-email',
    'user@domain.co.uk',
    'test.email@domain.com'
  ];
  
  testEmails.forEach(email => {
    const isValid = authService.isValidEmail(email);
    console.log(`${email}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
  });
};

// Run all tests
export const runAllAuthTests = () => {
  console.log('🚀 Running All Authentication Tests...');
  console.log('=====================================');
  
  const configTest = testFirebaseConfig();
  const methodsTest = testAuthMethods();
  testEmailValidation();
  
  console.log('=====================================');
  console.log(`Configuration Test: ${configTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Methods Test: ${methodsTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log('=====================================');
  
  return configTest && methodsTest;
};
