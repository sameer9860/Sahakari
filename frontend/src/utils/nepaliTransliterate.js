// Romanized Nepali to Devanagari Transliteration Mapping
const romanToNepaliMap = {
    // Common full words
    'sahakari': 'सहकारी', 'nepali': 'नेपाली', 'nepal': 'नेपाल',
    'hamro': 'हाम्रो', 'mero': 'मेरो', 'tero': 'तेरो', 'timro': 'तिम्रो',
    'haami': 'हामी', 'hunxa': 'हुन्छ', 'haina': 'हैन', 'kasto': 'कस्तो',
    'bachat': 'बचत', 'yojana': 'योजना', 'krishi': 'कृषि', 'sahayog': 'सहयोग',
    'lekha': 'लेखा', 'sewa': 'सेवा', 'karja': 'ऋण', 'sojha': 'सोध',
  
    // Shortcuts
    'sh': 'श', 'gy': 'ज्ञ', 'x': 'क्ष', 'ri': 'ऋ',
  
    // Multi-syllable particles
    'ko': 'को', 'le': 'ले', 'maa': 'मा', 'bata': 'बाट', 'lai': 'लाई',
    'sanga': 'सँग', 'bhari': 'भरी', 'dekhi': 'देखि', 'samma': 'सम्म',
    'timi': 'तिमी', 'kati': 'कति', 'kaha': 'कहाँ',
  
    // Single syllable common words
    'ma': 'म', 'ta': 'त', 'cha': 'छ', 'ho': 'हो',
    'ke': 'के', 'ki': 'की',
  
    // Consonant-vowel combinations (must come before single consonants)
    'ka': 'क', 'kaa': 'का', 'ki': 'कि', 'kee': 'की', 'ku': 'कु', 'koo': 'कू', 'ke': 'के', 'kai': 'कै', 'ko': 'को', 'kau': 'कौ',
    'kha': 'ख', 'khaa': 'खा', 'khi': 'खि', 'khee': 'खी', 'khu': 'खु', 'khoo': 'खू', 'khe': 'खे', 'khai': 'खै', 'kho': 'खो', 'khau': 'खौ',
    'ga': 'ग', 'gaa': 'गा', 'gi': 'गि', 'gee': 'गी', 'gu': 'गु', 'goo': 'गू', 'ge': 'गे', 'gai': 'गै', 'go': 'गो', 'gau': 'गौ',
    'gha': 'घ', 'ghaa': 'घा', 'ghi': 'घि', 'ghee': 'घी', 'ghu': 'घु', 'ghoo': 'घू', 'ghe': 'घे', 'ghai': 'घै', 'gho': 'घो', 'ghau': 'घौ',
    'ca': 'च', 'caa': 'चा', 'ci': 'चि', 'cee': 'ची', 'cu': 'चु', 'coo': 'चू', 'ce': 'चे', 'cai': 'चै', 'co': 'चो', 'cau': 'चौ',
    'cha': 'छ', 'chaa': 'छा', 'chi': 'छि', 'chee': 'छी', 'chu': 'छु', 'choo': 'छू', 'che': 'छे', 'chai': 'छै', 'cho': 'छो', 'chau': 'छौ',
    'ja': 'ज', 'jaa': 'जा', 'ji': 'जि', 'jee': 'जी', 'ju': 'जु', 'joo': 'जू', 'je': 'जे', 'jai': 'जै', 'jo': 'जो', 'jau': 'जौ',
    'jha': 'झ', 'jhaa': 'झा', 'jhi': 'झि', 'jhee': 'झी', 'jhu': 'झु', 'jhoo': 'झू', 'jhe': 'झे', 'jhai': 'झै', 'jho': 'झो', 'jhau': 'झौ',
    'ta': 'त', 'taa': 'ता', 'ti': 'ति', 'tee': 'ती', 'tu': 'तु', 'too': 'तू', 'te': 'ते', 'tai': 'तै', 'to': 'तो', 'tau': 'तौ',
    'tha': 'थ', 'thaa': 'था', 'thi': 'थि', 'thee': 'थी', 'thu': 'थु', 'thoo': 'थू', 'the': 'थे', 'thai': 'थै', 'tho': 'थो', 'thau': 'थौ',
    'da': 'द', 'daa': 'दा', 'di': 'दि', 'dee': 'दी', 'du': 'दु', 'doo': 'दू', 'de': 'दे', 'dai': 'दै', 'do': 'दो', 'dau': 'दौ',
    'dha': 'ध', 'dhaa': 'धा', 'dhi': 'धि', 'dhee': 'धी', 'dhu': 'धु', 'dhoo': 'धू', 'dhe': 'धे', 'dhai': 'धै', 'dho': 'धो', 'dhau': 'धौ',
    'na': 'न', 'naa': 'ना', 'ni': 'नि', 'nee': 'नी', 'nu': 'नु', 'noo': 'नू', 'ne': 'ने', 'nai': 'नै', 'no': 'नो', 'nau': 'नौ',
    'pa': 'प', 'paa': 'पा', 'pi': 'पि', 'pee': 'पी', 'pu': 'पु', 'poo': 'पू', 'pe': 'पे', 'pai': 'पै', 'po': 'पो', 'pau': 'पौ',
    'pha': 'फ', 'phaa': 'फा', 'phi': 'फि', 'phee': 'फी', 'phu': 'फु', 'phoo': 'फू', 'phe': 'फे', 'phai': 'फै', 'pho': 'फो', 'phau': 'फौ',
    'ba': 'ब', 'baa': 'बा', 'bi': 'बि', 'bee': 'बी', 'bu': 'बु', 'boo': 'बू', 'be': 'बे', 'bai': 'बै', 'bo': 'बो', 'bau': 'बौ',
    'bha': 'भ', 'bhaa': 'भा', 'bhi': 'भि', 'bhee': 'भी', 'bhu': 'भु', 'bhoo': 'भू', 'bhe': 'भे', 'bhai': 'भै', 'bho': 'भो', 'bhau': 'भौ',
    'ma': 'म', 'maa': 'मा', 'mi': 'मि', 'mee': 'मी', 'mu': 'मु', 'moo': 'मू', 'me': 'मे', 'mai': 'मै', 'mo': 'मो', 'mau': 'मौ',
    'ya': 'य', 'yaa': 'या', 'yi': 'यि', 'yee': 'यी', 'yu': 'यु', 'yoo': 'यू', 'ye': 'ये', 'yai': 'यै', 'yo': 'यो', 'yau': 'यौ',
    'ra': 'र', 'raa': 'रा', 'ri': 'रि', 'ree': 'री', 'ru': 'रु', 'roo': 'रू', 're': 'रे', 'rai': 'रै', 'ro': 'रो', 'rau': 'रौ',
    'la': 'ल', 'laa': 'ला', 'li': 'लि', 'lee': 'ली', 'lu': 'लु', 'loo': 'लू', 'le': 'ले', 'lai': 'लै', 'lo': 'लो', 'lau': 'लौ',
    'wa': 'व', 'waa': 'वा', 'wi': 'वि', 'wee': 'वी', 'wu': 'वु', 'woo': 'वू', 'we': 'वे', 'wai': 'वै', 'wo': 'वो', 'wau': 'वौ',
    'sa': 'स', 'saa': 'सा', 'si': 'सि', 'see': 'सी', 'su': 'सु', 'soo': 'सू', 'se': 'से', 'sai': 'सै', 'so': 'सो', 'sau': 'सौ',
    'ha': 'ह', 'haa': 'हा', 'hi': 'हि', 'hee': 'ही', 'hu': 'हु', 'hoo': 'हू', 'he': 'हे', 'hai': 'है', 'ho': 'हो', 'hau': 'हौ',
    
    // Single consonants (without vowel - will get 'अ' added if needed)
    'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
    'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
    't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
    'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'w': 'व', 'v': 'व', 's': 'स',
    'h': 'ह', 'tr': 'त्र',
  
    // Vowels
    'aa': 'आ', 'ee': 'ई', 'oo': 'ऊ', 'ai': 'ऐ', 'au': 'औ',
    'a': 'अ', 'i': 'इ', 'u': 'उ', 'e': 'ए', 'o': 'ओ',
  
    // Special characters
    '.': '।', ',': ',', '?': '?', '!': '!',
  };
  
  // Vowel signs (matras)
  const vowelSigns = {
    'aa': 'ा', 'i': 'ि', 'ee': 'ी', 'u': 'ु', 'oo': 'ू',
    'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ',
  };
  
  // Normalize Roman input (remove double letters, handle nasalization)
  function normalizeRoman(text) {
    return text
      .replace(/nn/g, 'n')
      .replace(/mm/g, 'm')
      .replace(/([nm])(?=[kgcjtdpb])/g, 'ं'); // nasal before consonants
  }
  
  /**
   * Transliterates Romanized Nepali text to Devanagari script
   */
  export function transliterateToNepali(romanText) {
    if (!romanText || typeof romanText !== 'string') return '';
  
    const text = normalizeRoman(romanText.trim());
    if (!text) return '';
  
    const hasDevanagari = /[अ-ह]/.test(text);
    return hasDevanagari ? transliterateMixedText(text) : transliteratePureRoman(text);
  }
  
  function transliterateMixedText(text) {
    const parts = text.split(/([अ-ह]+|[^\u0900-\u097F]+)/);
    return parts.map(part => {
      if (/^[अ-ह]+$/.test(part)) return part;
      else if (/[a-zA-Z]/.test(part)) return transliterateWord(part.toLowerCase());
      else return part;
    }).join('');
  }
  
  function transliteratePureRoman(text) {
    const words = text.split(/(\s+)/);
    return words.map(word => /^\s+$/.test(word) ? word : transliterateWord(word.toLowerCase())).join('');
  }
  
  function transliterateWord(word) {
    if (!word) return '';
    let result = '';
    let i = 0;
  
    while (i < word.length) {
      let matched = false;
      
      // Consonants list (longer combinations first)
      const consonants = ['kh', 'gh', 'ch', 'jh', 'th', 'dh', 'ph', 'bh', 'tr', 'ng', 'ny', 'sh', 'gy', 
                         'k', 'g', 'c', 'j', 't', 'd', 'n', 'p', 'b', 'm', 'y', 'r', 'l', 'w', 'v', 's', 'h', 'x', 'ri'];
      
      // Vowel order (longer first)
      const vowelOrder = ['aa', 'ee', 'oo', 'ai', 'au', 'a', 'i', 'u', 'e', 'o'];
      
      // 1. Try longest patterns first (up to 8 characters for compound words)
      for (let len = Math.min(8, word.length - i); len >= 2; len--) {
        const substr = word.substring(i, i + len);
        
        // Exact dictionary match (full words, particles, etc.)
        if (romanToNepaliMap[substr]) {
          result += romanToNepaliMap[substr];
          i += len;
          matched = true;
          break;
        }
      }
      
      // 2. Try standalone vowels first (before consonant matching)
      if (!matched) {
        for (const vowel of vowelOrder) {
          if (word.substring(i).startsWith(vowel)) {
            result += romanToNepaliMap[vowel] || vowel;
            i += vowel.length;
            matched = true;
            break;
          }
        }
      }
      
      // 3. Try consonant + vowel combinations
      if (!matched) {
        for (const cons of consonants) {
          if (word.substring(i).startsWith(cons)) {
            const consChar = romanToNepaliMap[cons];
            if (!consChar) {
              i++;
              matched = true;
              break;
            }
            
            let vowelMatched = false;
            const afterCons = word.substring(i + cons.length);
            
            // Check for vowel after consonant
            for (const vowel of vowelOrder) {
              if (afterCons.startsWith(vowel)) {
                // Consonant + vowel combination using matra
                if (vowelSigns[vowel]) {
                  result += consChar + vowelSigns[vowel];
                } else {
                  result += consChar + (romanToNepaliMap[vowel] || vowel);
                }
                i += cons.length + vowel.length;
                vowelMatched = true;
                matched = true;
                break;
              }
            }
            
            // If consonant but no vowel after
            if (!vowelMatched) {
              const nextIdx = i + cons.length;
              const nextChar = nextIdx < word.length ? word[nextIdx] : '';
              
            // If next is consonant or end of word, keep consonant (inherent 'a' is already implied)
            if (!nextChar || (!/[aeiou]/.test(nextChar) && !/[a-z]/.test(nextChar))) {
              result += consChar;
              i += cons.length;
              matched = true;
              break;
            } else if (/[a-z]/.test(nextChar) && !/[aeiou]/.test(nextChar)) {
              // Next is consonant, optionally add halant (keep consonant plain to avoid extra अ)
              result += consChar;
              i += cons.length;
              matched = true;
              break;
            }
            }
            
            if (matched) break;
          }
        }
      }
      
      // 4. Single character matches (vowels, special chars)
      if (!matched) {
        const char = word[i];
        if (romanToNepaliMap[char]) {
          result += romanToNepaliMap[char];
          i++;
          matched = true;
        }
      }
      
      // 5. If nothing matched, keep character as-is
      if (!matched) {
        result += word[i];
        i++;
      }
    }
  
    return result;
  }
  