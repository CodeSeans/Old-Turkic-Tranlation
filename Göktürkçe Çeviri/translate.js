const vowelsMap = {
    'a': '𐰀', 'e': '𐰀',
    'ı': '𐰃', 'i': '𐰃',
    'o': '𐰆', 'u': '𐰆',
    'ö': '𐰇', 'ü': '𐰇'
};

const consonantsMap = {
    'b': ['𐰉', '𐰋'],
    'd': ['𐰑', '𐰓'],
    'g': ['𐰍', '𐰏'],
    'k': ['𐰴', '𐰚', '𐰶', '𐰸'],   // 0: kalın, 1: ince, 2-3: özel durumlar
    'l': ['𐰞', '𐰠'],
    'n': ['𐰣', '𐰤'],
    'r': ['𐰺', '𐰼'],
    's': ['𐰽', '𐰾'],
    't': ['𐱃', '𐱅'],   // kalın, ince
    'y': ['𐰖', '𐰘'],
    'ç': ['𐰲', '𐰲'],
    'ñ': ['𐰭', '𐰭'], 'ŋ': ['𐰭', '𐰭'],
    'm': ['𐰢', '𐰢'],
    'p': ['𐰯', '𐰯'],
    'ş': ['𐱁', '𐱁'],
    'z': ['𐰔', '𐰔']
};

const doublesMap = {
    'ng': '𐰭', 'nç': '𐰨', 'nd': '𐰦', 'nt': '𐰦', 'ny': '𐰪',
    'ok': '𐰸', 'uk': '𐰸', 'ök': '𐰜', 'ük': '𐰜',
    'iç': '𐰱', 'ık': '𐰶', 'ld': '𐰡'
};

const frontVowels = ['e', 'i', 'ö', 'ü'];
const backVowels = ['a', 'ı', 'o', 'u'];

function convertText() {
    const inputText = document.getElementById("inputText").value.trim().toLowerCase();
    const translatedText = inputText
        .split(' ')
        .map(word => translateWordToGokturk(word))
        .join(' ');
    document.getElementById("output").innerText = translatedText;
}

function translateWordToGokturk(word) {
    word = normalizeText(word);
    const wordVowels = [...word].filter(c => frontVowels.includes(c) || backVowels.includes(c));

    const isInce = wordVowels.every(c => frontVowels.includes(c));
    const isKalın = wordVowels.every(c => backVowels.includes(c));
    const useFront = isInce ? true : isKalın ? false : frontVowels.includes(wordVowels[wordVowels.length - 1]);

    let result = '';
    let i = 0;

    while (i < word.length) {
        const doubleChar = word.slice(i, i + 2);
        if (doublesMap[doubleChar]) {
            result += doublesMap[doubleChar];
            i += 2;
            continue;
        }

        const char = word[i];

        if (vowelsMap[char]) {
            result += vowelsMap[char];
        } else if (consonantsMap[char]) {
            const forms = consonantsMap[char];

            if (char === 'k' && word[i + 1] === 'ı') {
                result += forms[2];
            } else if (char === 'k' && (word[i + 1] === 'o' || word[i + 1] === 'u')) {
                result += forms[3];
            } else {
                result += forms[useFront ? 1 : 0];
            }
        } else {
            result += char;
        }

        i++;
    }

    return result;
}

function normalizeText(text) {
    return text
        .replace(/I/g, 'ı').replace(/İ/g, 'i')
        .replace(/[Ff]/g, 'p').replace(/[Ğğ]/g, 'g')
        .replace(/[HhQqXx]/g, 'k').replace(/[WwVv]/g, 'b')
        .replace(/[CcJj]/g, 'ç').replace(/[ÄäƏə]/g, 'e')
        .replace(/[Ýý]/g, 'y').replace(/[Ūū]/g, 'u');
}
