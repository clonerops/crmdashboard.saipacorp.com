// Converter Arabic to Persian Character
export const toPersianCharacter = (text: string) => {
    let obj: any = {
        'ك': 'ک',
        'دِ': 'د',
        'بِ': 'ب',
        'زِ': 'ز',
        'ذِ': 'ذ',
        'شِ': 'ش',
        'سِ': 'س',
        'ى': 'ی',
        'ي': 'ی',
        '١': '۱',
        '٢': '۲',
        '٣': '۳',
        '٤': '۴',
        '٥': '۵',
        '٦': '۶',
        '٧': '۷',
        '٨': '۸',
        '٩': '۹',
        '٠': '۰',
    };

    Object.keys(obj).forEach(function (key) {
        text = text.replaceAll(key, obj[key]);
    });
    return text
};
// Converter Arabic to Persian Character
export const toArabicCharacter = (text: string) => {
    let obj: any = {
        'ک': 'ك',
        'د': 'دِ',
        'ب': 'بِ',
        'ز': 'زِ',
        'ذ': 'ذِ',
        'ش': 'شِ',
        'س': 'سِ',
        'ی': 'ي',
        '۱': '١',
        '۲': '٢',
        '۳': '٣',
        '۴': '٤',
        '۵': '٥',
        '۶': '٦',
        '۷': '٧',
        '٨': '۸',
        '۹': '٩',
        '۰': '٠',
    };

    Object.keys(obj).forEach(function (key) {
        text = text.replaceAll(key, obj[key]);
    });
    return text
};
