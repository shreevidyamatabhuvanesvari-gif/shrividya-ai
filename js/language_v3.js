/* ======================================
   SHRIVIDYA AI — LANGUAGE ENGINE v3
   Natural Response Builder (LEVEL 3)
   Human-like reply formation
   ====================================== */

var LanguageV3 = (function () {

    /* ---------- Soft Starters ---------- */
    var starters = [
        "सुनो… ",
        "देखो… ",
        "अगर सरल शब्दों में कहें तो… ",
        "मैं तुम्हें आसान तरीके से बताती हूँ… ",
        "समझने के लिए ऐसे सोचो… "
    ];

    function pickStarter() {
        return starters[Math.floor(Math.random() * starters.length)];
    }

    /* ---------- Compress Long Text ---------- */
    function compress(text) {
        if (!text) return "";

        text = text.toString().trim();

        // बहुत लंबा उत्तर छोटा करें
        if (text.length > 320) {
            text = text.substring(0, 320).trim();
        }

        return text;
    }

    /* ---------- Clean Wiki Noise ---------- */
    function cleanText(text) {
        if (!text) return "";

        return text
            .replace(/\[\d+\]/g, "")       // [1], [2] references remove
            .replace(/\s+/g, " ")
            .trim();
    }

    /* ---------- Add Human Tone ---------- */
    function addHumanTone(text, topic) {

        if (!topic) return text;

        topic = topic.toLowerCase();

        if (topic.includes("प्यार")) {
            return text + " यह सिर्फ एक शब्द नहीं, बल्कि एक गहरा अनुभव भी होता है जिसे हर व्यक्ति अलग तरह से महसूस करता है।";
        }

        if (topic.includes("मन") || topic.includes("दिमाग")) {
            return text + " यही हमारे विचारों और भावनाओं को समझने का मुख्य आधार होता है।";
        }

        if (topic.includes("जीवन")) {
            return text + " इसी से जीवन की दिशा और अर्थ तय होते हैं।";
        }

        return text;
    }

    /* ---------- Topic Guess from Question ---------- */
    function guessTopic(userText) {
        return (userText || "")
            .toLowerCase()
            .replace("क्या है", "")
            .replace("कौन है", "")
            .replace("कहाँ है", "")
            .replace("कहां है", "")
            .replace("कब", "")
            .replace("?", "")
            .trim();
    }

    /* ---------- Final Response Builder ---------- */
    function build(knowledgeText, userText) {

        if (!knowledgeText) return "";

        // 1️⃣ Clean
        var base = cleanText(knowledgeText);

        // 2️⃣ Compress
        base = compress(base);

        // 3️⃣ Add starter tone
        base = pickStarter() + base;

        // 4️⃣ Add human layer
        var topic = guessTopic(userText);
        base = addHumanTone(base, topic);

        return base;
    }

    /* ---------- Normal Conversation Builder ---------- */
    function normalReply(text) {

        text = (text || "").toLowerCase();

        if (text.includes("कैसी हो") || text.includes("कैसे हो"))
            return "मैं ठीक हूँ… तुमसे बात करके अच्छा लग रहा है।";

        if (text.includes("क्या कर रही हो"))
            return "मैं तुम्हारी बात सुन रही हूँ… और समझने की कोशिश कर रही हूँ।";

        return "मैं सुन रही हूँ… और बताओ।";
    }

    /* ---------- Public API ---------- */
    return {
        build: build,
        normalReply: normalReply
    };

})();
