const XLSX = require('xlsx');

// Array of all 37 test cases

const testCases = [

  // ================= 1. SENTENCE STRUCTURES =================
  { id: "Pos_Fun_0001", name: "Simple sentence", input: "mee paeena lassanayi.", expected: "මේ පෑන ලස්සනයි.", type: "exact" },

  { id: "Pos_Fun_0002", name: "Compound sentence", input: "bus eka aava, eth mama giye nae.", expected: "බස් එක ආවා, එත් මම ගියේ නෑ.", type: "exact" },

  { id: "Pos_Fun_0003", name: "Complex sentence", input: "kaema thibunoth api okkoma kanava.", expected: "කෑම තිබුණොත් අපි ඔක්කොම කනවා.", type: "exact" },

  { id: "Pos_Fun_0004", name: "Interrogative", input: "oyaata dhen kiyadha?", expected: "ඔයාට දැන් කීයද?", type: "exact" },

  { id: "Pos_Fun_0005", name: "Imperative", input: "dhoruva vahanndha.", expected: "දොරුව වහන්න.", type: "exact" },

  // ================= 2. DAILY LANGUAGE & GREETINGS =================
  { id: "Pos_Fun_0006", name: "Greeting", input: "kohomadha saebae?", expected: "කොහොමද සැප?", type: "exact" },

  { id: "Pos_Fun_0007", name: "Greeting (variant)", input: "kohomadha saebae?", expected: "කොහොමද?", type: "variant" },

  { id: "Pos_Fun_0008", name: "Polite greeting", input: "subha raathriyak!", expected: "සුභ රාත්‍රියක්!", type: "exact" },

  { id: "Pos_Fun_0009", name: "Polite request", input: "karunaakarala mata udhavu karannadha?", expected: "කරුණාකරල මට උදව් කරන්නද?", type: "exact" },

  // ================= 3. INFORMAL & COLLOQUIAL =================
  { id: "Pos_Fun_0010", name: "Informal phrasing", input: "uuta kiyapan enna kiyala.", expected: "ඌට කියපන් එන්න කියලා.", type: "exact" },

  { id: "Pos_Fun_0011", name: "Informal phrasing (formalized)", input: "uuta kiyapan enna kiyala.", expected: "එයාට කියන්න.", type: "variant" },

  { id: "Pos_Fun_0012", name: "Response", input: "ow, mama kivaa.", expected: "ඔව්, මම කිව්වා.", type: "exact" },

  // ================= 4. WORD COMBINATIONS =================
  { id: "Pos_Fun_0013", name: "Multi-word expression", input: "vathura bonna ooni", expected: "වතුර බොන්න ඕනි", type: "exact" },

  { id: "Pos_Fun_0014", name: "Collocation", input: "sinndhu kiyanna", expected: "සින්දු කියන්න", type: "exact" },

  { id: "Pos_Fun_0015", name: "Segmented phrase", input: "heta nihaalayee yamu", expected: "හෙට නිහාලයේ යමු", type: "exact" },

  { id: "Pos_Fun_0016", name: "Repetition emphasis", input: "hayiyen hayiyen dhuvanndha", expected: "හයියෙන් හයියෙන් දුවන්න", type: "exact" },

  // ================= 5. GRAMMATICAL FORMS =================
  { id: "Pos_Fun_0017", name: "Past tense", input: "api giya avurudhdhee hitiyaa.", expected: "අපි ගිය අවුරුද්දේ හිටියා.", type: "exact" },

  { id: "Pos_Fun_0018", name: "Present tense", input: "api dhaen yanavaa.", expected: "අපි දැන් යනවා.", type: "exact" },

  { id: "Pos_Fun_0019", name: "Future tense", input: "api heta dhenna balamu.", expected: "අපි හෙට දෙන්න බලමු.", type: "exact" },

  { id: "Pos_Fun_0020", name: "Negation", input: "eyaa dhennee naehae.", expected: "එයා දෙන්නේ නැහැ.", type: "exact" },

  { id: "Pos_Fun_0021", name: "Plural pronoun", input: "api okkoma ennam.", expected: "අපි ඔක්කොම එන්නම්.", type: "exact" },

  // ================= 6. MIXED LANGUAGE & TECHNICAL =================
  { id: "Pos_Fun_0022", name: "Brand term", input: "YouTube ekee video ekak", expected: "YouTube එකේ video එකක්", type: "exact" },

  { id: "Pos_Fun_0023", name: "Technical term", input: "Computer eka restart karanna.", expected: "Computer එක restart කරන්න.", type: "exact" },

  { id: "Pos_Fun_0024", name: "Place name", input: "api Maathara valata yamu.", expected: "අපි මාතර වලට යමු.", type: "exact" },

  // ================= 7. FORMATTING & PUNCTUATION =================
  { id: "Pos_Fun_0025", name: "Currency format", input: "mila LKR 500.00 venavaa.", expected: "මිල LKR 500.00 වෙනවා.", type: "exact" },

  { id: "Pos_Fun_0026", name: "Time format", input: "api 09:00 AM venakota ennam.", expected: "අපි 09:00 AM වෙනකොට එන්නම්.", type: "exact" },

  { id: "Pos_Fun_0027", name: "Date format", input: "adha 2026/01/30 venidhaa.", expected: "අද 2026/01/30 වෙනිදා.", type: "exact" },

  { id: "Pos_Fun_0028", name: "Line breaks", input: "api yamu\nheta udhee.", expected: "අපි යමු\nහෙට උදේ.", type: "exact" },

  // ================= 8. NEGATIVE / ROBUSTNESS =================
  { id: "Neg_Fun_0029", name: "Special characters", input: "!!! $$$ %%%", expected: "!!! $$$ %%%", type: "negative" },

  { id: "Neg_Fun_0030", name: "Numbers only", input: "9847293", expected: "9847293", type: "negative" },

  { id: "Neg_Fun_0031", name: "Mixed script", input: "Hello මම", expected: "Hello මම", type: "negative" },

  { id: "Neg_Fun_0032", name: "Emoji handling", input: "enna 😊", expected: "එන්න 😊", type: "exact" },

  // ================= 9. UI BEHAVIOUR =================
  { id: "Pos_UI_0033", name: "Real-time typing", input: "k", expected: "ක්", type: "exact" },

  { id: "Pos_UI_0034", name: "Clear input", input: "", expected: "", type: "negative" },

  { id: "Pos_UI_0035", name: "Bracket preservation", input: "{gedhara}", expected: "{ගෙදර}", type: "exact" }
];


// Create workbook
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(testCases);
XLSX.utils.book_append_sheet(wb, ws, "TestCases");

// Write the Excel file
XLSX.writeFile(wb, "IT3040_TestCases.xlsx");
console.log("Excel file generated successfully!");
