import { TreeNode, Verse, Course, GuidanceTopic, SevaDomain } from '@/lib/types'

export const vedicCorpusTree: TreeNode[] = [
  {
    id: 'shruti',
    name: 'Śruti',
    sanskrit: 'श्रुति',
    type: 'corpus',
    children: [
      {
        id: 'vedas',
        name: 'Vedas',
        sanskrit: 'वेद',
        type: 'text_group',
        children: [
          {
            id: 'rigveda',
            name: 'Ṛgveda',
            sanskrit: 'ऋग्वेद',
            type: 'work',
            verseCount: 10552,
            children: [
              { id: 'rv-1', name: 'Mandala 1', type: 'chapter', verseCount: 191 },
              { id: 'rv-2', name: 'Mandala 2', type: 'chapter', verseCount: 43 },
              { id: 'rv-3', name: 'Mandala 3', type: 'chapter', verseCount: 62 },
            ]
          },
          {
            id: 'yajurveda',
            name: 'Yajurveda',
            sanskrit: 'यजुर्वेद',
            type: 'work',
            verseCount: 1975
          },
          {
            id: 'samaveda',
            name: 'Sāmaveda',
            sanskrit: 'सामवेद',
            type: 'work',
            verseCount: 1875
          },
          {
            id: 'atharvaveda',
            name: 'Atharvaveda',
            sanskrit: 'अथर्ववेद',
            type: 'work',
            verseCount: 5977
          }
        ]
      },
      {
        id: 'upanishads',
        name: 'Upaniṣads',
        sanskrit: 'उपनिषद्',
        type: 'text_group',
        children: [
          { id: 'isha', name: 'Īśa Upaniṣad', sanskrit: 'ईशोपनिषद्', type: 'work', verseCount: 18 },
          { id: 'kena', name: 'Kena Upaniṣad', sanskrit: 'केनोपनिषद्', type: 'work', verseCount: 35 },
          { id: 'katha', name: 'Kaṭha Upaniṣad', sanskrit: 'कठोपनिषद्', type: 'work', verseCount: 119 },
          { id: 'mundaka', name: 'Muṇḍaka Upaniṣad', sanskrit: 'मुण्डकोपनिषद्', type: 'work', verseCount: 64 },
          { id: 'mandukya', name: 'Māṇḍūkya Upaniṣad', sanskrit: 'माण्डूक्योपनिषद्', type: 'work', verseCount: 12 },
          { id: 'chandogya', name: 'Chāndogya Upaniṣad', sanskrit: 'छान्दोग्योपनिषद्', type: 'work', verseCount: 627 },
          { id: 'brihadaranyaka', name: 'Bṛhadāraṇyaka Upaniṣad', sanskrit: 'बृहदारण्यकोपनिषद्', type: 'work', verseCount: 435 },
          { id: 'taittiriya', name: 'Taittirīya Upaniṣad', sanskrit: 'तैत्तिरीयोपनिषद्', type: 'work', verseCount: 31 },
          { id: 'aitareya', name: 'Aitareya Upaniṣad', sanskrit: 'ऐतरेयोपनिषद्', type: 'work', verseCount: 33 },
          { id: 'prashna', name: 'Praśna Upaniṣad', sanskrit: 'प्रश्नोपनिषद्', type: 'work', verseCount: 67 },
        ]
      }
    ]
  },
  {
    id: 'smriti',
    name: 'Smṛti',
    sanskrit: 'स्मृति',
    type: 'corpus',
    children: [
      {
        id: 'itihasa',
        name: 'Itihāsa',
        sanskrit: 'इतिहास',
        type: 'text_group',
        children: [
          {
            id: 'mahabharata',
            name: 'Mahābhārata',
            sanskrit: 'महाभारत',
            type: 'work',
            verseCount: 100000,
            children: [
              {
                id: 'bhisma-parva',
                name: 'Bhīṣma Parva',
                sanskrit: 'भीष्म पर्व',
                type: 'section',
                children: [
                  {
                    id: 'bhagavad-gita',
                    name: 'Bhagavad Gītā',
                    sanskrit: 'भगवद्गीता',
                    type: 'work',
                    verseCount: 700,
                    children: [
                      { id: 'bg-1', name: 'Chapter 1: Arjuna Viṣāda Yoga', sanskrit: 'अर्जुन विषाद योग', type: 'chapter', verseCount: 47 },
                      { id: 'bg-2', name: 'Chapter 2: Sāṅkhya Yoga', sanskrit: 'सांख्य योग', type: 'chapter', verseCount: 72 },
                      { id: 'bg-3', name: 'Chapter 3: Karma Yoga', sanskrit: 'कर्म योग', type: 'chapter', verseCount: 43 },
                      { id: 'bg-4', name: 'Chapter 4: Jñāna Yoga', sanskrit: 'ज्ञान योग', type: 'chapter', verseCount: 42 },
                      { id: 'bg-5', name: 'Chapter 5: Karma Sannyāsa Yoga', sanskrit: 'कर्म सन्न्यास योग', type: 'chapter', verseCount: 29 },
                      { id: 'bg-6', name: 'Chapter 6: Dhyāna Yoga', sanskrit: 'ध्यान योग', type: 'chapter', verseCount: 47 },
                      { id: 'bg-7', name: 'Chapter 7: Jñāna Vijñāna Yoga', sanskrit: 'ज्ञान विज्ञान योग', type: 'chapter', verseCount: 30 },
                      { id: 'bg-8', name: 'Chapter 8: Akṣara Brahma Yoga', sanskrit: 'अक्षर ब्रह्म योग', type: 'chapter', verseCount: 28 },
                      { id: 'bg-9', name: 'Chapter 9: Rāja Vidyā Yoga', sanskrit: 'राज विद्या योग', type: 'chapter', verseCount: 34 },
                      { id: 'bg-10', name: 'Chapter 10: Vibhūti Yoga', sanskrit: 'विभूति योग', type: 'chapter', verseCount: 42 },
                      { id: 'bg-11', name: 'Chapter 11: Viśvarūpa Darśana Yoga', sanskrit: 'विश्वरूप दर्शन योग', type: 'chapter', verseCount: 55 },
                      { id: 'bg-12', name: 'Chapter 12: Bhakti Yoga', sanskrit: 'भक्ति योग', type: 'chapter', verseCount: 20 },
                      { id: 'bg-13', name: 'Chapter 13: Kṣetra Kṣetrajña Yoga', sanskrit: 'क्षेत्र क्षेत्रज्ञ योग', type: 'chapter', verseCount: 35 },
                      { id: 'bg-14', name: 'Chapter 14: Guṇatraya Vibhāga Yoga', sanskrit: 'गुणत्रय विभाग योग', type: 'chapter', verseCount: 27 },
                      { id: 'bg-15', name: 'Chapter 15: Puruṣottama Yoga', sanskrit: 'पुरुषोत्तम योग', type: 'chapter', verseCount: 20 },
                      { id: 'bg-16', name: 'Chapter 16: Daivāsura Sampad Yoga', sanskrit: 'दैवासुर सम्पद् योग', type: 'chapter', verseCount: 24 },
                      { id: 'bg-17', name: 'Chapter 17: Śraddhātraya Vibhāga Yoga', sanskrit: 'श्रद्धात्रय विभाग योग', type: 'chapter', verseCount: 28 },
                      { id: 'bg-18', name: 'Chapter 18: Mokṣa Sannyāsa Yoga', sanskrit: 'मोक्ष सन्न्यास योग', type: 'chapter', verseCount: 78 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'ramayana',
            name: 'Rāmāyaṇa',
            sanskrit: 'रामायण',
            type: 'work',
            verseCount: 24000,
            children: [
              { id: 'bala-kanda', name: 'Bāla Kāṇḍa', sanskrit: 'बाल काण्ड', type: 'section', verseCount: 77 },
              { id: 'ayodhya-kanda', name: 'Ayodhyā Kāṇḍa', sanskrit: 'अयोध्या काण्ड', type: 'section', verseCount: 119 },
              { id: 'aranya-kanda', name: 'Āraṇya Kāṇḍa', sanskrit: 'आरण्य काण्ड', type: 'section', verseCount: 75 },
              { id: 'kishkindha-kanda', name: 'Kiṣkindhā Kāṇḍa', sanskrit: 'किष्किन्धा काण्ड', type: 'section', verseCount: 67 },
              { id: 'sundara-kanda', name: 'Sundara Kāṇḍa', sanskrit: 'सुन्दर काण्ड', type: 'section', verseCount: 68 },
              { id: 'yuddha-kanda', name: 'Yuddha Kāṇḍa', sanskrit: 'युद्ध काण्ड', type: 'section', verseCount: 128 },
              { id: 'uttara-kanda', name: 'Uttara Kāṇḍa', sanskrit: 'उत्तर काण्ड', type: 'section', verseCount: 111 },
            ]
          }
        ]
      },
      {
        id: 'puranas',
        name: 'Purāṇas',
        sanskrit: 'पुराण',
        type: 'text_group',
        children: [
          { id: 'bhagavata', name: 'Śrīmad Bhāgavatam', sanskrit: 'श्रीमद्भागवतम्', type: 'work', verseCount: 18000 },
          { id: 'vishnu-purana', name: 'Viṣṇu Purāṇa', sanskrit: 'विष्णु पुराण', type: 'work', verseCount: 23000 },
          { id: 'shiva-purana', name: 'Śiva Purāṇa', sanskrit: 'शिव पुराण', type: 'work', verseCount: 24000 },
          { id: 'garuda-purana', name: 'Garuḍa Purāṇa', sanskrit: 'गरुड पुराण', type: 'work', verseCount: 19000 },
          { id: 'markandeya-purana', name: 'Mārkaṇḍeya Purāṇa', sanskrit: 'मार्कण्डेय पुराण', type: 'work', verseCount: 9000 },
        ]
      },
      {
        id: 'dharmashastra',
        name: 'Dharmaśāstra',
        sanskrit: 'धर्मशास्त्र',
        type: 'text_group',
        children: [
          { id: 'manusmriti', name: 'Manusmṛti', sanskrit: 'मनुस्मृति', type: 'work', verseCount: 2694 },
          { id: 'yajnavalkya-smriti', name: 'Yājñavalkya Smṛti', sanskrit: 'याज्ञवल्क्य स्मृति', type: 'work', verseCount: 1010 },
        ]
      }
    ]
  },
  {
    id: 'darshana',
    name: 'Darśana',
    sanskrit: 'दर्शन',
    type: 'corpus',
    children: [
      { id: 'nyaya', name: 'Nyāya', sanskrit: 'न्याय', type: 'text_group' },
      { id: 'vaisheshika', name: 'Vaiśeṣika', sanskrit: 'वैशेषिक', type: 'text_group' },
      { id: 'sankhya', name: 'Sāṅkhya', sanskrit: 'सांख्य', type: 'text_group' },
      { id: 'yoga-darshana', name: 'Yoga', sanskrit: 'योग', type: 'text_group', children: [
        { id: 'yoga-sutras', name: 'Yoga Sūtras', sanskrit: 'योग सूत्र', type: 'work', verseCount: 196 }
      ]},
      { id: 'mimamsa', name: 'Mīmāṃsā', sanskrit: 'मीमांसा', type: 'text_group' },
      { id: 'vedanta-darshana', name: 'Vedānta', sanskrit: 'वेदान्त', type: 'text_group', children: [
        { id: 'brahma-sutras', name: 'Brahma Sūtras', sanskrit: 'ब्रह्म सूत्र', type: 'work', verseCount: 555 }
      ]},
    ]
  }
]

// Sample verse data for demonstration
export const sampleVerse: Verse = {
  id: 'bg-2-47',
  chapter: 2,
  verse: 47,
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
  transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi',
  synonyms: [
    { word: 'karmaṇi', meaning: 'in prescribed duties' },
    { word: 'eva', meaning: 'certainly' },
    { word: 'adhikāraḥ', meaning: 'right' },
    { word: 'te', meaning: 'of you' },
    { word: 'mā', meaning: 'never' },
    { word: 'phaleṣu', meaning: 'in the fruits' },
    { word: 'kadācana', meaning: 'at any time' },
    { word: 'mā', meaning: 'never' },
    { word: 'karma-phala', meaning: 'result of work' },
    { word: 'hetuḥ', meaning: 'cause' },
    { word: 'bhūḥ', meaning: 'become' },
    { word: 'mā', meaning: 'never' },
    { word: 'te', meaning: 'of you' },
    { word: 'saṅgaḥ', meaning: 'attachment' },
    { word: 'astu', meaning: 'be there' },
    { word: 'akarmaṇi', meaning: 'in not doing prescribed duties' },
  ],
  translations: {
    en: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.',
    hi: 'तुम्हें केवल कर्म करने का अधिकार है, फल पर कभी नहीं। कर्मफल का कारण मत बनो और कर्म न करने में भी आसक्त मत हो।'
  },
  commentaries: [
    {
      sampradaya: 'general',
      author: 'General Commentary',
      content: {
        en: 'This verse is one of the most famous and frequently quoted verses of the Bhagavad Gita. It encapsulates the essence of Karma Yoga - the path of selfless action. Krishna instructs Arjuna that one should focus entirely on performing one\'s duty without attachment to the results. This teaching encourages action without selfish motivation, leading to inner peace and spiritual growth.',
        hi: 'यह श्लोक भगवद्गीता के सबसे प्रसिद्ध और उद्धृत श्लोकों में से एक है। यह कर्म योग के सार को समाहित करता है - निःस्वार्थ कर्म का मार्ग।'
      }
    },
    {
      sampradaya: 'gaudiya',
      author: 'Śrīla Prabhupāda',
      content: {
        en: 'The Bhagavad-gita here establishes the science of devotional service. One should act in Krishna consciousness for the satisfaction of Krishna. The fruits of all activities should be given to the Supreme Lord. This is called nishkama-karma, or action without fruitive desire.',
        hi: 'भगवद्गीता यहाँ भक्ति सेवा के विज्ञान को स्थापित करती है।'
      }
    },
    {
      sampradaya: 'advaita',
      author: 'Śaṅkarācārya',
      content: {
        en: 'The Self is eternally free and actionless. Actions belong to the body-mind complex, not to the Atman. By renouncing the sense of doership and the desire for fruits, one realizes the non-dual nature of Brahman.',
        hi: 'आत्मा शाश्वत रूप से मुक्त और निष्क्रिय है।'
      }
    },
    {
      sampradaya: 'madhva',
      author: 'Madhvācārya',
      content: {
        en: 'This verse teaches that while performing karma according to one\'s svadharma, one should offer all results to the Supreme Lord Vishnu. The Lord alone is the giver of all fruits, and recognizing this leads to liberation.',
        hi: 'यह श्लोक सिखाता है कि स्वधर्म के अनुसार कर्म करते हुए, सभी फल भगवान विष्णु को अर्पित करने चाहिए।'
      }
    },
    {
      sampradaya: 'sri_vaishnava',
      author: 'Rāmānujācārya',
      content: {
        en: 'Actions performed with devotion to Nārāyaṇa, without selfish desire, purify the heart and lead to moksha. The Supreme Lord is both the means and the end of all spiritual practice.',
        hi: 'नारायण के प्रति भक्ति से किए गए कर्म, बिना स्वार्थी इच्छा के, हृदय को शुद्ध करते हैं और मोक्ष की ओर ले जाते हैं।'
      }
    }
  ],
  relations: {
    related_verses: ['bg-2-48', 'bg-3-19', 'bg-18-66', 'bg-5-10'],
    courses: [],
    guidance: [],
    seva_domains: []
  }
}

// Sample courses
export const sampleCourses: Course[] = [
  {
    id: 'intro-gita',
    title: 'Introduction to Bhagavad Gītā',
    description: 'A foundational course exploring the timeless wisdom of the Gītā for modern life.',
    level: 'beginner',
    ageGroups: ['students', 'professionals'],
    verseCount: 18
  },
  {
    id: 'karma-yoga-deep',
    title: 'Karma Yoga: Path of Action',
    description: 'Deep dive into the philosophy of selfless action and its practical application.',
    level: 'intermediate',
    ageGroups: ['professionals', 'elders'],
    verseCount: 45
  },
  {
    id: 'gita-for-kids',
    title: 'Gītā Stories for Kids',
    description: 'Simplified teachings through engaging stories and activities.',
    level: 'beginner',
    ageGroups: ['kids'],
    verseCount: 10
  }
]

// Sample guidance topics
export const sampleGuidance: GuidanceTopic[] = [
  { id: 'stress', title: 'Managing Stress', category: 'Mental Health', description: 'Vedic wisdom for finding peace amid chaos' },
  { id: 'decision', title: 'Making Decisions', category: 'Life Skills', description: 'Using dharmic principles for clear choices' },
  { id: 'relationships', title: 'Harmonious Relationships', category: 'Family', description: 'Ancient wisdom for modern relationships' },
  { id: 'purpose', title: 'Finding Purpose', category: 'Self-Discovery', description: 'Discovering your svadharma' }
]

// Sample seva domains
export const sevaDomains: SevaDomain[] = [
  { id: 'family', sanskrit: 'कुटुम्ब', english: 'Family', description: 'Nurturing family bonds and values' },
  { id: 'ecology', sanskrit: 'पर्यावरण', english: 'Ecology', description: 'Environmental stewardship and respect for nature' },
  { id: 'education', sanskrit: 'शिक्षा', english: 'Education', description: 'Spreading knowledge and wisdom' },
  { id: 'health', sanskrit: 'आरोग्य', english: 'Health', description: 'Holistic wellbeing practices' },
  { id: 'community', sanskrit: 'समाज', english: 'Community', description: 'Service to society' }
]
