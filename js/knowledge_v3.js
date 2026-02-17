/* ======================================
   SHRIVIDYA KNOWLEDGE ENGINE v3
   Wikipedia Connector (LEVEL 3)
   Summary + Search + Fallback
   ====================================== */

var KnowledgeEngineV3 = (function () {

    const API_SUMMARY =
        "https://hi.wikipedia.org/api/rest_v1/page/summary/";

    const API_SEARCH =
        "https://hi.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";

    /* ---------- Normalize ---------- */
    function normalize(text) {
        return (text || "")
            .toLowerCase()
            .replace(/\?/g, "")
            .replace(/,/g, "")
            .replace(/  +/g, " ")
            .trim();
    }

    /* ---------- Clean Query ---------- */
    function cleanQuery(text) {
        return normalize(text)
            .replace("क्या है", "")
            .replace("कौन है", "")
            .replace("कहाँ है", "")
            .replace("कहां है", "")
            .replace("क्या होता है", "")
            .replace("कब", "")
            .replace("क्यों", "")
            .replace("कैसे", "")
            .replace("बताओ", "")
            .replace("समझाओ", "")
            .trim();
    }

    /* ---------- Guess Topic ---------- */
    function guessTopic(text) {
        var topic = cleanQuery(text);
        if (topic.length > 1) return topic;
        return normalize(text);
    }

    /* ---------- Fetch Summary ---------- */
    async function fetchSummary(topic) {
        try {
            var res = await fetch(API_SUMMARY + encodeURIComponent(topic));
            if (!res.ok) return null;

            var data = await res.json();
            if (data && data.extract) {
                return data.extract;
            }

            return null;

        } catch (e) {
            console.log("Summary fetch error:", e);
            return null;
        }
    }

    /* ---------- Search Best Title ---------- */
    async function searchBestTitle(text) {
        try {
            var url = API_SEARCH + encodeURIComponent(text);
            var res = await fetch(url);
            if (!res.ok) return null;

            var data = await res.json();

            if (
                data.query &&
                data.query.search &&
                data.query.search.length > 0
            ) {
                return data.query.search[0].title;
            }

            return null;

        } catch (e) {
            console.log("Search error:", e);
            return null;
        }
    }

    /* ---------- MAIN RESOLVE ---------- */
    async function resolve(text) {

        var topic = guessTopic(text);

        /* 1️⃣ Direct summary */
        var info = await fetchSummary(topic);
        if (info) return info;

        /* 2️⃣ Search fallback */
        var bestTitle = await searchBestTitle(topic);
        if (bestTitle) {
            info = await fetchSummary(bestTitle);
            if (info) return info;
        }

        /* 3️⃣ First word fallback */
        var firstWord = topic.split(" ")[0];
        if (firstWord.length > 2) {
            info = await fetchSummary(firstWord);
            if (info) return info;
        }

        return null;
    }

    return {
        resolve: resolve
    };

})();
