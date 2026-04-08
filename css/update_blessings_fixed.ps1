$content = Get-Content -Path 'd:\FestBridge\css\blessings.html' -Raw -Encoding UTF8

$newBlessingsData = @"
            const blessingsData = {
                'Spring Festival': {
                    zh: {
                        name: '春节',
                        blessings: [
                            '新年快乐，万事如意！',
                            '恭喜发财，大吉大利！',
                            '心想事成，笑口常开！',
                            '身体健康，阖家幸福！',
                            '事业有成，财源广进！',
                            '龙马精神，步步高升！',
                            '岁岁平安，年年有余！',
                            '福暖四季，顺遂安康！'
                        ]
                    },
                    en: {
                        name: 'Spring Festival',
                        blessings: [
                            'Happy New Year! All the best!',
                            'Wishing you prosperity and good luck!',
                            'May all your wishes come true!',
                            'Good health and family happiness!',
                            'Success in career and wealth!',
                            'Dragon horse spirit, rise step by step!',
                            'Safe every year, surplus every year!',
                            'Blessings warm the seasons, smooth and healthy!'
                        ]
                    }
                },
                'Lantern Festival': {
                    zh: {
                        name: '元宵节',
                        blessings: [
                            '元宵喜乐，万事顺意！',
                            '灯火璀璨，岁岁安康！',
                            '团团圆圆，和和美美！',
                            '花好月圆，福气满满！',
                            '前程似锦，步步高升！',
                            '阖家欢乐，幸福绵长！',
                            '元宵安康，好运连连！',
                            '平安喜乐，万事胜意！'
                        ]
                    },
                    en: {
                        name: 'Lantern Festival',
                        blessings: [
                            'Happy Lantern Festival! All the best!',
                            'Bright lanterns, safe every year!',
                            'Reunion and harmony!',
                            'Beautiful moon, full of blessings!',
                            'Bright future, rise step by step!',
                            'Family joy, long happiness!',
                            'Lantern Festival health, good luck!',
                            'Peace and joy, all wishes come true!'
                        ]
                    }
                },
                'Qingming Festival': {
                    zh: {
                        name: '清明节',
                        blessings: [
                            '清明安康，岁岁无忧！',
                            '追思怀远，福泽绵长！',
                            '春和景明，万事顺遂！',
                            '平安健康，阖家幸福！',
                            '踏青赏春，心情舒畅！',
                            '缅怀先人，传承家风！',
                            '风清日朗，福运常伴！',
                            '岁岁平安，年年安康！'
                        ]
                    },
                    en: {
                        name: 'Qingming Festival',
                        blessings: [
                            'Qingming peace, worry-free every year!',
                            'Remember the past, blessings last long!',
                            'Spring and bright scenery, all goes well!',
                            'Peace and health, family happiness!',
                            'Spring outing, happy mood!',
                            'Remember ancestors, inherit family traditions!',
                            'Clear wind and bright day, good fortune always!',
                            'Safe every year, healthy every year!'
                        ]
                    }
                },
                'Dragon Boat Festival': {
                    zh: {
                        name: '端午节',
                        blessings: [
                            '端午安康，岁岁无忧！',
                            '粽香四溢，福气满满！',
                            '平安喜乐，万事顺意！',
                            '阖家幸福，端午吉祥！',
                            '驱邪纳福，好运连连！',
                            '身体健康，步步高升！',
                            '龙舟竞渡，前程似锦！',
                            '端午安康，福寿绵长！'
                        ]
                    },
                    en: {
                        name: 'Dragon Boat Festival',
                        blessings: [
                            'Dragon Boat Festival health, worry-free every year!',
                            'Zongzi fragrance overflows, full of blessings!',
                            'Peace and joy, all the best!',
                            'Family happiness, Dragon Boat Festival auspicious!',
                            'Drive away evil, welcome blessings!',
                            'Good health, rise step by step!',
                            'Dragon boat racing, bright future!',
                            'Dragon Boat Festival health, long life!'
                        ]
                    }
                },
                'Qixi Festival': {
                    zh: {
                        name: '七夕节',
                        blessings: [
                            '七夕快乐，爱意绵长！',
                            '有情人终成眷属！',
                            '甜甜蜜蜜，长长久久！',
                            '良缘永结，幸福美满！',
                            '星河璀璨，爱意永恒！',
                            '执子之手，与子偕老！',
                            '七夕安康，好运常伴！',
                            '岁岁年年，恩爱如初！'
                        ]
                    },
                    en: {
                        name: 'Qixi Festival',
                        blessings: [
                            'Happy Qixi Festival, love lasts long!',
                            'Lovers unite in marriage!',
                            'Sweet and long-lasting!',
                            'Good marriage, happy life!',
                            'Bright stars, eternal love!',
                            'Hold your hand, grow old together!',
                            'Qixi Festival health, good luck always!',
                            'Every year, love as before!'
                        ]
                    }
                },
                'Mid-Autumn Festival': {
                    zh: {
                        name: '中秋节',
                        blessings: [
                            '中秋快乐，阖家团圆！',
                            '花好月圆，万事顺意！',
                            '月圆人安，福运满满！',
                            '中秋安康，岁岁无忧！',
                            '阖家幸福，美满长久！',
                            '步步高升，财源广进！',
                            '月满中秋，福气绵长！',
                            '平安喜乐，万事胜意！'
                        ]
                    },
                    en: {
                        name: 'Mid-Autumn Festival',
                        blessings: [
                            'Happy Mid-Autumn Festival, family reunion!',
                            'Beautiful moon, all the best!',
                            'Full moon, safe people, full of blessings!',
                            'Mid-Autumn Festival health, worry-free every year!',
                            'Family happiness, long and happy!',
                            'Rise step by step, wealth comes!',
                            'Full moon Mid-Autumn, blessings last long!',
                            'Peace and joy, all wishes come true!'
                        ]
                    }
                },
                'Double Ninth Festival': {
                    zh: {
                        name: '重阳节',
                        blessings: [
                            '重阳安康，福寿绵长！',
                            '登高望远，岁岁无忧！',
                            '敬老爱老，阖家幸福！',
                            '九九重阳，久久安康！',
                            '身体健康，万事如意！',
                            '福如东海，寿比南山！',
                            '重阳吉祥，好运连连！',
                            '岁岁重阳，今又重阳！'
                        ]
                    },
                    en: {
                        name: 'Double Ninth Festival',
                        blessings: [
                            'Double Ninth Festival health, long life!',
                            'Climb high, worry-free every year!',
                            'Respect the elderly, family happiness!',
                            'Double Ninth Festival, long peace!',
                            'Good health, all the best!',
                            'Blessings like the East Sea, longevity like Nanshan!',
                            'Double Ninth Festival auspicious, good luck!',
                            'Every year Double Ninth, this year again!'
                        ]
                    }
                },
                'Laba Festival': {
                    zh: {
                        name: '腊八节',
                        blessings: [
                            '腊八快乐，万事顺意！',
                            '粥暖人心，福气满满！',
                            '岁岁平安，年年有余！',
                            '腊八安康，阖家幸福！',
                            '驱寒保暖，身体健康！',
                            '五谷丰登，财源广进！',
                            '腊八吉祥，好运常伴！',
                            '温暖顺遂，幸福绵长！'
                        ]
                    },
                    en: {
                        name: 'Laba Festival',
                        blessings: [
                            'Happy Laba Festival! All the best!',
                            'Warm porridge, full of blessings!',
                            'Safe every year, surplus every year!',
                            'Laba Festival health, family happiness!',
                            'Keep warm, good health!',
                            'Harvest of grains, wealth comes!',
                            'Laba Festival auspicious, good luck always!',
                            'Warm and smooth, long happiness!'
                        ]
                    }
                },
                'Little New Year': {
                    zh: {
                        name: '小年',
                        blessings: [
                            '小年快乐，万事顺意！',
                            '辞旧迎新，福气满满！',
                            '扫尘纳福，好运连连！',
                            '阖家幸福，小年吉祥！',
                            '灶神赐福，财源广进！',
                            '岁岁平安，年年有余！',
                            '小年安康，万事胜意！',
                            '辞旧迎新，步步高升！'
                        ]
                    },
                    en: {
                        name: 'Little New Year',
                        blessings: [
                            'Happy Little New Year! All the best!',
                            'Bid farewell to old, welcome new!',
                            'Clean dust, welcome blessings!',
                            'Family happiness, Little New Year auspicious!',
                            'Kitchen god blessings, wealth comes!',
                            'Safe every year, surplus every year!',
                            'Little New Year health, all wishes come true!',
                            'Bid farewell to old, rise step by step!'
                        ]
                    }
                },
                'New Year\'s Eve': {
                    zh: {
                        name: '除夕',
                        blessings: [
                            '除夕快乐，阖家团圆！',
                            '辞旧迎新，万事顺意！',
                            '岁岁平安，年年有余！',
                            '守岁纳福，福气满满！',
                            '阖家幸福，除夕吉祥！',
                            '财源广进，步步高升！',
                            '除夕安康，好运连连！',
                            '辞旧迎新，岁岁无忧！'
                        ]
                    },
                    en: {
                        name: 'New Year\'s Eve',
                        blessings: [
                            'Happy New Year\'s Eve! Family reunion!',
                            'Bid farewell to old, welcome new!',
                            'Safe every year, surplus every year!',
                            'Stay up late, welcome blessings!',
                            'Family happiness, New Year\'s Eve auspicious!',
                            'Wealth comes, rise step by step!',
                            'New Year\'s Eve health, good luck!',
                            'Bid farewell to old, worry-free every year!'
                        ]
                    }
                }
            };
"@

$content = $content -replace '(?s)const blessingsData = \{.*?\};', $newBlessingsData

$content | Out-File 'd:\FestBridge\blessings.html' -Encoding UTF8