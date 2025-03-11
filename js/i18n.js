document.addEventListener('DOMContentLoaded', function() {
    // 默认语言
    let currentLanguage = localStorage.getItem('language') || 'zh';
    
    // 初始化语言选择器
    if (document.getElementById('language-selector')) {
        document.getElementById('language-selector').value = currentLanguage;
    }
    
    if (document.getElementById('language-selector-footer')) {
        document.getElementById('language-selector-footer').value = currentLanguage;
    }
    
    // 加载语言文件并应用
    changeLanguage(currentLanguage);
    
    // 添加事件监听器给语言选择器
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

// 切换语言的函数
function changeLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // 存储当前语言设置
            localStorage.setItem('language', lang);
            
            // 应用翻译
            applyTranslations(data);
            
            // 更新HTML lang属性
            document.documentElement.lang = lang;
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

// 应用翻译到页面元素
function applyTranslations(translations) {
    // 处理所有带有data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
    
    // 处理所有带有data-i18n-placeholder属性的input元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
    
    // 处理HTML标题
    if (translations.app_title) {
        document.title = translations.app_title;
    }
}

