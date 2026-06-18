import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  kk: {
    translation: {
      "app_title": "AMR Vision",
      "app_subtitle": "Антибиотиктерге төзімділікпен күрестің цифрлық экожүйесі",
      "tab_meds": "Дәрі түрі",
      "tab_patient": "Пациент",
      "tab_disease": "Диагноз",
      "correct_treatment": "Дұрыс емдеу",
      "skip_dose": "Дозаны өткізіп жіберу",
      "reset": "Қайта бастау",
      "view_tree": "Мутация Ағашын көру"
    }
  },
  ru: {
    translation: {
      "app_title": "AMR Vision",
      "app_subtitle": "Цифровая экосистема борьбы с антибиотикорезистентностью",
      "tab_meds": "Тип лекарства",
      "tab_patient": "Пациент",
      "tab_disease": "Диагноз",
      "correct_treatment": "Правильное лечение",
      "skip_dose": "Пропустить дозу",
      "reset": "Сбросить сцену",
      "view_tree": "Дерево мутаций"
    }
  },
  en: {
    translation: {
      "app_title": "AMR Vision",
      "app_subtitle": "Digital ecosystem for combating antibiotic resistance",
      "tab_meds": "Medication",
      "tab_patient": "Patient",
      "tab_disease": "Diagnosis",
      "correct_treatment": "Correct Treatment",
      "skip_dose": "Skip Dose",
      "reset": "Reset Scene",
      "view_tree": "View Mutation Tree"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "kk", // язык по умолчанию
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
