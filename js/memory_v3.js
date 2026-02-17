/* ======================================
   SHRIVIDYA MEMORY ENGINE v3
   Context + Conversation + Topic Memory
   LEVEL 3 FOUNDATION
   ====================================== */

var MemoryV3 = (function () {

    const STORAGE_KEY = "shrividya_memory_v3";

    var data = {
        name: "",
        mood: "",
        topics: [],
        history: [],
        lastTopic: "",
        createdAt: new Date().toISOString()
    };

    /* ---------- LOAD ---------- */
    function load() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                data = JSON.parse(saved);
            }
        } catch (e) {
            console.log("Memory load error:", e);
        }
    }

    /* ---------- SAVE ---------- */
    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.log("Memory save error:", e);
        }
    }

    /* ---------- NAME ---------- */
    function setName(name) {
        if (!name) return;
        data.name = name.trim();
        save();
    }

    function getName() {
        return data.name || "";
    }

    /* ---------- MOOD ---------- */
    function setMood(mood) {
        if (!mood) return;
        data.mood = mood;
        save();
    }

    function getMood() {
        return data.mood || "";
    }

    /* ---------- TOPIC MEMORY ---------- */
    function addTopic(topic) {
        if (!topic) return;

        data.lastTopic = topic;

        data.topics.push({
            text: topic,
            time: new Date().toISOString()
        });

        if (data.topics.length > 100) {
            data.topics.shift();
        }

        save();
    }

    function getLastTopic() {
        return data.lastTopic || "";
    }

    function getTopics() {
        return data.topics || [];
    }

    /* ---------- CHAT HISTORY ---------- */
    function addHistory(user, ai) {

        data.history.push({
            user: user,
            ai: ai,
            time: new Date().toISOString()
        });

        if (data.history.length > 50) {
            data.history.shift();
        }

        save();
    }

    function getHistory() {
        return data.history || [];
    }

    /* ---------- RESET ---------- */
    function reset() {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }

    /* ---------- INIT ---------- */
    load();

    /* ---------- PUBLIC API ---------- */
    return {
        setName: setName,
        getName: getName,

        setMood: setMood,
        getMood: getMood,

        addTopic: addTopic,
        getLastTopic: getLastTopic,
        getTopics: getTopics,

        addHistory: addHistory,
        getHistory: getHistory,

        reset: reset
    };

})();
