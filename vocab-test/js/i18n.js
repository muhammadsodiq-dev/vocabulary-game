/**
 * Oddiy i18n tizimi. Yangi til qo'shish uchun har bir kalitga
 * yangi til kodini qo'shish kifoya (masalan `ru: "..."`).
 */
const I18N_DICT = {
  // Common
  btn_save: { uz: "Saqlash", en: "Save" },
  btn_cancel: { uz: "Bekor qilish", en: "Cancel" },
  loading: { uz: "Yuklanmoqda…", en: "Loading…" },

  // Sidebar / nav
  brand_tagline: { uz: "Lug'at o'rganish va test platformasi", en: "Vocabulary Learning & Testing Platform" },
  brand_tagline_admin: { uz: "Admin paneli", en: "Admin Panel" },
  nav_lessons: { uz: "Darslar", en: "Lessons" },
  nav_my_tests: { uz: "Mening testlarim", en: "My Tests" },
  nav_leaderboard: { uz: "Reyting", en: "Leaderboard" },
  nav_history: { uz: "Tarix", en: "History" },
  nav_profile: { uz: "Profil", en: "Profile" },
  nav_settings: { uz: "Sozlamalar", en: "Settings" },
  nav_logout: { uz: "Chiqish", en: "Logout" },
  nav_dashboard: { uz: "Bosh sahifa", en: "Dashboard" },
  nav_words: { uz: "Lug'at so'zlari", en: "Vocabulary Words" },
  nav_users: { uz: "Foydalanuvchilar", en: "Users" },
  promo_title: { uz: "Davom eting!", en: "Keep learning!" },
  promo_text: { uz: "Muntazam mashq qiling va har kuni natijangizni yaxshilang.", en: "Practice regularly and improve your score every day." },

  // Auth
  login_title: { uz: "Kirish", en: "Login" },
  login_subtitle: { uz: "Xush kelibsiz — davom etish uchun ma'lumotlaringizni kiriting.", en: "Welcome back — enter your details to continue." },
  label_email: { uz: "Email", en: "Email" },
  label_password: { uz: "Parol", en: "Password" },
  forgot_password_link: { uz: "Parolni unutdingizmi?", en: "Forgot password?" },
  btn_login: { uz: "Kirish", en: "Login" },
  no_account: { uz: "Akkountingiz yo'qmi?", en: "Don't have an account?" },
  link_register: { uz: "Ro'yxatdan o'tish", en: "Register" },

  register_title: { uz: "Ro'yxatdan o'tish", en: "Register" },
  register_subtitle: { uz: "O'rganishni boshlash uchun akkount yarating.", en: "Create an account to start learning." },
  label_first_name: { uz: "Ism", en: "First Name" },
  label_last_name: { uz: "Familiya", en: "Last Name" },
  btn_register: { uz: "Ro'yxatdan o'tish", en: "Register" },
  have_account: { uz: "Akkountingiz bormi?", en: "Already have an account?" },
  link_login: { uz: "Kirish", en: "Login" },

  verify_title: { uz: "Emailni tasdiqlash", en: "Verify Email" },
  verify_subtitle_prefix: { uz: "4 xonali kod yuborildi:", en: "We've sent a 4-digit code to" },
  resend_prompt: { uz: "Kod kelmadimi?", en: "Didn't receive code?" },
  btn_resend: { uz: "Qayta yuborish", en: "Resend" },
  btn_verify: { uz: "Tasdiqlash", en: "Verify" },
  back_to_register: { uz: "Ro'yxatdan o'tishga qaytish", en: "Back to Register" },

  forgot_title: { uz: "Parolni tiklash", en: "Reset Password" },
  forgot_subtitle: { uz: "Emailingizni kiriting, tiklash havolasi yuboriladi.", en: "Enter your email and we'll send you a reset link." },
  btn_send_reset: { uz: "Havola yuborish", en: "Send Reset Link" },
  back_to_login: { uz: "Kirishga qaytish", en: "Back to Login" },

  reset_title: { uz: "Yangi parol", en: "New Password" },
  reset_subtitle: { uz: "Yangi parolni kiriting va tasdiqlang.", en: "Enter and confirm your new password." },
  label_new_password: { uz: "Yangi parol", en: "New Password" },
  label_confirm_password: { uz: "Parolni tasdiqlang", en: "Confirm Password" },
  btn_reset_password: { uz: "Parolni tiklash", en: "Reset Password" },

  // Lessons / detail
  lessons_title: { uz: "Darslar", en: "Lessons" },
  lessons_subtitle: { uz: "Dars tanlang va lug'at testini boshlang", en: "Pick a lesson and start a vocabulary test" },
  btn_start_test: { uz: "Testni boshlash", en: "Start Test" },
  words_suffix: { uz: "so'z", en: "words" },
  no_lessons_title: { uz: "Hozircha darslar yo'q", en: "No lessons yet" },
  no_lessons_text: { uz: "Yangi darslar qo'shilishi bilan shu yerda ko'rinadi.", en: "New lessons will show up here as soon as they are added." },
  detail_title: { uz: "Dars tafsilotlari", en: "Lesson Detail" },
  detail_total_words: { uz: "Jami so'zlar", en: "Total Words" },
  detail_type: { uz: "Turi", en: "Type" },
  back_to_lessons: { uz: "Darslarga qaytish", en: "Back to Lessons" },

  // Test flow
  test_start: { uz: "Boshlash", en: "Start" },
  test_questions_label: { uz: "Savollar", en: "Questions" },
  get_ready: { uz: "Tayyor bo'ling!", en: "Get Ready!" },
  will_start_in: { uz: "Test hozir boshlanadi", en: "The test will start in" },
  choose_translation: { uz: "To'g'ri tarjimani tanlang", en: "Choose the correct translation" },
  btn_skip: { uz: "O'tkazib yuborish", en: "Skip" },
  btn_next: { uz: "Keyingisi", en: "Next" },
  feedback_correct: { uz: "To'g'ri!", en: "Correct!" },
  feedback_incorrect: { uz: "Noto'g'ri", en: "Not quite" },
  great_job: { uz: "Ajoyib!", en: "Great Job!" },
  test_completed_text: { uz: "Siz testni yakunladingiz.", en: "You have completed the test." },
  btn_view_result: { uz: "Natijani ko'rish", en: "View Result" },
  exit_test: { uz: "Testdan chiqish", en: "Exit test" },

  // Results
  test_result_title: { uz: "Test natijasi", en: "Test Result" },
  your_result: { uz: "Sizning natijangiz", en: "Your Result" },
  total_questions: { uz: "Jami savollar", en: "Total Questions" },
  correct_answers: { uz: "To'g'ri javoblar", en: "Correct Answers" },
  wrong_answers: { uz: "Noto'g'ri javoblar", en: "Wrong Answers" },
  earned_score: { uz: "To'plangan ball", en: "Earned Score" },
  finished_at: { uz: "Tugallangan vaqti", en: "Finished At" },
  score_label: { uz: "BALL", en: "SCORE" },

  // Leaderboard
  leaderboard_title: { uz: "Reyting", en: "Leaderboard" },
  leaderboard_subtitle: { uz: "Boshqa o'quvchilar orasida qanday o'rindasiz", en: "See how you rank against other learners" },
  tab_global: { uz: "Global", en: "Global" },
  tab_country: { uz: "Mening davlatim", en: "My Country" },
  col_rank: { uz: "O'rin", en: "Rank" },
  col_user: { uz: "Foydalanuvchi", en: "User" },
  col_score: { uz: "Ball", en: "Score" },
  col_email: { uz: "Email", en: "Email" },
  you_suffix: { uz: "(Siz)", en: "(You)" },
  no_ranking_yet: { uz: "Hozircha reyting ma'lumotlari yo'q.", en: "No ranking data yet." },

  // My tests
  mytests_title: { uz: "Mening testlarim", en: "My Tests" },
  mytests_subtitle: { uz: "Har bir dars bo'yicha progressingiz", en: "Your progress across every lesson" },
  col_lesson: { uz: "Dars", en: "Lesson" },
  col_words: { uz: "So'zlar", en: "Words" },
  col_status: { uz: "Holat", en: "Status" },
  col_best_score: { uz: "Eng yaxshi ball", en: "Best Score" },
  col_action: { uz: "Amal", en: "Action" },
  status_completed: { uz: "Tugallangan", en: "Completed" },
  status_not_started: { uz: "Boshlanmagan", en: "Not started" },
  status_in_progress: { uz: "Jarayonda", en: "In Progress" },
  btn_retake: { uz: "Qayta topshirish", en: "Retake" },
  no_lessons_available: { uz: "Hozircha darslar mavjud emas.", en: "No lessons available yet." },

  // History
  history_title: { uz: "Tarix", en: "History" },
  history_subtitle: { uz: "Barcha topshirilgan testlar, so'nggisidan boshlab", en: "Every test you've taken, most recent first" },
  col_finished_at: { uz: "Tugallangan vaqti", en: "Finished At" },
  no_tests_yet: { uz: "Siz hali test topshirmagansiz.", en: "You haven't taken any tests yet." },
  col_correct: { uz: "To'g'ri", en: "Correct" },

  // Profile
  profile_title: { uz: "Profil", en: "Profile" },
  personal_info: { uz: "Shaxsiy ma'lumotlar", en: "Personal Information" },
  btn_save_changes: { uz: "O'zgarishlarni saqlash", en: "Save Changes" },
  password_section: { uz: "Parol", en: "Password" },
  password_hint: { uz: "Parolni o'zgartirish uchun \"Parolni unutdingizmi\" bo'limidan foydalaning — emailingizga havola yuboriladi.", en: "To change your password, use the \"Forgot password\" flow — a reset link will be sent to your email." },

  // Settings (user)
  settings_title: { uz: "Sozlamalar", en: "Settings" },
  language_label: { uz: "Til", en: "Language" },
  notifications: { uz: "Bildirishnomalar", en: "Notifications" },
  notif_email_title: { uz: "Email bildirishnomalari", en: "Email notifications" },
  notif_email_desc: { uz: "Yangi darslar qo'shilganda email orqali xabar oling", en: "Get emailed when new lessons are added" },
  notif_reminders_title: { uz: "Test eslatmalari", en: "Test reminders" },
  notif_reminders_desc: { uz: "Uzoq vaqt mashq qilmasangiz yengil eslatma", en: "A gentle nudge if you haven't practiced in a while" },
  account_section: { uz: "Akkount", en: "Account" },
  signout_hint: { uz: "Bu qurilmada Vocab Test'dan chiqish.", en: "Sign out of Vocab Test on this device." },
  btn_logout: { uz: "Chiqish", en: "Log Out" },

  // Admin dashboard
  admin_dashboard_title: { uz: "Bosh sahifa", en: "Dashboard" },
  admin_dashboard_subtitle: { uz: "Admin va Super foydalanuvchi umumiy ko'rinishi", en: "Admin & Super User overview" },
  stat_total_lessons: { uz: "Jami darslar", en: "Total Lessons" },
  stat_total_words: { uz: "Jami so'zlar", en: "Total Words" },
  stat_registered_users: { uz: "Ro'yxatdan o'tgan foydalanuvchilar", en: "Registered Users" },
  stat_total_tests: { uz: "Jami testlar", en: "Total Tests" },
  stat_average_score: { uz: "O'rtacha ball", en: "Average Score" },
  important_rules: { uz: "Muhim qoidalar", en: "Important Rules" },
  rule_1: { uz: "Har bir test sessiyasida maksimum 10 ta savol.", en: "Maximum 10 questions per test session." },
  rule_2: { uz: "Agar darsda 10 tadan kam so'z bo'lsa, barcha so'zlar ko'rsatiladi.", en: "If a lesson has fewer than 10 words, all of its words will be shown." },
  rule_3: { uz: "Agar darsda 10 tadan ko'p so'z bo'lsa, har safar 10 tasi tasodifiy tanlanadi.", en: "If a lesson has more than 10 words, 10 are chosen at random each session." },
  rule_4: { uz: "Foydalanuvchilar savolni o'tkazib yuborishi mumkin.", en: "Users can skip a question." },
  rule_5: { uz: "Har bir javobdan so'ng darhol to'g'ri/noto'g'ri natija ko'rsatiladi.", en: "After each answer, correct/incorrect feedback is shown immediately." },
  rule_6: { uz: "Reyting jadvalida umumiy ball bo'yicha o'rin ko'rsatiladi.", en: "Leaderboard shows total score ranking." },
  rule_7: { uz: "Barcha test urinishlari tarixda saqlanadi.", en: "All test attempts are saved in history." },
  quick_actions: { uz: "Tezkor amallar", en: "Quick Actions" },
  btn_add_lesson: { uz: "Dars qo'shish", en: "Add Lesson" },
  btn_add_word: { uz: "So'z qo'shish", en: "Add Word" },
  btn_export_reports: { uz: "Hisobotlarni eksport qilish", en: "Export Reports" },
  btn_system_logs: { uz: "Tizim jurnali", en: "System Logs" },

  // Admin lessons
  admin_lessons_title: { uz: "Darslarni boshqarish", en: "Lessons Management" },
  all_lessons_card: { uz: "Barcha darslar", en: "All Lessons" },
  col_id: { uz: "ID", en: "ID" },
  col_lesson_name: { uz: "Dars nomi", en: "Lesson Name" },
  col_date: { uz: "Sana", en: "Date" },
  col_actions: { uz: "Amallar", en: "Actions" },
  modal_add_lesson: { uz: "Dars qo'shish", en: "Add Lesson" },
  modal_edit_lesson: { uz: "Darsni tahrirlash", en: "Edit Lesson" },
  label_lesson_name: { uz: "Dars nomi", en: "Lesson Name" },
  label_lesson_date: { uz: "Dars sanasi", en: "Lesson Date" },
  label_description: { uz: "Tavsif", en: "Description" },
  btn_save_lesson: { uz: "Darsni saqlash", en: "Save Lesson" },
  no_lessons_row: { uz: "Hozircha darslar yo'q — birinchisini qo'shing.", en: "No lessons yet — add your first one." },
  confirm_delete_lesson: { uz: "Bu darsni o'chirasizmi? Buni qaytarib bo'lmaydi.", en: "Delete this lesson? This cannot be undone." },

  // Admin words
  admin_words_title: { uz: "Lug'at so'zlari", en: "Vocabulary Words" },
  search_word_placeholder: { uz: "So'zni qidirish...", en: "Search word..." },
  filter_all_types: { uz: "Barcha turlar", en: "All Types" },
  filter_all_aspects: { uz: "Barcha jihatlar", en: "All Aspects" },
  filter_all_levels: { uz: "Barcha darajalar", en: "All Levels" },
  col_russian_word: { uz: "Rus so'zi", en: "Russian Word" },
  col_uzbek_meaning: { uz: "O'zbekcha ma'nosi", en: "Uzbek Meaning" },
  col_type: { uz: "Turi", en: "Type" },
  col_aspect: { uz: "Jihat", en: "Aspect" },
  col_level: { uz: "Daraja", en: "Level" },
  modal_add_word: { uz: "So'z qo'shish", en: "Add Word" },
  modal_edit_word: { uz: "So'zni tahrirlash", en: "Edit Word" },
  label_russian_word: { uz: "Rus so'zi", en: "Russian Word" },
  label_uzbek_meaning: { uz: "O'zbekcha ma'nosi", en: "Uzbek Meaning" },
  label_word_type: { uz: "So'z turi", en: "Word Type" },
  label_aspect: { uz: "Jihat", en: "Aspect" },
  label_example_sentence: { uz: "Misol jumla", en: "Example Sentence" },
  label_word_level: { uz: "So'z darajasi", en: "Word Level" },
  label_lesson: { uz: "Dars", en: "Lesson" },
  label_example_meaning: { uz: "Misol tarjimasi", en: "Example Meaning" },
  btn_save_word: { uz: "So'zni saqlash", en: "Save Word" },
  no_words_row: { uz: "Filtrlarga mos so'z topilmadi.", en: "No words match your filters." },
  confirm_delete_word: { uz: "Bu so'zni o'chirasizmi?", en: "Delete this word?" },

  // Admin users
  admin_users_title: { uz: "Foydalanuvchilar", en: "Users" },
  search_user_placeholder: { uz: "Foydalanuvchini qidirish...", en: "Search user..." },
  col_full_name: { uz: "To'liq ism", en: "Full Name" },
  col_role: { uz: "Rol", en: "Role" },
  col_joined_at: { uz: "Qo'shilgan vaqti", en: "Joined At" },
  modal_edit_user: { uz: "Foydalanuvchini tahrirlash", en: "Edit User" },
  label_full_name: { uz: "To'liq ism", en: "Full Name" },
  label_role: { uz: "Rol", en: "Role" },
  no_users_row: { uz: "Foydalanuvchi topilmadi.", en: "No users found." },
  confirm_delete_user: { uz: "Bu foydalanuvchini o'chirasizmi? Buni qaytarib bo'lmaydi.", en: "Delete this user? This cannot be undone." },

  // Admin test history
  admin_history_title: { uz: "Test tarixi (Barcha foydalanuvchilar)", en: "Test History (All Users)" },
  search_user_lesson_placeholder: { uz: "Foydalanuvchi yoki darsni qidirish...", en: "Search user or lesson..." },
  filter_all_lessons: { uz: "Barcha darslar", en: "All Lessons" },
  filter_all_statuses: { uz: "Barcha holatlar", en: "All Statuses" },
  col_total: { uz: "Jami", en: "Total" },
  no_history_row: { uz: "Filtrlarga mos urinish topilmadi.", en: "No test attempts match your filters." },

  // Admin settings
  admin_settings_title: { uz: "Sozlamalar", en: "Settings" },
  test_rules_card: { uz: "Test qoidalari", en: "Test Rules" },
  label_questions_per_test: { uz: "Har bir test sessiyasidagi savollar soni", en: "Questions per test session" },
  label_min_words: { uz: "Tasodifiy tanlash uchun minimal so'zlar soni", en: "Minimum words to trigger random selection" },
  btn_save_rules: { uz: "Qoidalarni saqlash", en: "Save Rules" },
  admin_account_card: { uz: "Admin akkounti", en: "Admin Account" },

  // Pagination nouns
  noun_lessons: { uz: "ta dars", en: "lessons" },
  noun_words: { uz: "ta so'z", en: "words" },
  noun_users: { uz: "ta foydalanuvchi", en: "users" },
  noun_tests: { uz: "ta test", en: "tests" },
  noun_learners: { uz: "ta o'quvchi", en: "learners" },
  pagination_showing: { uz: "Jami {total} tadan {start}-{end}", en: "Showing {start} to {end} of {total}" },
};

const I18n = {
  LANG_KEY: 'vt_lang',
  current() {
    return localStorage.getItem(this.LANG_KEY) || 'uz';
  },
  setLang(lang) {
    localStorage.setItem(this.LANG_KEY, lang);
    this.apply();
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  },
  t(key) {
    const entry = I18N_DICT[key];
    if (!entry) return key;
    return entry[this.current()] || entry.uz || entry.en || key;
  },
  months() {
    return this.current() === 'en'
      ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      : ['Yan','Fev','Mar','Apr','May','Iyun','Iyul','Avg','Sen','Okt','Noy','Dek'];
  },
  apply(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = this.t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = this.t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', this.t(el.dataset.i18nAria)); });
    root.querySelectorAll('.lang-switcher').forEach((el) => { el.value = this.current(); });
  },
  renderSwitcher() {
    const lang = this.current();
    return `
      <select class="select lang-switcher" style="width:auto;height:38px;padding:0 30px 0 12px;font-size:13px" aria-label="${this.t('language_label')}">
        <option value="uz" ${lang === 'uz' ? 'selected' : ''}>O'zbekcha</option>
        <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
      </select>`;
  },
  mountSwitcher(container) {
    if (!container || container.querySelector('.lang-switcher')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = this.renderSwitcher();
    const el = wrap.firstElementChild;
    container.prepend(el);
    el.addEventListener('change', (e) => this.setLang(e.target.value));
  },
};
