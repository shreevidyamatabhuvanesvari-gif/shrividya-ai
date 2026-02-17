/* ======================================
   SHRIVIDYA EMOTION ENGINE v3
   Emotion Detection + Emotional State Layer
   LEVEL 3
   ====================================== */

var EmotionV3 = (function () {

    /* ---------- Emotion Keywords ---------- */
    const emotionMap = {
        happy: [
            "खुश", "प्रसन्न", "अच्छा लग", "मज़ा", "आनंद"
        ],
        sad: [
            "उदास", "दुखी", "अकेला", "टूट", "रो", "दर्द"
        ],
        angry: [
            "गुस्सा", "क्रोध", "चिढ़", "नाराज़"
        ],
        fear: [
            "डर", "घबर", "भय"
        ],
        love: [
            "प्यार", "मोह", "प्रेम", "love"
        ],
        stress: [
            "परेशान", "तनाव", "थका", "थकान", "दबाव"
        ]
    };

    /* ---------- Detect Emotion ---------- */
    function detect(text) {

        text = (text || "").toLowerCase();

        for (var emo in emotionMap) {
            var words = emotionMap[emo];

            for (var i = 0; i < words.length; i++) {
                if (text.includes(words[i])) {
                    
                    if (typeof MemoryV3 !== "undefined") {
                        MemoryV3.setEmotion(emo);
                    }

                    return emo;
                }
            }
        }

        return null;
    }

    /* ---------- Emotional Reply Tone ---------- */
    function getTone(emotion) {

        if (!emotion) return "";

        switch (emotion) {

            case "happy":
                return "तुम खुश लग रहे हो… यह सुनकर अच्छा लगा।";

            case "sad":
                return "तुम उदास लग रहे हो… मैं तुम्हारी बात समझने की कोशिश कर रही हूँ।";

            case "angry":
                return "लगता है तुम थोड़ा गुस्से में हो… शांत होकर बताओ क्या हुआ।";

            case "fear":
                return "डर महसूस करना स्वाभाविक है… धीरे-धीरे सब संभल जाता है।";

            case "love":
                return "तुम्हारी बातों में एक अपनापन महसूस हो रहा है…";

            case "stress":
                return "तुम थोड़े तनाव में लग रहे हो… थोड़ा आराम भी ज़रूरी है।";
        }

        return "";
    }

    /* ---------- Public API ---------- */
    return {
        detect: detect,
        getTone: getTone
    };

})();
