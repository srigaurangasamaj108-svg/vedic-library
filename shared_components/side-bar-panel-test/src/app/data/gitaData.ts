export interface Verse {
  verse: number;
  sanskrit: string;
  transliteration: string;
  synonyms: string;
  translation: string;
  purport: string;
}

export interface Chapter {
  chapter: number;
  title: string;
  verses: Verse[];
}

export const gitaData: Chapter[] = [
  {
    chapter: 1,
    title: "Observing the Armies on the Battlefield of Kurukṣetra",
    verses: [
      {
        verse: 1,
        sanskrit: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१||",
        transliteration: "dhṛtarāṣṭra uvāca\ndharma-kṣetre kuru-kṣetre\nsamavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva\nkim akurvata sañjaya",
        synonyms: "dhṛtarāṣṭraḥ uvāca—King Dhṛtarāṣṭra said; dharma-kṣetre—in the place of pilgrimage; kuru-kṣetre—in the place named Kurukṣetra; samavetāḥ—assembled; yuyutsavaḥ—desiring to fight; māmakāḥ—my party (sons); pāṇḍavāḥ—the sons of Pāṇḍu; ca—and; eva—certainly; kim—what; akurvata—did they do; sañjaya—O Sañjaya.",
        translation: "Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?",
        purport: "Bhagavad-gītā is the widely read theistic science summarized in the Gītā-māhātmya (Glorification of the Gītā). There it says that one should read Bhagavad-gītā very scrutinizingly with the help of a person who is a devotee of Śrī Kṛṣṇa and try to understand it without personally motivated interpretations. The example of clear understanding is there in the Bhagavad-gītā itself, in the way the teaching is understood by Arjuna, who heard the Gītā directly from the Lord. If someone is fortunate enough to understand the Bhagavad-gītā in that line of disciplic succession, without motivated interpretation, then he surpasses all studies of Vedic wisdom, and all scriptures of the world. One will find in the Bhagavad-gītā all that is contained in other scriptures, but the reader will also find things which are not to be found elsewhere. That is the specific standard of the Gītā. It is the perfect theistic science because it is directly spoken by the Supreme Personality of Godhead, Lord Śrī Kṛṣṇa."
      },
      {
        verse: 2,
        sanskrit: "सञ्जय उवाच | दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा | आचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ||२||",
        transliteration: "sañjaya uvāca\ndṛṣṭvā tu pāṇḍavānīkaṁ\nvyūḍhaṁ duryodhanas tadā\nācāryam upasaṅgamya\nrājā vacanam abravīt",
        synonyms: "sañjayaḥ uvāca—Sañjaya said; dṛṣṭvā—after seeing; tu—but; pāṇḍava-anīkam—the soldiers of the Pāṇḍavas; vyūḍham—arranged in a military phalanx; duryodhanaḥ—King Duryodhana; tadā—at that time; ācāryam—the teacher; upasaṅgamya—approaching; rājā—the king; vacanam—words; abravīt—spoke.",
        translation: "Sañjaya said: O King, after looking over the army arranged in military formation by the sons of Pāṇḍu, King Duryodhana went to his teacher and spoke the following words.",
        purport: "Dhṛtarāṣṭra was blind from birth. Unfortunately, he was also bereft of spiritual vision. He knew very well that his sons were equally blind in the matter of religion, and he was sure that they could never reach an understanding with the Pāṇḍavas, who were all pious since childhood. Still he was doubtful about the influence of the place of pilgrimage, and Sañjaya could understand his motive in asking about the situation on the battlefield. Sañjaya wanted, therefore, to encourage the despondent king and thus assured him that his sons were not going to make any sort of compromise under the influence of the holy place. Sañjaya therefore informed the king that his son, Duryodhana, after seeing the military force of the Pāṇḍavas, at once went to the commander in chief, Droṇācārya, to inform him of the real position. Although Duryodhana is mentioned as the king, he still had to go to the commander on account of the seriousness of the situation."
      },
      {
        verse: 3,
        sanskrit: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् | व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||३||",
        transliteration: "paśyaitāṁ pāṇḍu-putrāṇām\nācārya mahatīṁ camūm\nvyūḍhāṁ drupada-putreṇa\ntava śiṣyeṇa dhīmatā",
        synonyms: "paśya—behold; etām—this; pāṇḍu-putrāṇām—of the sons of Pāṇḍu; ācārya—O teacher; mahatīm—great; camūm—military force; vyūḍhām—arranged; drupada-putreṇa—by the son of Drupada; tava—your; śiṣyeṇa—disciple; dhī-matā—very intelligent.",
        translation: "O my teacher, behold the great army of the sons of Pāṇḍu, so expertly arranged by your intelligent disciple the son of Drupada.",
        purport: "Duryodhana, a great diplomat, wanted to point out the defects of Droṇācārya, the great brāhmaṇa commander in chief. Droṇācārya had some political quarrel with King Drupada, the father of Draupadī, who was Arjuna's wife. As a result of this quarrel, Drupada performed a great sacrifice, by which he received the benediction of having a son who would be able to kill Droṇācārya. Droṇācārya knew this perfectly well, and yet as a liberal brāhmaṇa he did not hesitate to impart all his military secrets when the son of Drupada, Dhṛṣṭadyumna, was entrusted to him for military education. Now, on the Battlefield of Kurukṣetra, Dhṛṣṭadyumna took the side of the Pāṇḍavas, and it was he who arranged for their military phalanx, after having learned the art from Droṇācārya. Duryodhana pointed out this mistake of Droṇācārya's so that he might be alert and uncompromising in the fighting."
      },
      {
        verse: 4,
        sanskrit: "अत्र शूरा महेष्वासा भीमार्जुनसमा युधि | युयुधानो विराटश्च द्रुपदश्च महारथः ||४||",
        transliteration: "atra śūrā maheṣv-āsā\nbhīmārjuna-samā yudhi\nyuyudhāno virāṭaś ca\ndrupadaś ca mahā-rathaḥ",
        synonyms: "atra—here; śūrāḥ—heroes; mahā-iṣu-āsāḥ—mighty bowmen; bhīma-arjuna—to Bhīma and Arjuna; samāḥ—equal; yudhi—in the fight; yuyudhānaḥ—Yuyudhāna; virāṭaḥ—Virāṭa; ca—also; drupadaḥ—Drupada; ca—also; mahā-rathaḥ—great fighter.",
        translation: "Here in this army are many heroic bowmen equal in fighting to Bhīma and Arjuna: great fighters like Yuyudhāna, Virāṭa and Drupada.",
        purport: "Even though Dhṛṣṭadyumna was not a very important obstacle in the face of Droṇācārya's very great power in the military art, there were many others who were causes of fear. They are mentioned by Duryodhana as great stumbling blocks on the path of victory because each and every one of them was as formidable as Bhīma and Arjuna. He knew the strength of Bhīma and Arjuna, and thus he compared the others with them."
      },
      {
        verse: 5,
        sanskrit: "धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान् | पुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः ||५||",
        transliteration: "dhṛṣṭaketuś cekitānaḥ\nkāśirājaś ca vīryavān\npurujitkuntibhojaś ca\nśaibyaś ca nara-puṅgavaḥ",
        synonyms: "dhṛṣṭaketuḥ—Dhṛṣṭaketu; cekitānaḥ—Cekitāna; kāśirājaḥ—Kāśirāja; ca—also; vīrya-vān—very powerful; purujit—Purujit; kuntibhojaḥ—Kuntibhoja; ca—and; śaibyaḥ—Śaibya; ca—and; nara-puṅgavaḥ—hero in human society.",
        translation: "There are also great heroic, powerful fighters like Dhṛṣṭaketu, Cekitāna, Kāśirāja, Purujit, Kuntibhoja and Śaibya.",
        purport: "Duryodhana mentioned the exceptional heroes in the battle, all of whom are ever-victorious. Virāṭa is the father of Uttarā, the young woman who was married to the son of Arjuna. Arjuna's son Abhimanyu married the daughter of Mahārāja Virāṭa. The word nara-puṅgavaḥ is significant. It means heroes in human society and this indicates that they were chosen for their military excellence."
      }
    ]
  },
  {
    chapter: 2,
    title: "Contents of the Gītā Summarized",
    verses: [
      {
        verse: 1,
        sanskrit: "सञ्जय उवाच | तं तथा कृपयाविष्टमश्रुपूर्णाकुलेक्षणम् | विषीदन्तमिदं वाक्यमुवाच मधुसूदनः ||१||",
        transliteration: "sañjaya uvāca\ntaṁ tathā kṛpayāviṣṭam\naśru-pūrṇākulekṣaṇam\nviṣīdantam idaṁ vākyam\nuvāca madhusūdanaḥ",
        synonyms: "sañjayaḥ uvāca—Sañjaya said; tam—unto Arjuna; tathā—thus; kṛpayā—by compassion; āviṣṭam—overwhelmed; aśru-pūrṇa-ākula—full of tears; īkṣaṇam—eyes; viṣīdantam—lamenting; idam—these; vākyam—words; uvāca—said; madhusūdanaḥ—the killer of Madhu.",
        translation: "Sañjaya said: Seeing Arjuna full of compassion, his mind depressed, his eyes full of tears, Madhusūdana, Kṛṣṇa, spoke the following words.",
        purport: "Material compassion, lamentation and tears are all signs of ignorance of the real self. Compassion for the eternal soul is self-realization. The word 'Madhusūdana' is significant in this verse. Lord Kṛṣṇa killed the demon Madhu, and now Arjuna wanted Kṛṣṇa to kill the demon of misunderstanding that had overtaken him in the discharge of his duty. No one knows where compassion should be applied. Compassion for the dress of a drowning man is senseless. A man fallen in the ocean of nescience cannot be saved simply by rescuing his outward dress—the gross material body. One who does not know this and laments for the outward dress is called a śūdra, or one who laments unnecessarily. Arjuna was a kṣatriya, and this conduct was not expected from him. Lord Kṛṣṇa, however, can dissipate the lamentation of the ignorant man, and for this purpose the Bhagavad-gītā was sung by Him."
      },
      {
        verse: 2,
        sanskrit: "श्रीभगवानुवाच | कुतस्त्वा कश्मलमिदं विषमे समुपस्थितम् | अनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन ||२||",
        transliteration: "śrī-bhagavān uvāca\nkutas tvā kaśmalam idaṁ\nviṣame samupasthitam\nanārya-juṣṭam asvargyam\nakīrti-karam arjuna",
        synonyms: "śrī-bhagavān uvāca—the Supreme Personality of Godhead said; kutaḥ—wherefrom; tvā—unto you; kaśmalam—dirtiness; idam—this lamentation; viṣame—in this hour of crisis; samupasthitam—arrived; anārya—persons who do not know the value of life; juṣṭam—practiced by; asvargyam—which does not lead to higher planets; akīrti—infamy; karam—the cause of; arjuna—O Arjuna.",
        translation: "The Supreme Personality of Godhead said: My dear Arjuna, how have these impurities come upon you? They are not at all befitting a man who knows the value of life. They lead not to higher planets but to infamy.",
        purport: "Kṛṣṇa and the Supreme Personality of Godhead are identical. Therefore Lord Kṛṣṇa is referred to as Bhagavān throughout the Gītā. Bhagavān is the ultimate in the Absolute Truth. Absolute Truth is realized in three phases of understanding, namely Brahman, or the impersonal all-pervasive spirit; Paramātmā, or the localized aspect of the Supreme within the heart of all living entities; and Bhagavān, or the Supreme Personality of Godhead, Lord Kṛṣṇa. In the Śrīmad-Bhāgavatam (1.2.11) this conception of the Absolute Truth is explained thus: 'The Absolute Truth is realized in three phases of understanding by the knower of the Absolute Truth, and all of them are identical. Such phases of the Absolute Truth are expressed as Brahman, Paramātmā, and Bhagavān.'"
      },
      {
        verse: 3,
        sanskrit: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते | क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप ||३||",
        transliteration: "klaibyaṁ mā sma gamaḥ pārtha\nnaitat tvayy upapadyate\nkṣudraṁ hṛdaya-daurbalyaṁ\ntyaktvottiṣṭha paran-tapa",
        synonyms: "klaibyam—impotence; mā sma—do not; gamaḥ—take to; pārtha—O son of Pṛthā; na—never; etat—this; tvayi—unto you; upapadyate—is befitting; kṣudram—petty; hṛdaya—of the heart; daurbalyam—weakness; tyaktvā—giving up; uttiṣṭha—get up; param-tapa—O chastiser of the enemies.",
        translation: "O son of Pṛthā, do not yield to this degrading impotence. It does not become you. Give up such petty weakness of heart and arise, O chastiser of the enemy.",
        purport: "Arjuna was addressed as the son of Pṛthā, who happened to be the sister of Kṛṣṇa's father Vasudeva. Therefore Arjuna had a blood relationship with Kṛṣṇa. If the son of a kṣatriya declines to fight, he is a kṣatriya in name only, and if the son of a brāhmaṇa acts impiously, he is a brāhmaṇa in name only. Such kṣatriyas and brāhmaṇas are unworthy sons of their fathers; therefore, Kṛṣṇa did not want Arjuna to become an unworthy son of a kṣatriya. Arjuna was the most intimate friend of Kṛṣṇa, and Kṛṣṇa was directly guiding him on the chariot; but in spite of all these credits, if Arjuna abandoned the battle he would be committing an infamous act. Therefore Kṛṣṇa said that such an attitude in Arjuna did not fit his personality. Arjuna might argue that he would give up the battle on the grounds of his magnanimous attitude for the most respectable Bhīṣma and his relatives, but Kṛṣṇa considered that sort of magnanimity mere weakness of heart."
      },
      {
        verse: 4,
        sanskrit: "अर्जुन उवाच | कथं भीष्ममहं सङ्ख्ये द्रोणं च मधुसूदन | इषुभिः प्रतियोत्स्यामि पूजार्हावरिसूदन ||४||",
        transliteration: "arjuna uvāca\nkathaṁ bhīṣmam ahaṁ saṅkhye\ndroṇaṁ ca madhusūdana\niṣubhiḥ pratiyotsyāmi\npūjārhāv ari-sūdana",
        synonyms: "arjunaḥ uvāca—Arjuna said; katham—how; bhīṣmam—Bhīṣma; aham—I; saṅkhye—in the fight; droṇam—Droṇa; ca—also; madhusūdana—O killer of Madhu; iṣubhiḥ—with arrows; pratiyotsyāmi—shall counterattack; pūjā-arhau—those who are worshipable; ari-sūdana—O killer of the enemies.",
        translation: "Arjuna said: O killer of enemies, O killer of Madhu, how can I counterattack with arrows in battle men like Bhīṣma and Droṇa, who are worthy of my worship?",
        purport: "Respectable superiors like Bhīṣma the grandfather and Droṇācārya the teacher are always worshipable. Even if they attack, they should not be counterattacked. It is general etiquette that superiors are not to be offered even a verbal fight. Even if they are sometimes harsh in behavior, they should not be harshly treated. Then, how is it possible for Arjuna to counterattack them? Would Kṛṣṇa ever attack His own grandfather, Ugrasena, or His teacher, Sāndīpani Muni? These were some of the arguments offered by Arjuna to Kṛṣṇa."
      },
      {
        verse: 5,
        sanskrit: "गुरूनहत्वा हि महानुभावान् श्रेयो भोक्तुं भैक्ष्यमपीह लोके | हत्वार्थकामांस्तु गुरूनिहैव भुञ्जीय भोगान् रुधिरप्रदिग्धान् ||५||",
        transliteration: "gurūn ahatvā hi mahānubhāvān\nśreyo bhoktuṁ bhaikṣyam apīha loke\nhatvārtha-kāmāṁs tu gurūn ihaiva\nbhuñjīya bhogān rudhira-pradigdhān",
        synonyms: "gurūn—the superiors; ahatvā—not killing; hi—certainly; mahā-anubhāvān—great souls; śreyaḥ—it is better; bhoktum—to enjoy life; bhaikṣyam—by begging; api—even; iha—in this life; loke—in this world; hatvā—killing; artha—gain; kāmān—desiring; tu—but; gurūn—superiors; iha—in this world; eva—certainly; bhuñjīya—one has to enjoy; bhogān—enjoyable things; rudhira—blood; pradigdhān—tainted with.",
        translation: "It would be better to live in this world by begging than to live at the cost of the lives of great souls who are my teachers. Even though desiring worldly gain, they are superiors. If they are killed, everything we enjoy will be tainted with blood.",
        purport: "According to scriptural codes, a teacher who engages in an abominable action and has lost his sense of discrimination is fit to be abandoned. Bhīṣma and Droṇa were obliged to take the side of Duryodhana because of his financial assistance, although they should not have accepted such a position simply on financial considerations. Under the circumstances, they have lost the respectability of teachers. But Arjuna thinks that nevertheless they remain his superiors, and therefore to enjoy material profits after killing them would mean to enjoy spoils tainted with blood."
      }
    ]
  },
  {
    chapter: 3,
    title: "Karma-yoga",
    verses: [
      {
        verse: 1,
        sanskrit: "अर्जुन उवाच | ज्यायसी चेत्कर्मणस्ते मता बुद्धिर्जनार्दन | तत्किं कर्मणि घोरे मां नियोजयसि केशव ||१||",
        transliteration: "arjuna uvāca\njyāyasī cet karmaṇas te\nmatā buddhir janārdana\ntat kiṁ karmaṇi ghore māṁ\nniyojayasi keśava",
        synonyms: "arjunaḥ uvāca—Arjuna said; jyāyasī—better; cet—if; karmaṇaḥ—than fruitive action; te—by You; matā—is considered; buddhiḥ—intelligence; janārdana—O Kṛṣṇa; tat—therefore; kim—why; karmaṇi—in action; ghore—ghastly; mām—me; niyojayasi—You are engaging; keśava—O Kṛṣṇa.",
        translation: "Arjuna said: O Janārdana, O Keśava, why do You want to engage me in this ghastly warfare, if You think that intelligence is better than fruitive work?",
        purport: "The Supreme Personality of Godhead Śrī Kṛṣṇa has very elaborately described the constitution of the soul in the previous chapter, with a view to delivering His intimate friend Arjuna from the ocean of material grief. And the path of realization has been recommended: buddhi-yoga, or Kṛṣṇa consciousness. Sometimes Kṛṣṇa consciousness is misunderstood to be inertia, and one with such a misunderstanding often withdraws to a secluded place to become fully Kṛṣṇa conscious by chanting the holy name of Lord Kṛṣṇa. But without being trained in the philosophy of Kṛṣṇa consciousness, it is not advisable to chant the holy name of Kṛṣṇa in a secluded place where one may acquire only cheap adoration from the innocent public."
      },
      {
        verse: 2,
        sanskrit: "व्यामिश्रेणेव वाक्येन बुद्धिं मोहयसीव मे | तदेकं वद निश्चित्य येन श्रेयोऽहमाप्नुयाम् ||२||",
        transliteration: "vyāmiśreṇeva vākyena\nbuddhiṁ mohayasīva me\ntad ekaṁ vada niścitya\nyena śreyo 'ham āpnuyām",
        synonyms: "vyāmiśreṇa—by equivocal; iva—certainly; vākyena—words; buddhim—intelligence; mohayasi—You are bewildering; iva—certainly; me—my; tat—therefore; ekam—only one; vada—please tell; niścitya—ascertaining; yena—by which; śreyaḥ—real benefit; aham—I; āpnuyām—may have.",
        translation: "My intelligence is bewildered by Your equivocal instructions. Therefore, please tell me decisively which will be most beneficial for me.",
        purport: "In the previous chapter, as a prelude to the Bhagavad-gītā, many different paths were explained, such as sāṅkhya-yoga, buddhi-yoga, control of the senses by intelligence, work without fruitive desire, and the position of the neophyte. This was all presented unsystematically. A more organized outline of the path would be necessary for action and understanding. Arjuna, therefore, wanted to clear up these apparently confusing matters so that any common man could accept them without misinterpretation. Although Kṛṣṇa had no intention of confusing Arjuna by any jugglery of words, Arjuna could not follow the process of Kṛṣṇa consciousness—either by inertia or by active service. In other words, by his questions he is clearing the path of Kṛṣṇa consciousness for all students who seriously want to understand the mystery of the Bhagavad-gītā."
      },
      {
        verse: 3,
        sanskrit: "श्रीभगवानुवाच | लोकेऽस्मिन्द्विविधा निष्ठा पुरा प्रोक्ता मयानघ | ज्ञानयोगेन साङ्ख्यानां कर्मयोगेन योगिनाम् ||३||",
        transliteration: "śrī-bhagavān uvāca\nloke 'smin dvi-vidhā niṣṭhā\npurā proktā mayānagha\njñāna-yogena sāṅkhyānāṁ\nkarma-yogena yoginām",
        synonyms: "śrī-bhagavān uvāca—the Supreme Personality of Godhead said; loke—in the world; asmin—this; dvi-vidhā—two kinds of; niṣṭhā—faith; purā—formerly; proktā—were said; mayā—by Me; anagha—O sinless one; jñāna-yogena—by the linking process of knowledge; sāṅkhyānām—of the empiric philosophers; karma-yogena—by the linking process of devotion; yoginām—of the devotees.",
        translation: "The Supreme Personality of Godhead said: O sinless Arjuna, I have already explained that there are two classes of men who try to realize the self. Some are inclined to understand it by empirical, philosophical speculation, and others by devotional service.",
        purport: "In the Second Chapter, verse 39, the Lord explained two kinds of procedures—namely sāṅkhya-yoga and karma-yoga, or buddhi-yoga. In this verse, the Lord explains the same more clearly. Sāṅkhya-yoga, or the analytical study of the nature of spirit and matter, is the subject matter for persons who are inclined to speculate and understand things by experimental knowledge and philosophy. The other class of men work in Kṛṣṇa consciousness, as it is explained in the 61st verse of the Second Chapter. The Lord has explained, also in the 39th verse, that by working by the principles of buddhi-yoga, or Kṛṣṇa consciousness, one can be relieved from the bonds of action; and, furthermore, there is no flaw in the process."
      },
      {
        verse: 4,
        sanskrit: "न कर्मणामनारम्भान्नैष्���र्म्यं पुरुषोऽश्नुते | न च संन्यसनादेव सिद्धिं समधिगच्छति ||४||",
        transliteration: "na karmaṇām anārambhān\nnaiṣkarmyaṁ puruṣo 'śnute\nna ca sannyasanād eva\nsiddhiṁ samadhigacchati",
        synonyms: "na—not; karmaṇām—of prescribed duties; anārambhāt—by nonperformance; naiṣkarmyam—freedom from reaction; puruṣaḥ—a man; aśnute—achieves; na—nor; ca—also; sannyasanāt—by renunciation; eva—simply; siddhim—success; samadhigacchati—attains.",
        translation: "Not by merely abstaining from work can one achieve freedom from reaction, nor by renunciation alone can one attain perfection.",
        purport: "The renounced order of life can be accepted when one has been purified by the discharge of the prescribed form of duties which are laid down just to purify the hearts of materialistic men. Without purification, one cannot attain success by abruptly adopting the fourth order of life (sannyāsa). According to the empirical philosophers, simply by adopting sannyāsa, or retiring from fruitive activities, one at once becomes as good as Nārāyaṇa. But Lord Kṛṣṇa does not approve this principle. Without purification of heart, sannyāsa is simply a disturbance to the social order. On the other hand, if someone takes to the transcendental service of the Lord, even without discharging his prescribed duties, whatever he may be able to advance in the cause is accepted by the Lord (buddhi-yoga). Svalpam apy asya dharmasya trāyate mahato bhayāt. Even a slight performance of such a principle enables one to overcome great difficulties."
      },
      {
        verse: 5,
        sanskrit: "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत् | कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः ||५||",
        transliteration: "na hi kaścit kṣaṇam api\njātu tiṣṭhaty akarma-kṛt\nkāryate hy avaśaḥ karma\nsarvaḥ prakṛti-jair guṇaiḥ",
        synonyms: "na—nor; hi—certainly; kaścit—anyone; kṣaṇam—a moment; api—also; jātu—at any time; tiṣṭhati—remains; akarma-kṛt—without doing something; kāryate—is forced to do; hi—certainly; avaśaḥ—helplessly; karma—work; sarvaḥ—all; prakṛti-jaiḥ—born of the modes of material nature; guṇaiḥ—by the qualities.",
        translation: "Everyone is forced to act helplessly according to the qualities he has acquired from the modes of material nature; therefore no one can refrain from doing something, not even for a moment.",
        purport: "It is not a question of embodied life, but it is the nature of the soul to be always active. Without the presence of the spirit soul, the material body cannot move. The body is only a dead vehicle to be worked by the spirit soul, which is always active and cannot stop even for a moment. As such, the spirit soul has to be engaged in the good work of Kṛṣṇa consciousness, otherwise it will be engaged in occupations dictated by illusory energy. In contact with material energy, the spirit soul acquires material modes, and to purify the soul from such affinities it is necessary to engage in the prescribed duties enjoined in the śāstras. But if the soul is engaged in his natural function of Kṛṣṇa consciousness, whatever he is able to do is good for him. The Śrīmad-Bhāgavatam (1.5.17) affirms this: 'If someone takes to Kṛṣṇa consciousness, even though he may not follow the prescribed duties in the śāstras nor execute the devotional service properly, and even though he may fall down from the standard, there is no loss or evil for him.'"
      }
    ]
  },
  {
    chapter: 4,
    title: "Transcendental Knowledge",
    verses: [
      {
        verse: 1,
        sanskrit: "श्रीभगवानुवाच | इमं विवस्वते योगं प्रोक्तवानहमव्ययम् | विवस्वान्मनवे प्राह मनुरिक्ष्वाकवेऽब्रवीत् ||१||",
        transliteration: "śrī-bhagavān uvāca\nimaṁ vivasvate yogaṁ\nproktavān aham avyayam\nvivasvān manave prāha\nmanur ikṣvākave 'bravīt",
        synonyms: "śrī-bhagavān uvāca—the Supreme Personality of Godhead said; imam—this; vivasvate—unto the sun-god; yogam—the science of one's relationship to the Supreme; proktavān—instructed; aham—I; avyayam—imperishable; vivasvān—Vivasvān (the sun-god's name); manave—unto the father of mankind (of the name Vaivasvata); prāha—told; manuḥ—the father of mankind; ikṣvākave—unto King Ikṣvāku; abravīt—said.",
        translation: "The Personality of Godhead, Lord Śrī Kṛṣṇa, said: I instructed this imperishable science of yoga to the sun-god, Vivasvān, and Vivasvān instructed it to Manu, the father of mankind, and Manu in turn instructed it to Ikṣvāku.",
        purport: "Herein we find the history of the Bhagavad-gītā traced from a remote time when it was delivered to the royal order of all planets, beginning from the sun planet. The kings of all planets are especially meant for the protection of the inhabitants, and therefore the royal order should understand the science of Bhagavad-gītā in order to be able to rule the citizens and protect them from material bondage to lust. Human life is meant for cultivation of spiritual knowledge, in eternal relationship with the Supreme Personality of Godhead, and the executive heads of all states and all planets are obliged to impart this lesson to the citizens by education, culture and devotion. In other words, the executive heads of all states are intended to spread the science of Kṛṣṇa consciousness so that the people may take advantage of this great science and pursue a successful path, utilizing the opportunity of the human form of life."
      },
      {
        verse: 2,
        sanskrit: "एवं परम्पराप्राप्तमिमं राजर्षयो विदुः | स कालेनेह महता योगो नष्टः परन्तप ||२||",
        transliteration: "evaṁ paramparā-prāptam\nimaṁ rājarṣayo viduḥ\nsa kāleneha mahatā\nyogo naṣṭaḥ paran-tapa",
        synonyms: "evam—thus; paramparā—by disciplic succession; prāptam—received; imam—this science; rāja-ṛṣayaḥ—the saintly kings; viduḥ—understood; saḥ—that knowledge; kālena—in the course of time; iha—in this world; mahatā—great; yogaḥ—the science of one's relationship with the Supreme; naṣṭaḥ—scattered; param-tapa—O Arjuna, subduer of the enemies.",
        translation: "This supreme science was thus received through the chain of disciplic succession, and the saintly kings understood it in that way. But in course of time the succession was broken, and therefore the science as it is appears to be lost.",
        purport: "It is clearly stated that the Gītā was especially meant for the saintly kings because they were to execute its purpose in ruling over the citizens. Certainly Bhagavad-gītā was never meant for the demonic persons, who would dissipate its value for no one's benefit and would devise all types of interpretations according to personal whims. As soon as the original purpose was scattered by the motives of the unscrupulous commentators, there arose the need to reestablish the disciplic succession. Five thousand years ago it was detected by the Lord Himself that the disciplic succession was broken, and therefore He declared that the purpose of the Gītā appeared to be lost. In the same way, at the present moment also there are so many editions of the Gītā (especially in English), but almost all of them are not according to authorized disciplic succession. There are innumerable interpretations rendered by different mundane scholars, but almost all of them do not accept the Supreme Personality of Godhead, Kṛṣṇa, although they make a good business on the words of Śrī Kṛṣṇa."
      },
      {
        verse: 3,
        sanskrit: "स एवायं मया तेऽद्य योगः प्रोक्तः पुरातनः | भक्तोऽसि मे सखा चेति रहस्यं ह्येतदुत्तमम् ||३||",
        transliteration: "sa evāyaṁ mayā te 'dya\nyogaḥ proktaḥ purātanaḥ\nbhakto 'si me sakhā ceti\nrahasyaṁ hy etad uttamam",
        synonyms: "saḥ—the same; eva—certainly; ayam—this; mayā—by Me; te—unto you; adya—today; yogaḥ—the science of yoga; proktaḥ—spoken; purātanaḥ—very old; bhaktaḥ—devotee; asi—you are; me—My; sakhā—friend; ca—also; iti—therefore; rahasyam—mystery; hi—certainly; etat—this; uttamam—transcendental.",
        translation: "That very ancient science of the relationship with the Supreme is today told by Me to you because you are My devotee as well as My friend and can therefore understand the transcendental mystery of this science.",
        purport: "There are two classes of men, namely the devotee and the demon. The Lord selected Arjuna as the recipient of this great science owing to his being a devotee of the Lord, but for the demon it is not possible to understand this great mysterious science. There are a number of editions of this great book of knowledge. Some of them have commentaries by the devotees, and some of them have commentaries by the demons. Commentation by the devotees is real, whereas that of the demons is useless. Arjuna accepts Śrī Kṛṣṇa as the Supreme Personality of Godhead, and any commentary on the Gītā following in the footsteps of Arjuna is real devotional service to the cause of this great science. The demonic, however, concoct something about Kṛṣṇa and mislead the public and general readers from the path of Kṛṣṇa's instructions."
      },
      {
        verse: 4,
        sanskrit: "अर्जुन उवाच | अपरं भवतो जन्म परं जन्म विवस्वतः | कथमेतद्विजानीयां त्वमादौ प्रोक्तवानिति ||४||",
        transliteration: "arjuna uvāca\naparaṁ bhavato janma\nparaṁ janma vivasvataḥ\nkatham etad vijānīyāṁ\ntvam ādau proktavān iti",
        synonyms: "arjunaḥ uvāca—Arjuna said; aparam—junior; bhavataḥ—Your; janma—birth; param—superior; janma—birth; vivasvataḥ—of the sun-god; katham—how; etat—this; vijānīyām—shall I understand; tvam—You; ādau—in the beginning; proktavān—instructed; iti—thus.",
        translation: "Arjuna said: The sun-god Vivasvān is senior by birth to You. How am I to understand that in the beginning You instructed this science to him?",
        purport: "Arjuna is an accepted devotee of the Lord, so how could he not believe Kṛṣṇa's words? The fact is that Arjuna is not inquiring for himself but for those who do not believe in the Supreme Personality of Godhead or for the demons who do not like the idea that Kṛṣṇa should be accepted as the Supreme Personality of Godhead; for them only Arjuna inquires on this point, as if he were himself not aware of the Personality of Godhead, or Kṛṣṇa. As it will be evident from the Tenth Chapter, Arjuna knew perfectly well that Kṛṣṇa is the Supreme Personality of Godhead, the fountainhead of everything and the last word in Transcendence. Of course, Kṛṣṇa also appeared as the son of Devakī on this earth. How Kṛṣṇa remained the same Supreme Personality of Godhead, the eternal, original person, is very difficult for an ordinary man to understand. Therefore, to clarify this point, Arjuna put this question before Kṛṣṇa so that He Himself could speak authoritatively."
      },
      {
        verse: 5,
        sanskrit: "श्रीभगवानुवाच | बहूनि मे व्यतीतानि जन्मानि तव चार्जुन | तान्यहं वेद सर्वाणि न त्वं वेत्थ परन्तप ||५||",
        transliteration: "śrī-bhagavān uvāca\nbahūni me vyatītāni\njanmāni tava cārjuna\ntāny ahaṁ veda sarvāṇi\nna tvaṁ vettha paran-tapa",
        synonyms: "śrī-bhagavān uvāca—the Personality of Godhead said; bahūni—many; me—of Mine; vyatītāni—have passed; janmāni—births; tava—of yours; ca—and also; arjuna—O Arjuna; tāni—those; aham—I; veda—do know; sarvāṇi—all; na—not; tvam—you; vettha—know; param-tapa—O subduer of the enemy.",
        translation: "The Personality of Godhead said: Many, many births both you and I have passed. I can remember all of them, but you cannot, O subduer of the enemy!",
        purport: "In the Brahma-saṁhitā (5.33) we have information of many, many incarnations of the Lord. It is stated there: 'I worship the Supreme Personality of Godhead, Govinda [Kṛṣṇa], who is the original person—absolute, infallible, without beginning. Although He expands into unlimited forms, still He is the same original, the oldest, and the person always appearing as a fresh youth. Such eternal, blissful, all-knowing forms of the Lord are usually understood by the best Vedic scholars, but they are always manifest to pure, unalloyed devotees.' It is also stated in Brahma-saṁhitā (5.39): 'I worship the Supreme Personality of Godhead, Govinda [Kṛṣṇa], who is always situated in various incarnations such as Rāma, Nṛsiṁha and many sub-incarnations as well, but who is the original Personality of Godhead known as Kṛṣṇa, and who incarnates personally also.'"
      }
    ]
  },
  {
    chapter: 5,
    title: "Karma-yoga—Action in Kṛṣṇa Consciousness",
    verses: [
      {
        verse: 1,
        sanskrit: "अर्जुन उवाच | संन्यासं कर्मणां कृष्ण पुनर्योगं च शंससि | यच्छ्रेय एतयोरेकं तन्मे ब्रूहि सुनिश्चितम् ||१||",
        transliteration: "arjuna uvāca\nsannyāsaṁ karmaṇāṁ kṛṣṇa\npunar yogaṁ ca śaṁsasi\nyac chreya etayor ekaṁ\ntan me brūhi su-niścitam",
        synonyms: "arjunaḥ uvāca—Arjuna said; sannyāsam—renunciation; karmaṇām—of all activities; kṛṣṇa—O Kṛṣṇa; punaḥ—again; yogam—devotional service; ca—also; śaṁsasi—You are praising; yat—which; śreyaḥ—is more beneficial; etayoḥ—of these two; ekam—one; tat—that; me—unto me; brūhi—please tell; su-niścitam—definitely.",
        translation: "Arjuna said: O Kṛṣṇa, first of all You ask me to renounce work, and then again You recommend work with devotion. Now will You kindly tell me definitely which of the two is more beneficial?",
        purport: "In this Fifth Chapter of the Bhagavad-gītā, the Lord says that work in devotional service is better than dry mental speculation. Devotional service is easier than the latter because, being transcendental in nature, it frees one from reaction. In the Second Chapter, preliminary knowledge of the soul and its entanglement in the material body were explained. How to get out of this material encagement by buddhi-yoga, or devotional service, was also explained therein. In the Third Chapter, it was explained that a person who is situated on the platform of knowledge no longer has any duties to perform. And in the Fourth Chapter the Lord told Arjuna that all kinds of sacrificial work culminate in knowledge. However, at the end of the Fourth Chapter, the Lord advised Arjuna to wake up and fight, being situated in perfect knowledge. Therefore, by simultaneously stressing the importance of both work in devotion and inaction in knowledge, Kṛṣṇa has perplexed Arjuna and confused his determination."
      },
      {
        verse: 2,
        sanskrit: "श्रीभगवानुवाच | संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ | तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ||२||",
        transliteration: "śrī-bhagavān uvāca\nsannyāsaḥ karma-yogaś ca\nniḥśreyasa-karāv ubhau\ntayos tu karma-sannyāsāt\nkarma-yogo viśiṣyate",
        synonyms: "śrī-bhagavān uvāca—the Personality of Godhead said; sannyāsaḥ—renunciation of work; karma-yogaḥ—work in devotion; ca—also; niḥśreyasa-karau—leading to the path of liberation; ubhau—both; tayoḥ—of the two; tu—but; karma-sannyāsāt—in comparison to the renunciation of fruitive work; karma-yogaḥ—work in devotion; viśiṣyate—is better.",
        translation: "The Personality of Godhead replied: The renunciation of work and work in devotion are both good for liberation. But, of the two, work in devotional service is better than renunciation of work.",
        purport: "Fruitive activities (seeking sense gratification) are cause for material bondage. As long as one is engaged in activities aimed at improving the standard of bodily comfort, one is sure to transmigrate to different types of bodies, thereby continuing material bondage perpetually. Śrīmad-Bhāgavatam (5.5.4-6) confirms this as follows: 'People are mad after sense gratification, and they do not know that this present body, which is full of miseries, is a result of one's fruitive activities in the past. Although this body is temporary, it is always giving one trouble in many ways. Therefore, to act for sense gratification is not good. One is considered to be a failure in life as long as he makes no inquiry about the nature of work for fruitive results, for as long as one is engrossed in the consciousness of sense gratification one has to transmigrate from one body to another. Although the mind may be engrossed in fruitive activities and influenced by ignorance, one must develop a love for devotional service to Vāsudeva. Only then can one have the opportunity to get out of the bondage of material existence.'"
      },
      {
        verse: 3,
        sanskrit: "ज्ञेयः स नित्यसंन्यासी यो न द्वेष्टि न काङ्क्षति | निर्द्वन्द्वो हि महाबाहो सुखं बन्धात्प्रमुच्यते ||३||",
        transliteration: "jñeyaḥ sa nitya-sannyāsī\nyo na dveṣṭi na kāṅkṣati\nnirdvandvo hi mahā-bāho\nsukhaṁ bandhāt pramucyate",
        synonyms: "jñeyaḥ—should be known; saḥ—he; nitya—always; sannyāsī—renouncer; yaḥ—who; na—never; dveṣṭi—abhors; na—nor; kāṅkṣati—desires; nirdvandvaḥ—free from all dualities; hi—certainly; mahā-bāho—O mighty-armed one; sukham—happily; bandhāt—from bondage; pramucyate—is completely liberated.",
        translation: "One who neither hates nor desires the fruits of his activities is known to be always renounced. Such a person, free from all dualities, easily overcomes material bondage and is completely liberated, O mighty-armed Arjuna.",
        purport: "One who is fully in Kṛṣṇa consciousness is always a renouncer because he feels neither hatred nor desire for the results of his actions. Such a renouncer, dedicated to the transcendental loving service of the Lord, is fully qualified in knowledge because he knows his constitutional position in his relationship with Kṛṣṇa. He knows fully well that Kṛṣṇa is the whole and that he is part and parcel of Kṛṣṇa. Such knowledge is perfect because it is qualitatively and quantitatively correct. The concept of oneness with Kṛṣṇa is incorrect because the part cannot be equal to the whole. Knowledge that one is one in quality yet different in quantity is correct transcendental knowledge leading one to become full in himself, having nothing to aspire to nor lament over. There is no duality in his mind because whatever he does, he does for Kṛṣṇa. Being thus freed from the platform of dualities, he is liberated—even in this material world."
      },
      {
        verse: 4,
        sanskrit: "साङ्ख्ययोगौ पृथग्बालाः प्रवदन्ति न पण्डिताः | एकमप्यास्थितः सम्यगुभयोर्विन्दते फलम् ||४||",
        transliteration: "sāṅkhya-yogau pṛthag bālāḥ\npravadanti na paṇḍitāḥ\nekam apy āsthitaḥ samyag\nubhayor vindate phalam",
        synonyms: "sāṅkhya—analytical study of the material world; yogau—work in devotional service; pṛthak—different; bālāḥ—the less intelligent; pravadanti—say; na—never; paṇḍitāḥ—the learned; ekam—in one; api—even; āsthitaḥ—being situated; samyak—complete; ubhayoḥ—of both; vindate—enjoys; phalam—the result.",
        translation: "Only the ignorant speak of devotional service [karma-yoga] as being different from the analytical study of the material world [Sāṅkhya]. Those who are actually learned say that he who applies himself well to one of these paths achieves the results of both.",
        purport: "The real purpose of philosophical research is to find the ultimate goal of life. Since the ultimate goal of life is self-realization, there is no difference between the conclusions reached by the two processes. By Sāṅkhya philosophical research one comes to the conclusion that a living entity is not a part and parcel of the material world but of the supreme spirit whole. Consequently, the spirit soul has nothing to do with the material world; his actions must be in some relation with the Supreme. When he acts in Kṛṣṇa consciousness, he is actually in his constitutional position. In the first process of Sāṅkhya, one has to become detached from matter, and in the devotional yoga process one has to attach himself to the work of Kṛṣṇa. Factually, both processes are the same, although superficially one process appears to involve detachment and the other process appears to involve attachment. Detachment from matter and attachment to Kṛṣṇa are one and the same. One who can see this sees things as they are."
      },
      {
        verse: 5,
        sanskrit: "यत्साङ्ख्यैः प्राप्यते स्थानं तद्योगैरपि गम्यते | एकं साङ्ख्यं च योगं च यः पश्यति स पश्यति ||५||",
        transliteration: "yat sāṅkhyaiḥ prāpyate sthānaṁ\ntad yogair api gamyate\nekaṁ sāṅkhyaṁ ca yogaṁ ca\nyaḥ paśyati sa paśyati",
        synonyms: "yat—what; sāṅkhyaiḥ—by means of Sāṅkhya philosophy; prāpyate—is achieved; sthānam—place; tat—that; yogaiḥ—by devotional service; api—also; gamyate—one can attain; ekam—one; sāṅkhyam—analytical study; ca—and; yogam—action in devotion; ca—and; yaḥ—one who; paśyati—sees; saḥ—he; paśyati—actually sees.",
        translation: "One who knows that the position reached by means of analytical study can also be achieved by devotional service, and who therefore sees analytical study and devotional service to be on the same level, sees things as they are.",
        purport: "The real purpose of philosophical research is to find the ultimate goal of life. Since the ultimate goal of life is self-realization, there is no difference between the conclusions reached by the two processes. By Sāṅkhya philosophical research one comes to the conclusion that a living entity is not a part and parcel of the material world, but of the supreme spirit whole. Consequently, the spirit soul has nothing to do with the material world; his actions must be in some relation with the Supreme. When he acts in Kṛṣṇa consciousness, he is actually in his constitutional position. In the first process, Sāṅkhya, one has to become detached from matter, and in the devotional yoga process one has to attach himself to the work of Kṛṣṇa. Factually, both processes are the same, although superficially one process appears to involve detachment and the other process appears to involve attachment. However, detachment from matter and attachment to Kṛṣṇa are one and the same. One who can see this sees things as they are."
      }
    ]
  }
];