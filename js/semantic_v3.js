/* ======================================
   SHRIVIDYA SEMANTIC ENGINE v3
   Meaning Understanding Layer
   LEVEL 3 CORE
   ====================================== */

var SemanticV3 = (function () {

    /* ---------- CLEAN TEXT ---------- */
    function normalize(text) {
        return (text || "")
            .toLowerCase()
            .replace(/\?/g, "")
            .replace(/,/g, "")
            .replace(/  +/g, " ")
            .trim();
    }

    /* ---------- QUESTION TYPE DETECTION ---------- */
    function detectType(text) {

        text = normalize(text);

        if (text.includes("कब")) return "time";
        if (text.includes("कहाँ") || text.includes("कहां")) return "place";
        if (text.includes("कौन")) return "person";
        if (text.includes("कितने") || text.includes("कितनी") || text.includes("संख्या")) return "count";
        if (text.includes("क्या") || text.includes("अर्थ") || text.includes("परिभाषा")) return "definition";
        if (text.includes("कैसे")) return "process";
        if (text.includes("क्यों")) return "reason";

        return "general";
    }

    /* ---------- KEYWORD EXTRACTION ---------- */
    function extractKeywords(text) {

        text = normalize(text);

        var words = text.split(" ");
        var keywords = [];

        for (var i = 0; i < words.length; i++) {
            var w = words[i].trim();

            if (
                w.length > 2 &&
                w !== "क्या" &&
                w !== "कौन" &&
                w !== "कब" &&
                w !== "कहाँ" &&
                w !== "कहां" &&
                w !== "कैसे" &&
                w !== "क्यों" &&
                w !== "है" &&
                w !== "थे" &&
                w !== "था"
            ) {
                keywords.push(w);
            }
        }

        return keywords;
    }

    /* ---------- TOPIC GUESS ---------- */
    function guessTopic(text) {

        text = normalize(text);

        return text
            .replace("क्या है", "")
            .replace("क्या था", "")
            .replace("कौन है", "")
            .replace("कब हुआ", "")
            .replace("कब हुआ था", "")
            .replace("कहाँ है", "")
            .replace("कहां है", "")
            .replace("कितने हैं", "")
            .replace("कितनी है", "")
            .trim();
    }

    /* ---------- MAIN ANALYSIS ---------- */
    function analyze(text) {

        return {
            type: detectType(text),
            topic: guessTopic(text),
            keywords: extractKeywords(text),
            original: text
        };
    }

    return {
        analyze: analyze,
        detectType: detectType,
        extractKeywords: extractKeywords,
        guessTopic: guessTopic
    };

})();
