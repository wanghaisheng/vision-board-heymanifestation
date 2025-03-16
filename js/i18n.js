document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLanguage = localStorage.getItem('language') || 'zh';
    
    // Initialize language selector if it exists
    if (document.getElementById('language-selector')) {
        document.getElementById('language-selector').value = currentLanguage;
    }
    
    if (document.getElementById('language-selector-footer')) {
        document.getElementById('language-selector-footer').value = currentLanguage;
    }
    
    // Load language file and apply translations
    changeLanguage(currentLanguage);
    
    // Add event listeners to language selectors
    if (document.getElementById('language-selector')) {
        document.getElementById('language-selector').addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    if (document.getElementById('language-selector-footer')) {
        document.getElementById('language-selector-footer').addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
});

// Function to change language
function changeLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // Store current language setting
            localStorage.setItem('language', lang);
            
            // Apply translations
            applyTranslations(data);
            
            // Update HTML lang attribute
            document.documentElement.lang = lang;
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

// Apply translations to page elements
function applyTranslations(translations) {
    // Process all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
    
    // Process all input elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
    
    // Update HTML title
    if (translations.app_title) {
        document.title = translations.app_title;
    }
}