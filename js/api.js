// API配置
const API_CONFIG = {
    COZE_API_URL: 'https://api.coze.cn/v3/chat',
    API_KEY: 'pat_wSMipo2xyyqNdzEduZOaWjW4TWpR5kTseNounm6srWE5SR0xayBegKTHLxyLdatU',
    BOT_ID: '7626269650271600682'
};

// 存储对话历史
let conversationHistory = [];

// 调用Coze API
async function sendMessageToCoze(userMessage) {
    const currentLang = getCurrentLang();
    const languageHint = currentLang === 'zh' ? '【请用中文回复】' : '【Please reply in English】';
    const fullMessage = languageHint + userMessage;
    
    if (conversationHistory.length > 10) {
        conversationHistory = conversationHistory.slice(-10);
    }
    
    conversationHistory.push({
        role: 'user',
        content: fullMessage,
        content_type: 'text'
    });
    
    try {
        const response = await fetch(API_CONFIG.COZE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bot_id: API_CONFIG.BOT_ID,
                user_id: 'user_' + Date.now(),
                additional_messages: conversationHistory,
                auto_save_history: true,
                stream: true
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.msg || `API request failed with status ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullContent = '';
        let lastContent = '';  // 关键：记录上次的内容
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;
                
                const dataContent = trimmedLine.substring(5).trim();
                if (dataContent === '[DONE]') continue;
                
                // 跳过控制消息
                if (dataContent.includes('msg_type') || dataContent.includes('finish_reason')) {
                    continue;
                }
                
                try {
                    const parsed = JSON.parse(dataContent);
                    if (parsed && parsed.content && typeof parsed.content === 'string') {
                        let textContent = parsed.content;
                        if (textContent && textContent !== "") {
                            // 只对英文内容进行空格修复，避免影响中文字符
                            // 检查是否包含英文字符
                            if (/[a-zA-Z]/.test(textContent)) {
                                // 1. 小写字母后跟大写字母：'helloWorld' -> 'hello World'
                                textContent = textContent.replace(/([a-z])([A-Z])/g, '$1 $2');
                                // 2. 字母后跟数字：'CNY2024' -> 'CNY 2024'
                                textContent = textContent.replace(/([A-Za-z])(\d)/g, '$1 $2');
                                // 3. 数字后跟字母：'2024CNY' -> '2024 CNY'
                                textContent = textContent.replace(/(\d)([A-Za-z])/g, '$1 $2');
                                // 4. 标点符号后跟字母：'Hello,World' -> 'Hello, World'
                                textContent = textContent.replace(/([,.!?;:])([A-Za-z])/g, '$1 $2');
                                // 5. 修复常见节日名称
                                textContent = textContent.replace(/QingmingFestival/g, 'Qingming Festival');
                                textContent = textContent.replace(/SpringFestival/g, 'Spring Festival');
                                textContent = textContent.replace(/MidAutumnFestival/g, 'Mid-Autumn Festival');
                                textContent = textContent.replace(/MidAutumn/g, 'Mid-Autumn');
                                textContent = textContent.replace(/LanternFestival/g, 'Lantern Festival');
                                textContent = textContent.replace(/DragonBoatFestival/g, 'Dragon Boat Festival');
                                textContent = textContent.replace(/DoubleSeventhFestival/g, 'Double Seventh Festival');
                                textContent = textContent.replace(/GhostFestival/g, 'Ghost Festival');
                                textContent = textContent.replace(/DoubleNinthFestival/g, 'Double Ninth Festival');
                                textContent = textContent.replace(/WinterSolstice/g, 'Winter Solstice');
                                textContent = textContent.replace(/LabourDay/g, 'Labour Day');
                                textContent = textContent.replace(/ChildrensDay/g, 'Children\'s Day');
                                textContent = textContent.replace(/NationalDay/g, 'National Day');
                                textContent = textContent.replace(/ChineseNewYear/g, 'Chinese New Year');
                                textContent = textContent.replace(/CNY/g, 'Chinese New Year');
                                textContent = textContent.replace(/cny/g, 'Chinese New Year');
                                textContent = textContent.replace(/TombSweepingDay/g, 'Tomb-Sweeping Day');
                                textContent = textContent.replace(/PureBrightnessFestival/g, 'Pure Brightness Festival');
                                textContent = textContent.replace(/PureBrightness/g, 'Pure Brightness');
                                // 6. 修复常见错误组合
                                textContent = textContent.replace(/Hellotonsal/g, 'Hello there');
                                textContent = textContent.replace(/Hellothere/g, 'Hello there');
                                textContent = textContent.replace(/Qingivalnalstival/g, 'Qingming Festival');
                                textContent = textContent.replace(/Qingmingival/g, 'Qingming Festival');
                                textContent = textContent.replace(/Festivalival/g, 'Festival');
                                textContent = textContent.replace(/ivalival/g, 'ival');
                                textContent = textContent.replace(/onalstival/g, 'onal Festival');
                                textContent = textContent.replace(/stivalival/g, 'stival');
                                // 7. 清理多余空格
                                textContent = textContent.replace(/\s+/g, ' ').trim();
                            }
                            
                            // 关键：只添加新增的部分
                            if (textContent.length > lastContent.length) {
                                const newPart = textContent.substring(lastContent.length);
                                // 检查是否包含重复内容
                                if (!fullContent.includes(newPart)) {
                                    fullContent += newPart;
                                    lastContent = textContent;
                                    
                                    if (currentMessageId) {
                                        updateMessage(currentMessageId, formatContent(fullContent));
                                    }
                                }
                            }
                        }
                    }
                } catch (parseError) {
                    console.warn('JSON parse error:', parseError);
                }
            }
        }
        
        // 添加AI回复到对话历史
        if (fullContent) {
            conversationHistory.push({
                role: 'assistant',
                content: fullContent,
                content_type: 'text'
            });
        }
        
        if (!fullContent) {
            throw new Error('No content received from API');
        }
        
        return fullContent;
        
    } catch (error) {
        console.error('Error calling Coze API:', error);
        throw error;
    }
}

// 格式化内容（用于实时更新）
function formatContent(content) {
    return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>')
        .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>');
}