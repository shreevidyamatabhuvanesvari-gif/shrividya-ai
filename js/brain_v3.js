/* ======================================
   SHRIVIDYA AI — BRAIN v3
   LEVEL 3 MINI-LLM STYLE CORE
   Semantic → Topic → Knowledge → Rank → Emotion → Language → Memory
   ====================================== */

var BrainV3 = (function () {

    /* ---------- SAFE ACCESS ---------- */
    function safe(name) {
        return typeof window[name] !== "undefined" ? window[name] : null;
    }

    /* ---------- MAIN RESPONSE PIPELINE ---------- */
    async function respond(userText) {

        try {

            var text = (userText || "").toString().trim();
            if (!text) return "";

            var semantic = safe("SemanticEngineV3");
            var topicBrain = safe("TopicBrainV3");
            var knowledge = safe("KnowledgeEngineV3");   // ⭐ IMPORTANT NAME
            var ranker = safe("AnswerRankerV3");
            var memory = safe("MemoryEngineV3");
            var emotion = safe("EmotionEngineV3");
            var language = safe("LanguageEngineV3");

            /* 1️⃣ SEMANTIC UNDERSTANDING */
            var meaning = null;
            if (semantic && semantic.analyze) {
                meaning = semantic.analyze(text);
            }

            /* 2️⃣ TOPIC DETECTION */
            var topic = null;
            if (topicBrain && topicBrain.detect) {
                topic = topicBrain.detect(text, meaning);
            }

            /* 3️⃣ MEMORY CONTEXT */
            var context = null;
            if (memory && memory.getContext) {
                context = memory.getContext();
            }

            /* 4️⃣ EMOTION DETECTION */
            var emo = null;
            if (emotion && emotion.detect) {
                emo = emotion.detect(text);
                if (memory && memory.saveMood && emo) {
                    memory.saveMood(emo.type);
                }
            }

            /* 5️⃣ KNOWLEDGE FETCH */
            var candidates = [];

            if (knowledge && knowledge.resolve) {

                try {
                    var result = await knowledge.resolve(text, topic, context);

                    if (result) {
                        if (Array.isArray(result)) {
                            candidates = result;
                        } else {
                            candidates = [result];
                        }
                    }

                } catch (e) {
                    console.log("Knowledge fetch error:", e);
                }
            }

            /* 6️⃣ ANSWER RANKING */
            var bestAnswer = null;

            if (candidates.length > 0) {
                if (ranker && ranker.pickBest) {
                    bestAnswer = ranker.pickBest(candidates, text, topic, context);
                } else {
                    bestAnswer = candidates[0];
                }
            }

            /* 7️⃣ MEMORY SAVE */
            if (memory && memory.addConversation) {
                memory.addConversation({
                    user: text,
                    topic: topic,
                    time: Date.now()
                });
            }

            /* 8️⃣ LANGUAGE BUILD */
            if (language && language.build) {
                return language.build({
                    text: text,
                    topic: topic,
                    answer: bestAnswer,
                    emotion: emo,
                    context: context,
                    meaning: meaning
                });
            }

            /* 9️⃣ FALLBACK */
            if (bestAnswer) return bestAnswer;

            return "मैं समझने की कोशिश कर रही हूँ… थोड़ा और बताओ।";

        } catch (err) {
            console.log("BrainV3 crash:", err);
            return "मुझे थोड़ा समय दो… मैं ठीक से समझ नहीं पाई।";
        }
    }

    return {
        respond: respond
    };

})();
