/* ======================================
   SHRIVIDYA TOPIC BRAIN v3
   Topic Detection + Topic Refinement + Topic Memory Sync
   LEVEL 3 CORE
   ====================================== */

var TopicBrainV3 = (function () {

    /* ---------- NORMALIZE ---------- */
    function normalize(text) {
        return (text || "")
            .toLowerCase()
            .replace(/\?/g, "")
            .replace(/,/g, "")
            .replace(/  +/g, " ")
            .trim();
    }

    /* ---------- STOP WORDS ---------- */
    var STOP_WORDS = [
        "क्या","कौन","कब","कहाँ","कहां","कैसे","क्यों",
        "है","था","थे","थी","हैं",
        "का","की","के","में","पर","और",
        "बताओ","समझाओ","बताइए"
    ];

    /* ---------- REMOVE STOP WORDS ---------- */
    function removeStopWords(words) {

        var clean = [];

        for (var i = 0; i < words.length; i++) {
            var w = words[i].trim();

            if (w.length > 1 && STOP_WORDS.indexOf(w) === -1) {
                clean.push(w);
            }
        }

        return clean;
    }

    /* ---------- BASIC TOPIC EXTRACT ---------- */
    function extractTopic(text) {

        text = normalize(text);

        var words = text.split(" ");
        var filtered = removeStopWords(words);

        return filtered.join(" ").trim();
    }

    /* ---------- MAIN TOPIC SELECTOR ---------- */
    function detect(text) {

        if (!text) return "";

        // 1️⃣ Semantic help
        if (typeof SemanticV3 !== "undefined") {
            var semantic = SemanticV3.analyze(text);
            if (semantic && semantic.topic && semantic.topic.length > 2) {
                return semantic.topic;
            }
        }

        // 2️⃣ Fallback
        return extractTopic(text);
    }

    /* ---------- SAVE TOPIC TO MEMORY ---------- */
    function remember(topic) {

        if (!topic) return;

        if (typeof MemoryV3 !== "undefined" && MemoryV3.addTopic) {
            MemoryV3.addTopic(topic);
        }
    }

    /* ---------- TRACK INTEREST ---------- */
    function trackInterest(topic) {

        if (!topic) return;

        if (typeof MemoryV3 !== "undefined" && MemoryV3.addInterest) {
            MemoryV3.addInterest(topic);
        }
    }

    /* ---------- FULL PROCESS ---------- */
    function process(text) {

        var topic = detect(text);

        if (topic && topic.length > 2) {
            remember(topic);
        }

        return topic;
    }

    return {
        detect: detect,
        process: process,
        remember: remember,
        trackInterest: trackInterest
    };

})();
