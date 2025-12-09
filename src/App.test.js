import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the Firebase imports so tests don't fail due to environment variables
// This prevents errors when the test runner tries to initialize Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInAnonymously: jest.fn(),
  signInWithCustomToken: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    // Simulate user being signed in after component renders
    callback({ uid: 'mock-user-id' }); 
    return jest.fn(); // return an unsubscribe function
  }),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
}));


// The actual test suite for the App component
describe('App Component Structure', () => {

  test('renders the main portal title (GovConnect)', () => {
    render(<App />);
    // Check for the main heading text which includes "Gov" and "Connect"
    const titleElement = screen.getByText(/GovConnect/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the main navigation tabs correctly', () => {
    render(<App />);
    
    // Check for specific navigation tab text
    const schemesTab = screen.getByText('Schemes');
    const actsRulesTab = screen.getByText('Acts & Rules');
    const constitutionTab = screen.getByText('Constitution of India');
    const documentsTab = screen.getByText('Documents');

    expect(schemesTab).toBeInTheDocument();
    expect(actsRulesTab).toBeInTheDocument();
    expect(constitutionTab).toBeInTheDocument();
    expect(documentsTab).toBeInTheDocument();
  });

  test('renders the search bar placeholder', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search Schemes, Acts, or Forms.../i);
    expect(searchInput).toBeInTheDocument();
  });

});