import { setWordList } from "../store/actions";
import { store } from "../store/store";

const { dispatch } = store;

export const initWords = (type, wordsConfig) => {
    if (type === "time") {
        import(`../wordlist/words.json`).then(({ default: words }) => {
            const areNotWords = words.every((word) => {
                typeof word === "string" && word.includes(" ");
            });
            var shuffleWordList = words?.sort(() => Math.random() - 0.5);
            if (areNotWords)
                shuffleWordList = words.flatMap(
                    (token) => typeof token === "string" && token.split(" ")
                );

            dispatch(setWordList(shuffleWordList));
        });

        console.log("set words mode time");
    } else if (type === "words") {
        import(`../wordlist/words.json`).then(({ default: words }) => {
            const areNotWords = words.every((word) => {
                typeof word === "string" && word.includes(" ");
            });
            var shuffleWordList = words?.sort(() => Math.random() - 0.5);
            if (areNotWords)
                shuffleWordList = words.flatMap(
                    (token) => typeof token === "string" && token.split(" ")
                );
            const limitWords = shuffleWordList.slice(0, wordsConfig)
            console.log(wordsConfig);
            dispatch(setWordList(limitWords));
        });

        console.log("set words mode words");
    } else if (type === "custom") {
        console.log("set words mode custom");
    }
};
