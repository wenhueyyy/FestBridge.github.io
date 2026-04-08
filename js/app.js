// 页面加载时加载语言包
window.onload = function() {
    loadLangData();
};

// 登录
function doLogin() {
    let user = document.getElementById('username').value.trim();
    let pwd = document.getElementById('pwd').value.trim();
    let tip = document.getElementById('tip');

    if (user === '' || pwd === '') {
        tip.innerText = 'Name and password cannot be empty!';
        return;
    }
    tip.innerText = '';
    localStorage.setItem('username', user);
    location.href = 'home.html';
}

// 微信一键登录
function wechatLogin() {
    // 模拟微信登录
    localStorage.setItem('username', '微信用户');
    localStorage.setItem('loginType', 'wechat');
    showToast('微信登录成功');
    setTimeout(() => {
        location.href = 'home.html';
    }, 1000);
}

// 语言包
// 如何添加新的翻译内容：
// 1. 在js/lang.json文件中添加新的键值对
// 2. 键的格式为：页面名称.元素名称
// 3. 在zh和en对象中分别添加对应的中文和英文翻译
// 4. 在需要翻译的页面元素中使用getLangText()函数获取翻译后的文本
// 5. 例如：getLangText('home_page.search_placeholder')
let langData = null;

// 加载语言包
async function loadLangData() {
    try {
        const response = await fetch('js/lang.json');
        langData = await response.json();
        // 加载完成后更新语言显示
        updateLanguageDisplay();
        updateLanguageButtons();
    } catch (error) {
        console.error('加载语言包失败:', error);
    }
}

// 语言切换
function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    updateLanguageDisplay();
    updateLanguageButtons();
    
    // 如果在详情页，重新加载详情
    if (location.pathname.includes('detail.html')) {
        loadDetail();
    }
    
    // 更新搜索框占位符
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = getLangText('home_page.search_placeholder');
    }
    
    // 更新搜索结果
    const searchResults = document.getElementById('searchResults');
    if (searchResults && searchResults.style.display === 'block') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            const key = searchInput.value.toLowerCase();
            if (key.length >= 1) {
                searchFestival();
            }
        }
    }
    
    // 更新登录页占位符
    const usernameInput = document.getElementById('username');
    const pwdInput = document.getElementById('pwd');
    if (usernameInput && pwdInput) {
        usernameInput.placeholder = getLangText('login_page.username_placeholder');
        pwdInput.placeholder = getLangText('login_page.password_placeholder');
    }
}

// 获取当前语言
function getCurrentLang() {
    return localStorage.getItem('language') || 'zh';
}

// 获取语言文本
// 如何使用：getLangText('页面名称.元素名称')
// 例如：getLangText('home_page.title')
function getLangText(key) {
    if (!langData) return key;
    
    const lang = getCurrentLang();
    const keys = key.split('.');
    let result = langData[lang];
    
    for (const k of keys) {
        if (result && result[k]) {
            result = result[k];
        } else {
            return key;
        }
    }
    
    return result;
}

// 更新语言显示
function updateLanguageDisplay() {
    if (!langData) return;
    
    const lang = getCurrentLang();
    
    // 更新返回按钮的aria-label
    const backBtns = document.querySelectorAll('.back-btn');
    backBtns.forEach(btn => {
        btn.setAttribute('aria-label', getLangText('common.back'));
    });
    
    // 更新页面标题
    if (location.pathname.includes('index.html')) {
        document.title = getLangText('app_name');
    } else if (location.pathname.includes('login.html')) {
        document.title = getLangText('login_page.title');
    } else if (location.pathname.includes('home.html')) {
        document.title = getLangText('home_page.title');
    }
    
    // 更新首页
    if (location.pathname.includes('index.html')) {
        const titleEl = document.querySelector('.start-container p');
        const startBtnEl = document.querySelector('.start-btn span');
        if (titleEl) {
            titleEl.textContent = getLangText('start_page.title');
        }
        if (startBtnEl) {
            startBtnEl.textContent = getLangText('start_page.start_button');
        }
    }
    
    // 更新登录页
    if (location.pathname.includes('login.html')) {
        const titleEl = document.querySelector('.login-container h2');
        const headerEl = document.querySelector('.header-bar h3');
        const loginBtnEl = document.querySelector('.login-btn span');
        const wechatBtnEl = document.querySelector('.wechat-login-btn span:nth-child(2)');
        const usernameInput = document.getElementById('username');
        const pwdInput = document.getElementById('pwd');
        if (titleEl) {
            titleEl.textContent = getLangText('login_page.welcome');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('login_page.title');
        }
        if (loginBtnEl) {
            loginBtnEl.textContent = getLangText('login_page.login_button');
        }
        if (wechatBtnEl) {
            wechatBtnEl.textContent = getLangText('login_page.wechat_login');
        }
        if (usernameInput) {
            usernameInput.placeholder = getLangText('login_page.username_placeholder');
        }
        if (pwdInput) {
            pwdInput.placeholder = getLangText('login_page.password_placeholder');
        }
    }
    
    // 更新主页
    if (location.pathname.includes('home.html')) {
        const titleEl = document.querySelector('.header-bar h3');
        const sectionTitleEl = document.querySelector('.section-title');
        const quickEntries = document.querySelectorAll('.quick-text');
        const featureEntries = document.querySelectorAll('.feature-text');
        const searchInput = document.getElementById('searchInput');
        const aiTextEl = document.querySelector('.ai-text');
        
        if (titleEl) {
            titleEl.textContent = getLangText('home_page.title');
        }
        if (sectionTitleEl) {
            sectionTitleEl.textContent = getLangText('home_page.section_titles.popular_festivals');
        }
        if (searchInput) {
            searchInput.placeholder = getLangText('home_page.search_placeholder');
        }
        if (aiTextEl) {
            aiTextEl.textContent = getLangText('home_page.ai_assistant');
        }
        if (quickEntries.length >= 2) {
            quickEntries[0].textContent = getLangText('home_page.quick_entries.today');
            quickEntries[1].textContent = getLangText('home_page.quick_entries.upcoming');
        }
        if (featureEntries.length >= 5) {
            featureEntries[0].textContent = getLangText('home_page.feature_entries.blessings');
            featureEntries[1].textContent = getLangText('home_page.feature_entries.customs');
            featureEntries[2].textContent = getLangText('home_page.feature_entries.items');
            featureEntries[3].textContent = getLangText('home_page.feature_entries.tips');
            featureEntries[4].textContent = getLangText('home_page.feature_entries.profile');
        }
        
        // 更新节日卡片
        const festivalItems = document.querySelectorAll('.festival-item');
        festivalItems.forEach(item => {
            const festivalName = item.dataset.name;
            const festivalTitleEl = item.querySelector('.info h4');
            const festivalDateEl = item.querySelector('.info p');
            if (festivalTitleEl && festivalDateEl) {
                // 根据节日名称获取对应的英文名称
                const festivalNames = {
                    'Spring Festival': { zh: '春节', en: 'Spring Festival' },
                    'Mid-Autumn Festival': { zh: '中秋节', en: 'Mid-Autumn Festival' },
                    'Dragon Boat Festival': { zh: '端午节', en: 'Dragon Boat Festival' },
                    'Lantern Festival': { zh: '元宵节', en: 'Lantern Festival' }
                };
                const dates = {
                    'Spring Festival': { zh: '农历正月初一', en: '1st Lunar Month' },
                    'Mid-Autumn Festival': { zh: '农历八月十五', en: '15th 8th Lunar Month' },
                    'Dragon Boat Festival': { zh: '农历五月初五', en: '5th 5th Lunar Month' },
                    'Lantern Festival': { zh: '农历正月十五', en: '15th 1st Lunar Month' }
                };
                const lang = getCurrentLang();
                if (festivalNames[festivalName]) {
                    festivalTitleEl.textContent = festivalNames[festivalName][lang];
                }
                if (dates[festivalName]) {
                    festivalDateEl.textContent = dates[festivalName][lang];
                }
            }
        });
    }
    
    // 更新日历页
    if (location.pathname.includes('calendar.html')) {
        const titleEl = document.querySelector('.header-bar h3');
        const tipsTitleEl = document.querySelector('.festival-tips h5');
        if (titleEl) {
            titleEl.textContent = getLangText('calendar_page.title');
        }
        if (tipsTitleEl) {
            tipsTitleEl.textContent = getLangText('calendar_page.tips_title');
        }
    }
    
    // 更新个人中心页面
    if (location.pathname.includes('profile.html')) {
        const titleEl = document.getElementById('pageTitle');
        const headerEl = document.getElementById('pageHeader');
        const sectionTitles = document.querySelectorAll('.section-title');
        const menuTexts = document.querySelectorAll('.menu-text');
        const userTypeEl = document.querySelector('.user-info p');
        const usernameDisplayEl = document.getElementById('usernameDisplay');
        
        if (titleEl) {
            titleEl.textContent = getLangText('profile_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('profile_page.title');
        }
        if (sectionTitles.length >= 3) {
            sectionTitles[0].textContent = getLangText('profile_page.section_titles.personal_info');
            sectionTitles[1].textContent = getLangText('profile_page.section_titles.features');
            sectionTitles[2].textContent = getLangText('profile_page.section_titles.favorites');
        }
        if (menuTexts.length >= 3) {
            menuTexts[0].textContent = getLangText('profile_page.menu_items.interaction_history');
            menuTexts[1].textContent = getLangText('profile_page.menu_items.about_us');
            menuTexts[2].textContent = getLangText('profile_page.menu_items.logout');
        }
        if (userTypeEl) {
            userTypeEl.textContent = getLangText('profile_page.user_type');
        }
        if (usernameDisplayEl) {
            const username = localStorage.getItem('username') || '';
            if (username === '') {
                usernameDisplayEl.textContent = getLangText('profile_page.default_username');
            } else {
                usernameDisplayEl.textContent = username;
            }
        }
        
        // 重新加载收藏的节日，确保显示正确的语言
        if (typeof loadFavorites === 'function') {
            loadFavorites();
        }
    }
    
    // 更新聊天页面
    if (location.pathname.includes('chat.html')) {
        const titleEl = document.querySelector('.header-bar h3');
        const inputEl = document.getElementById('chat-input');
        const sendBtn = document.querySelector('.send-btn');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        if (titleEl) {
            titleEl.textContent = getLangText('chat_page.title');
        }
        if (inputEl) {
            inputEl.placeholder = getLangText('chat_page.input_placeholder');
        }
        if (sendBtn) {
            sendBtn.textContent = getLangText('chat_page.send_button');
        }
        if (welcomeMessage) {
            if (lang === 'zh') {
                welcomeMessage.textContent = '你好！我是节日助手，有什么可以帮助你的吗？你可以询问关于中国传统节日的信息，如习俗、祝福语等。';
            } else {
                welcomeMessage.textContent = 'Hello! I am the Festival Assistant, what can I help you with? You can ask about Chinese traditional festivals, such as customs, blessings, etc.';
            }
        }
    }
    
    // 更新详情页
    if (location.pathname.includes('detail.html')) {
        loadDetail();
    }
    
    // 更新即将到来页面
    if (location.pathname.includes('upcoming.html')) {
        const titleEl = document.getElementById('pageTitle');
        const headerEl = document.getElementById('pageHeader');
        if (titleEl) {
            titleEl.textContent = getLangText('upcoming_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('upcoming_page.title');
        }
    }
    
    // 更新祝福语库页面
    if (location.pathname.includes('blessings.html')) {
        const titleEl = document.querySelector('title');
        const headerEl = document.querySelector('.header-bar h3');
        if (titleEl) {
            titleEl.textContent = getLangText('blessings_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('blessings_page.title');
        }
    }
    
    // 更新文化避坑指南页面
    if (location.pathname.includes('tips.html')) {
        const titleEl = document.querySelector('title');
        const headerEl = document.querySelector('.header-bar h3');
        if (titleEl) {
            titleEl.textContent = getLangText('tips_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('tips_page.title');
        }
    }
    
    // 更新必备物品页面
    if (location.pathname.includes('items.html')) {
        const titleEl = document.querySelector('title');
        const headerEl = document.querySelector('.header-bar h3');
        if (titleEl) {
            titleEl.textContent = getLangText('items_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('items_page.title');
        }
    }
    
    // 更新关于我们页面
    if (location.pathname.includes('about.html')) {
        const titleEl = document.querySelector('title');
        const headerEl = document.querySelector('.header-bar h3');
        if (titleEl) {
            titleEl.textContent = getLangText('about_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('about_page.title');
        }
    }
    
    // 更新习俗清单页面
    if (location.pathname.includes('customs.html')) {
        const titleEl = document.querySelector('title');
        const headerEl = document.querySelector('.header-bar h3');
        if (titleEl) {
            titleEl.textContent = getLangText('customs_page.title');
        }
        if (headerEl) {
            headerEl.textContent = getLangText('customs_page.title');
        }
    }
}

// 更新语言按钮
function updateLanguageButtons() {
    const lang = getCurrentLang();
    const zhButtons = document.querySelectorAll('.lang-btn.zh');
    const enButtons = document.querySelectorAll('.lang-btn.en');
    
    zhButtons.forEach(btn => {
        if (lang === 'zh') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    enButtons.forEach(btn => {
        if (lang === 'en') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 节日数据
const festivalData = {
    "Spring Festival": {
        zh: {
            name: "春节",
            date: "农历正月初一",
            customs: "红包、团圆饭、春联、饺子",
            blessings: "新年快乐，万事如意！",
            tips: "说吉利话，不要打破东西"
        },
        en: {
            name: "Spring Festival",
            date: "1st day of 1st lunar month",
            customs: "Red envelopes, reunion dinner, couplets, dumplings",
            blessings: "Happy New Year! Good luck!",
            tips: "Say lucky words, don't break things"
        }
    },
    "Mid-Autumn Festival": {
        zh: {
            name: "中秋节",
            date: "农历八月十五",
            customs: "吃月饼、赏月、家庭团聚",
            blessings: "中秋快乐！",
            tips: "适合家庭聚会"
        },
        en: {
            name: "Mid-Autumn Festival",
            date: "15th day of 8th lunar month",
            customs: "Eat mooncakes, enjoy moon, family reunion",
            blessings: "Happy Mid-Autumn Day!",
            tips: "Suitable for family gathering"
        }
    },
    "Dragon Boat Festival": {
        zh: {
            name: "端午节",
            date: "农历五月初五",
            customs: "吃粽子、赛龙舟",
            blessings: "平安健康！",
            tips: "纪念屈原"
        },
        en: {
            name: "Dragon Boat Festival",
            date: "5th day of 5th lunar month",
            customs: "Eat zongzi, dragon boat racing",
            blessings: "Safe and healthy!",
            tips: "Commemorate Qu Yuan"
        }
    },
    "Lantern Festival": {
        zh: {
            name: "元宵节",
            date: "农历正月十五",
            customs: "猜灯谜、吃汤圆",
            blessings: "元宵节快乐！",
            tips: "春节的结束"
        },
        en: {
            name: "Lantern Festival",
            date: "15th day of 1st lunar month",
            customs: "Guess lantern riddles, eat tangyuan",
            blessings: "Happy Lantern Festival!",
            tips: "End of Spring Festival"
        }
    },
    "Double Ninth Festival": {
        zh: {
            name: "重阳节",
            date: "农历九月初九",
            customs: "爬山、尊敬老人",
            blessings: "祝老人健康！",
            tips: "尊敬老人"
        },
        en: {
            name: "Double Ninth Festival",
            date: "9th day of 9th lunar month",
            customs: "Climb mountains, respect elders",
            blessings: "Wish elders health!",
            tips: "Respect the elderly"
        }
    },
    "Winter Solstice": {
        zh: {
            name: "冬至",
            date: "农历十一月初七",
            customs: "吃饺子、喝羊肉汤",
            blessings: "冬至快乐！",
            tips: "冬至大如年"
        },
        en: {
            name: "Winter Solstice",
            date: "7th day of 11th lunar month",
            customs: "Eat dumplings, drink mutton soup",
            blessings: "Happy Winter Solstice!",
            tips: "Winter Solstice is as important as New Year"
        }
    },
    "Qingming Festival": {
        zh: {
            name: "清明节",
            date: "农历三月初一",
            customs: "扫墓、踏青",
            blessings: "清明安康！",
            tips: "缅怀先人"
        },
        en: {
            name: "Qingming Festival",
            date: "1st day of 3rd lunar month",
            customs: "Tomb sweeping, spring outing",
            blessings: "Peaceful Qingming!",
            tips: "Remember ancestors"
        }
    },
    "Ghost Festival": {
        zh: {
            name: "中元节",
            date: "农历七月十五",
            customs: "烧纸钱、放河灯",
            blessings: "平安吉祥！",
            tips: "注意安全"
        },
        en: {
            name: "Ghost Festival",
            date: "15th day of 7th lunar month",
            customs: "Burn paper money, release river lanterns",
            blessings: "Safe and auspicious!",
            tips: "Be safe"
        }
    },
    "Qixi Festival": {
        zh: {
            name: "七夕节",
            date: "农历七月初七",
            customs: "乞巧、送礼物",
            blessings: "七夕快乐！",
            tips: "中国的情人节"
        },
        en: {
            name: "Qixi Festival",
            date: "7th day of 7th lunar month",
            customs: "Pray for skills, give gifts",
            blessings: "Happy Qixi Festival!",
            tips: "Chinese Valentine's Day"
        }
    }
};

// 收藏功能
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(festivalName, event) {
    event.stopPropagation();
    const favorites = getFavorites();
    const index = favorites.indexOf(festivalName);
    
    if (index > -1) {
        favorites.splice(index, 1);
        event.target.textContent = '🤍';
        event.target.classList.remove('favorited');
    } else {
        favorites.push(festivalName);
        event.target.textContent = '❤️';
        event.target.classList.add('favorited');
    }
    
    saveFavorites(favorites);
    showToast('收藏已更新');
}

// 习俗打卡功能
function getCustomChecks() {
    return JSON.parse(localStorage.getItem('customChecks') || '{}');
}

function saveCustomChecks(checks) {
    localStorage.setItem('customChecks', JSON.stringify(checks));
}

function isCustomChecked(festivalName, customIndex) {
    const checks = getCustomChecks();
    return checks[festivalName] && checks[festivalName][customIndex] === true;
}

function toggleCustomCheck(festivalName, customIndex) {
    const checks = getCustomChecks();
    if (!checks[festivalName]) {
        checks[festivalName] = {};
    }
    checks[festivalName][customIndex] = !isCustomChecked(festivalName, customIndex);
    saveCustomChecks(checks);
    showToast('习俗打卡已更新');
}

// 快捷入口功能
function showTodayFestivals() {
    location.href = 'calendar.html';
}

function showUpcomingFestivals() {
    showUpcomingFestivalsList();
}

function showPopularFestivals() {
    showPopularFestivalsList();
}

function showMyFavorites() {
    location.href = 'profile.html';
}

// 显示即将到来的节日
function showUpcomingFestivalsList() {
    const today = new Date();
    const upcomingFestivals = [];
    
    // 节日数据（公历日期）
    const festivalDates = {
        'Spring Festival': { month: 2, day: 1, zh: '春节', en: 'Spring Festival' },
        'Mid-Autumn Festival': { month: 9, day: 15, zh: '中秋节', en: 'Mid-Autumn Festival' },
        'Dragon Boat Festival': { month: 6, day: 5, zh: '端午节', en: 'Dragon Boat Festival' },
        'Lantern Festival': { month: 2, day: 15, zh: '元宵节', en: 'Lantern Festival' },
        'Double Ninth Festival': { month: 10, day: 9, zh: '重阳节', en: 'Double Ninth Festival' },
        'Winter Solstice': { month: 12, day: 22, zh: '冬至', en: 'Winter Solstice' },
        'Qingming Festival': { month: 4, day: 4, zh: '清明节', en: 'Qingming Festival' },
        'Ghost Festival': { month: 8, day: 15, zh: '中元节', en: 'Ghost Festival' },
        'Qixi Festival': { month: 8, day: 7, zh: '七夕节', en: 'Qixi Festival' }
    };
    
    // 计算每个节日距离今天的天数
    for (const [festival, date] of Object.entries(festivalDates)) {
        const festivalDate = new Date(today.getFullYear(), date.month - 1, date.day);
        if (festivalDate < today) {
            // 如果今年的节日已经过了，计算明年的
            festivalDate.setFullYear(today.getFullYear() + 1);
        }
        const daysUntil = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
        upcomingFestivals.push({ name: festival, date: festivalDate, days: daysUntil, info: date });
    }
    
    // 按距离排序
    upcomingFestivals.sort((a, b) => a.days - b.days);
    
    // 显示即将到来的节日
    let message = '';
    const lang = localStorage.getItem('language') || 'zh';
    
    if (lang === 'zh') {
        message = '即将到来的节日：\n';
    } else {
        message = 'Upcoming festivals：\n';
    }
    
    upcomingFestivals.slice(0, 3).forEach((festival, index) => {
        const festivalName = festival.info[lang];
        const dateStr = lang === 'zh' ? 
            `${festival.date.getFullYear()}年${festival.date.getMonth() + 1}月${festival.date.getDate()}日` :
            `${festival.date.getMonth() + 1}/${festival.date.getDate()}/${festival.date.getFullYear()}`;
        message += `${index + 1}. ${festivalName} (${dateStr}) - ${festival.days}天后\n`;
    });
    
    showToast(message);
}

// 显示热门节日
function showPopularFestivalsList() {
    const lang = localStorage.getItem('language') || 'zh';
    const popularFestivals = [
        { name: 'Spring Festival', zh: '春节', en: 'Spring Festival', reason: '中国最重要的传统节日' },
        { name: 'Mid-Autumn Festival', zh: '中秋节', en: 'Mid-Autumn Festival', reason: '团圆的节日' },
        { name: 'Dragon Boat Festival', zh: '端午节', en: 'Dragon Boat Festival', reason: '纪念屈原' },
        { name: 'Lantern Festival', zh: '元宵节', en: 'Lantern Festival', reason: '春节的结束' }
    ];
    
    let message = '';
    if (lang === 'zh') {
        message = '热门节日：\n';
    } else {
        message = 'Popular festivals：\n';
    }
    
    popularFestivals.forEach((festival, index) => {
        const festivalName = festival[lang];
        const reason = lang === 'zh' ? festival.reason : festival.reason;
        message += `${index + 1}. ${festivalName} - ${reason}\n`;
    });
    
    showToast(message);
}

// 搜索
function searchFestival() {
    let key = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (key.length < 1) {
        // 清空搜索结果
        if (searchResults) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
        return;
    }
    
    // 查找匹配的节日
    const matchedFestivals = [];
    for (const [festivalName, festivalInfo] of Object.entries(festivalData)) {
        const zhName = festivalInfo.zh.name.toLowerCase();
        const enName = festivalInfo.en.name.toLowerCase();
        
        if (zhName.includes(key) || enName.includes(key)) {
            matchedFestivals.push({name: festivalName, zh: festivalInfo.zh.name, en: festivalInfo.en.name});
        }
    }
    
    // 显示搜索结果
    if (searchResults) {
        if (matchedFestivals.length > 0) {
            searchResults.innerHTML = '';
            matchedFestivals.forEach(festival => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.onclick = () => {
                    goDetail(festival.name);
                    searchResults.style.display = 'none';
                };
                item.innerHTML = `
                    <span class="zh">${festival.zh}</span>
                    <span class="en hidden">${festival.en}</span>
                `;
                searchResults.appendChild(item);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
    }
}

// 跳详情
function goDetail(name) {
    localStorage.setItem('currentFestival', name);
    location.href = 'detail.html';
}

// 加载详情
function loadDetail() {
    if (location.pathname.includes('detail.html')) {
        let name = localStorage.getItem('currentFestival');
        let data = festivalData[name];
        let lang = getCurrentLang();
        let festivalInfo = data[lang];
        
        // 获取习俗列表
        const customs = festivalInfo.customs.split('、');
        
        // 生成习俗打卡列表
        let customsHtml = '';
        customs.forEach((custom, index) => {
            const isChecked = isCustomChecked(name, index);
            customsHtml += `
                <div class="custom-item">
                    <input type="checkbox" id="custom-${index}" class="custom-checkbox" ${isChecked ? 'checked' : ''} onchange="toggleCustomCheck('${name}', ${index})">
                    <label for="custom-${index}" class="custom-label">${custom}</label>
                </div>
            `;
        });
        
        // 生成收藏按钮
        const isFavorited = getFavorites().includes(name);
        
        let dom = `
            <div class="detail-header">
                <h3>${festivalInfo.name}</h3>
                <button class="favorite-btn detail-favorite" onclick="toggleFavorite('${name}', event)">${isFavorited ? '❤️' : '🤍'}</button>
            </div>
            <h4>${getLangText('detail_page.date')}</h4><p>${festivalInfo.date}</p>
            <h4>${getLangText('detail_page.customs')}</h4>
            <div class="customs-list">
                ${customsHtml}
            </div>
            <h4>${getLangText('detail_page.blessings')}</h4><p>${festivalInfo.blessings}</p>
            <h4>${getLangText('detail_page.tips')}</h4><p>${festivalInfo.tips}</p>
        `;
        document.getElementById('detailContent').innerHTML = dom;
        document.getElementById('detailTitle').innerText = festivalInfo.name;
    }
}

// 提示框
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 页面加载
window.onload = function () {
    // 加载语言包
    loadLangData();
    
    // 初始化收藏按钮状态
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    const favorites = getFavorites();
    favoriteBtns.forEach(btn => {
        const festivalName = btn.closest('.festival-item').dataset.name;
        if (favorites.includes(festivalName)) {
            btn.textContent = '❤️';
            btn.classList.add('favorited');
        }
    });
};
