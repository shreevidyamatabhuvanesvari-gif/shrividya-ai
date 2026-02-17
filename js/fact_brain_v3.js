/* ======================================
   SHRIVIDYA AI — FACT BRAIN v3 (UPDATED)
   Strong Fact Extraction Engine
   Person / Year / Place / Number
   ====================================== */

var FactBrainV3 = (function () {

    function detectType(question) {

        question = (question || "").toLowerCase();

        if (question.includes("कौन"))
            return "person";

        if (question.includes("प्रथम"))
            return "person";

        if (question.includes("कब"))
            return "year";

        if (question.includes("कहाँ") || question.includes("कहां"))
            return "place";

        if (question.includes("राजधानी"))
            return "place";

        if (question.includes("कितने") || question.includes("संख्या"))
            return "number";

        return "general";
    }

    /* ---------- YEAR ---------- */
    function extractYear(text) {
        var match = text.match(/\d{4}/);
        return match ? match[0] : null;
    }

    /* ---------- PERSON ---------- */
    function extractPerson(text) {

        var patterns = [
            "थे",
            "हैं",
            "था",
            "हुए",
            "पहले",
            "प्रथम"
        ];

        var sentences = text.split("।");

        for (var i = 0; i < sentences.length; i++) {
            var line = sentences[i].trim();

            for (var j = 0; j < patterns.length; j++) {
                if (line.includes(patterns[j]) && line.length < 120) {
                    return line;
                }
            }
        }

        return null;
    }

    /* ---------- NUMBER ---------- */
    function extractNumber(text) {
        var match = text.match(/\d+/);
        return match ? match[0] : null;
    }

    /* ---------- PLACE ---------- */
    function extractPlace(text) {

        var sentences = text.split("।");

        for (var i = 0; i < sentences.length; i++) {
            var line = sentences[i];

            if (
                line.includes("राजधानी") ||
                line.includes("स्थित") ||
                line.includes("में है") ||
                line.includes("है")
            ) {
                return line.trim();
            }
        }

        return null;
    }

    /* ---------- MAIN ---------- */
    function extract(text, question) {

        if (!text) return null;

        var type = detectType(question);

        if (type === "year") {
            var y = extractYear(text);
            if (y) return y + " में";
        }

        if (type === "person") {
            var p = extractPerson(text);
            if (p) return p;
        }

        if (type === "number") {
            var n = extractNumber(text);
            if (n) return n;
        }

        if (type === "place") {
            var pl = extractPlace(text);
            if (pl) return pl;
        }

        return null;
    }

    return {
        extract: extract
    };

})();
