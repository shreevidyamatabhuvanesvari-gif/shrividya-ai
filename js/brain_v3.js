/* ======================================
   SHRIVIDYA AI — BRAIN v3 (FACT ENABLED)
   Semantic → Topic → Knowledge → Fact → Rank → Emotion → Language
   ====================================== */

var BrainV3 = (function () {

    function safe(name) {
        return typeof window[name] !== "undefined" ? window[name] : null;
    }

    async function respond(userText) {

        try {

            var text = (userText || "").toString().trim();
            if (!text) return "";

            var semantic = safe("SemanticEngineV3");
            var topicBrain = safe("TopicBrainV3");
            var knowledge = safe("KnowledgeEngineV3");
            var fact = safe("FactBrainV3");     // ⭐ NEW
            var ranker = safe("AnswerRankerV3");
            var memory = safe("MemoryEngineV3");
            var emotion = safe("EmotionEngineV3");
            var language = safe("LanguageEngineV3");

            /* 1️⃣ SEMANTIC */
            var meaning = semantic?.analyze ? semantic.analyze(text) : null;

            /* 2️⃣ TOPIC */
            var topic = topicBrain?.detect
                ? topicBrain.detect(text, meaning)
                : null;

            /* 3️⃣ CONTEXT */
            var context = memory?.getContext
                ? memory.getContext()
                : null;

            /* 4️⃣ EMOTION */
            var emo = emotion?.detect
                ? emotion.detect(text)
                : null;

            /* 5️⃣ KNOWLEDGE FETCH */
            var candidates = [];

            if (knowledge?.resolve) {
                var result = await knowledge.resolve(text, topic, context);

                if (result) {
                    candidates = Array.isArray(result)
                        ? result
                        : [result];
                }
            }

            /* 6️⃣ FACT EXTRACTION ⭐⭐⭐ */
            var bestAnswer = null;

            if (candidates.length > 0) {

                var rawText = candidates[0];

                if (fact?.extract) {
                    var factAnswer = fact.extract(rawText, text);
                    if (factAnswer) {
                        bestAnswer = factAnswer;
                    }
                }

                if (!bestAnswer) {
                    if (ranker?.pickBest) {
                        bestAnswer = ranker.pickBest(
                            candidates,
                            text,
                            topic,
                            context
                        );
                    } else {
                        bestAnswer = rawText;
                    }
                }
            }

            /* 7️⃣ MEMORY SAVE */
            if (memory?.addConversation) {
                memory.addConversation({
                    user: text,
                    topic: topic,
                    time: Date.now()
                });
            }

            /* 8️⃣ LANGUAGE BUILD */
            if (language?.build) {
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
