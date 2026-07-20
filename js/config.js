/**
 * CONFIG.md izohi: bu faylda backend manzili va barcha endpoint yo'llari
 * bitta joyda jamlangan. Backend https://vocabulary-game.duckdns.org manzilidagi
 * swagger-ui hujjatiga qarab, quyidagi yo'llarni haqiqiy nomlar bilan
 * moslashtiring (nomlar taxminiy REST konventsiyasi asosida qo'yilgan).
 */
const CONFIG = {
  API_BASE_URL: 'https://vocabulary-game.duckdns.org',

  ENDPOINTS: {
    // Auth
    register: '/api/auth/register',
    verifyEmail: '/api/auth/verify-email',
    resendCode: '/api/auth/resend-code',
    login: '/api/auth/login',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    me: '/api/users/me',

    // Learner
    lessons: '/api/lessons',
    lesson: (id) => `/api/lessons/${id}`,
    startTest: (lessonId) => `/api/lessons/${lessonId}/start-test`,
    submitAnswer: (attemptId) => `/api/tests/${attemptId}/answer`,
    skipQuestion: (attemptId) => `/api/tests/${attemptId}/skip`,
    finishTest: (attemptId) => `/api/tests/${attemptId}/finish`,
    testAttempt: (attemptId) => `/api/tests/${attemptId}`,
    myTests: '/api/tests/my',
    leaderboard: '/api/leaderboard',

    // Admin
    adminStats: '/api/admin/stats',
    adminLessons: '/api/admin/lessons',
    adminLesson: (id) => `/api/admin/lessons/${id}`,
    adminWords: '/api/admin/words',
    adminWord: (id) => `/api/admin/words/${id}`,
    adminUsers: '/api/admin/users',
    adminUser: (id) => `/api/admin/users/${id}`,
    adminTestHistory: '/api/admin/test-history',
  },

  TOKEN_KEY: 'vt_token',
  USER_KEY: 'vt_user',
  QUESTIONS_PER_TEST: 10,
};
