/* ======================================
   SHRIVIDYA ANSWER RANKER v3
   Best Answer Selector (LEVEL 3)
   Relevance + Length + Keyword Match
   ====================================== */

var AnswerRankerV3 = (function () {

    /* ---------- NORMALIZE ---------- */
    function normalize(text) {
        return (text || "")
            .toLowerCase()
            .replace(/\?/g, "")
            .replace(/,/g, "")
            .replace(/  +/g, " ")
            .trim();
    }

    /* ---------- KEYWORD SCORE ---------- */
    function keywordScore(answer, topicWords) {

        var score = 0;
        var text = normalize(answer);

        for (var i = 0; i < topicWords.length; i++) {
            if (text.indexOf(topicWords[i]) > -1) {
                score += 2;
            }
        }

        return score;
    }

    /* ---------- LENGTH SCORE ---------- */
    function lengthScore(answer) {

        var len = (answer || "").length;

        // बहुत छोटा → कम score
        if (len < 40) return 1;

        // संतुलित
        if (len >= 40 && len <= 300) return 5;

        // बहुत लंबा
        if (len > 300 && len < 800) return 3;

        return 1;
    }

    /* ---------- TOPIC WORDS ---------- */
    function getTopicWords(topic) {
        return normalize(topic).split(" ");
    }

    /* ---------- TOTAL SCORE ---------- */
    function score(answer, topic) {

        if (!answer) return 0;

        var words = getTopicWords(topic);

        var s1 = keywordScore(answer, words);
        var s2 = lengthScore(answer);

        return s1 + s2;
    }

    /* ---------- PICK BEST FROM ARRAY ---------- */
    function pickBest(candidates, topic) {

        if (!candidates) return null;

        // single string
        if (typeof candidates === "string") return candidates;

        if (!Array.isArray(candidates)) return null;

        var best = "";
        var bestScore = 0;

        for (var i = 0; i < candidates.length; i++) {

            var ans = candidates[i];
            var sc = score(ans, topic);

            if (sc > bestScore) {
                bestScore = sc;
                best = ans;
            }
        }

        return best;
    }

    return {
        pickBest: pickBest,
        score: score
    };

})();
