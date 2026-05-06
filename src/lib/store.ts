import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, mockStudent, mockAdmin, Test, Question, TestResult, mockTests, mockQuestions, mockResults } from './mock-data';

// --- Auth Store ---
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: 'student' | 'admin') => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, role) => {
        // Mock authentication logic
        if (role === 'admin' && email === 'admin@aptitude.in') {
          set({ user: mockAdmin, isAuthenticated: true });
          return true;
        } else if (role === 'student' && email === 'aarav.sharma@example.com') {
          set({ user: mockStudent, isAuthenticated: true });
          return true;
        }
        // Fallback for demo purposes - allow any email if it ends with .com
        if (email.includes('@')) {
          const newUser: User = {
            id: role === 'admin' ? 'ad_' + Math.random().toString(36).substr(2, 5) : 'st_' + Math.random().toString(36).substr(2, 5),
            name: email.split('@')[0],
            email: email,
            role: role,
          };
          set({ user: newUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// --- Data Store (Tests, Questions, Students, Results) ---
interface DataState {
  tests: Test[];
  questions: Question[];
  results: TestResult[];
  students: User[];
  
  // Test Actions
  addTest: (test: Test) => void;
  updateTest: (testId: string, test: Partial<Test>) => void;
  deleteTest: (testId: string) => void;
  
  // Question Actions
  addQuestion: (question: Question) => void;
  updateQuestion: (questionId: string, question: Partial<Question>) => void;
  deleteQuestion: (questionId: string) => void;
  
  // Result Actions
  addResult: (result: TestResult) => void;
  
  // Student Actions
  addStudent: (student: User) => void;
  deleteStudent: (studentId: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      tests: mockTests,
      questions: mockQuestions,
      results: mockResults,
      students: [mockStudent], // Initial students
      
      addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
      updateTest: (testId, updatedTest) => set((state) => ({
        tests: state.tests.map(t => t.id === testId ? { ...t, ...updatedTest } : t)
      })),
      deleteTest: (testId) => set((state) => ({
        tests: state.tests.filter(t => t.id !== testId),
        questions: state.questions.filter(q => q.testId !== testId) // Cascade delete questions
      })),
      
      addQuestion: (question) => set((state) => ({ questions: [...state.questions, question] })),
      updateQuestion: (questionId, updatedQuestion) => set((state) => ({
        questions: state.questions.map(q => q.id === questionId ? { ...q, ...updatedQuestion } : q)
      })),
      deleteQuestion: (questionId) => set((state) => ({
        questions: state.questions.filter(q => q.id !== questionId)
      })),
      
      addResult: (result) => set((state) => ({ results: [result, ...state.results] })),
      
      addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
      deleteStudent: (studentId) => set((state) => ({
        students: state.students.filter(s => s.id !== studentId)
      })),
    }),
    {
      name: 'data-storage',
    }
  )
);

// --- Test Session Store ---
interface TestSessionState {
  testId: string | null;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  currentQuestionIndex: number;
  timeRemainingSeconds: number | null;
  isTestActive: boolean;
  
  startTest: (testId: string, durationMinutes: number) => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  setQuestionIndex: (index: number) => void;
  decrementTime: () => void;
  endTest: () => void;
}

export const useTestStore = create<TestSessionState>()(
  persist(
    (set, get) => ({
      testId: null,
      answers: {},
      currentQuestionIndex: 0,
      timeRemainingSeconds: null,
      isTestActive: false,

      startTest: (testId, durationMinutes) => 
        set({ 
          testId, 
          answers: {}, 
          currentQuestionIndex: 0, 
          timeRemainingSeconds: durationMinutes * 60,
          isTestActive: true 
        }),
        
      selectAnswer: (questionId, optionIndex) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionIndex }
        })),
        
      setQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      
      decrementTime: () => set((state) => ({
        timeRemainingSeconds: state.timeRemainingSeconds !== null && state.timeRemainingSeconds > 0 
          ? state.timeRemainingSeconds - 1 
          : 0
      })),
      
      endTest: () => set({
        testId: null,
        answers: {},
        currentQuestionIndex: 0,
        timeRemainingSeconds: null,
        isTestActive: false
      }),
    }),
    {
      name: 'test-session-storage',
    }
  )
);
