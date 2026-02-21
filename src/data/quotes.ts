export interface Quote {
    arabic: string
    translation: string
    reference?: string
}

export const ISLAMIC_QUOTES: Quote[] = [
    {
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Indeed, with hardship [will be] ease. (Quran 94:6)"
    },
    {
        arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
        translation: "Allah does not burden a soul beyond that it can bear. (Quran 2:286)"
    },
    {
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "For indeed, with hardship [will be] ease. (Quran 94:5)"
    },
    {
        arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
        translation: "And seek help through patience and prayer. (Quran 2:45)"
    },
    {
        arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "Indeed, Allah is with the patient. (Quran 2:153)"
    }
]

export const INTRO_AYATS: Quote[] = [
    {
        arabic: "إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
        translation: "Read! In the name of your Lord who created",
        reference: "Surah Al-Alaq [96:1]"
    },
    {
        arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
        translation: "And those who strive for Us - We will surely guide them to Our ways.",
        reference: "Surah Al-Ankabut [29:69]"
    },
    {
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
        reference: "Surah Al-Fatiha [1:5]"
    },
    {
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        translation: "My Lord, increase me in knowledge.",
        reference: "Surah Ta-Ha [20:114]"
    }
]

export const DHIKR_ROUTINES = [
    "Don't forget to recite Durud Shareef",
    "Don't forget to make Dua before class",
    "SubhanAllah, Alhamdulillah, Allahu Akbar",
    "Seek Allah's help with Istikhara",
    "Keep your tongue moist with the remembrance of Allah"
]

export const getRandomQuote = (): Quote => {
    const index = Math.floor(Math.random() * ISLAMIC_QUOTES.length)
    return ISLAMIC_QUOTES[index]
}

export const getRandomDhikr = (): string => {
    const index = Math.floor(Math.random() * DHIKR_ROUTINES.length)
    return DHIKR_ROUTINES[index]
}
