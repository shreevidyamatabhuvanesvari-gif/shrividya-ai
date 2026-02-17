/* ======================================
   SHRIVIDYA AI — FACT BRAIN v3
   Extracts Exact Answers from Knowledge Text
   LEVEL 3 CORE INTELLIGENCE LAYER
   ====================================== */

var FactBrainV3 = (function () {

    /* ---------- Detect Fact Type ---------- */
    function detectType(question) {

        question = (question || "").toLowerCase();

        if (question.includes("कौन"))
            return "person";

        if (question.includes("कब"))
            return "year";

        if (question.includes("कहाँ") || question.includes("कहां"))
            return "place";

        if (question.includes("कितने") || question.includes("संख्या"))
            return "number";

        if (question.includes("राजधानी"))
            return "place";

        if (question.includes("प्रथम"))
            return "person";

        return "general";
    }

    /* ---------- Extract Year ---------- */
    function extractYear(text) {
        var match = text.match(/\d{4}/);
        if (match) return match[0];
        return null;
    }

    /* ---------- Extract Person Name ---------- */
    function extractPerson(text) {

        var lines = text.split(".");

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            if (
                line.includes("थे") ||
                line.includes("हैं") ||
                line.includes("था") ||
                line.includes("हुए")
            ) {
                return line.trim();
            }
        }

        return null;
    }

    /* ---------- Extract Number ---------- */
    function extractNumber(text) {
        var match = text.match(/\d+/);
        if (match) return match[0];
        return null;
    }

    /* ---------- Extract Place ---------- */
    function extractPlace(text) {

        var lines = text.split(".");

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            if (
                line.includes("स्थित") ||
                line.includes("में है") ||
                line.includes("में स्थित")
            ) {
                return line.trim();
            }
        }

        return null;
    }

    /* ---------- MAIN FACT PICKER ---------- */
    function extract(text, question) {

        if (!text) return null;

        var type = detectType(question);

        if (type === "year") {
            var y = extractYear(text);
            if (y) return "यह घटना " + y + " में हुई थी।";
        }

        if (type === "person") {
            var p = extractPerson(text);
            if (p) return p;
        }

        if (type === "number") {
            var n = extractNumber(text);
            if (n) return "संख्या लगभग " + n + " है।";
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
