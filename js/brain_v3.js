/* ======================================
   TOPIC BRAIN v3 — STRONG DETECTION CORE
   Detects knowledge intent + extracts topic
   ====================================== */

var TopicBrainV3 = (function () {

    /* ---------- Normalize ---------- */
    function normalize(text) {
        return (text || "")
            .toLowerCase()
            .replace(/\?/g, "")
            .replace(/  +/g, " ")
            .trim();
    }

    /* ---------- Question Sense Detection ---------- */
    function isKnowledge(text) {

        text = normalize(text);

        // Very short topic → treat as knowledge
        if (text.split(" ").length <= 2 && text.length > 2) {
            return true;
        }

        // Semantic triggers
        var triggers = [
            "क्या",
            "कौन",
            "कब",
            "कहाँ",
            "कहां",
            "क्यों",
            "कैसे",
            "कितना",
            "कितने",
            "कितनी",
            "अर्थ",
            "परिभाषा",
            "राजधानी",
            "संख्या",
            "स्थापना",
            "इतिहास",
            "किसने",
            "किसका"
        ];

        for (var i = 0; i < triggers.length; i++) {
            if (text.includes(triggers[i])) return true;
        }

        return false;
    }

    /* ---------- Topic Extract ---------- */
    function extract(text) {

        text = normalize(text);

        var removeWords = [
            "क्या है",
            "क्या होता है",
            "कौन है",
            "कौन था",
            "कहाँ है",
            "कहां है",
            "कब हुआ",
            "कब हुई",
            "कब आया",
            "कब आया था",
            "कितने हैं",
            "कितनी है",
            "का अर्थ",
            "की राजधानी",
            "किसने",
            "बताओ",
            "समझाओ"
        ];

        for (var i = 0; i < removeWords.length; i++) {
            text = text.replace(removeWords[i], "");
        }

        return text.trim();
    }

    /* ---------- Public API ---------- */
    return {
        isKnowledge: isKnowledge,
        extract: extract
    };

})();
