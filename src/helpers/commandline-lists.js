import { capitalizeFirstLetterOfEachWord, getThemeList } from "../utils/misc";
import { setLayoutConfig, setModeConfig, setTimeConfig, setWordsLimitConfig } from "./config";
import { resetTest } from "./resetTest";
import { store } from "../store/store";
import { setTheme } from "../store/actions";

const { dispatch } = store;

const commandsTimeConfig = {
    title: "Change time config...",
    list: [
        {
            id: "changeTimeConfig15",
            display: "15",
            configValue: 15,
            exec: () => {
                console.log("changed time 15");
                setTimeConfig(15);
                setModeConfig("time");
                resetTest();
            },
        },
        {
            id: "changeTimeConfig30",
            display: "30",
            configValue: 30,
            exec: () => {
                console.log("changed time 30");
                setTimeConfig(30);
                setModeConfig("time");
                resetTest();
            },
        },
        {
            id: "changeTimeConfig45",
            display: "45",
            configValue: 45,
            exec: () => {
                console.log("changed time 45");
                setTimeConfig(45);
                setModeConfig("time");
                resetTest();
            },
        },
        {
            id: "changeTimeConfig60",
            display: "60",
            configValue: 60,
            exec: () => {
                console.log("changed time 60");
                setTimeConfig(60);
                setModeConfig("time");
                resetTest();
            },
        },
        {
            id: "changeTimeConfig120",
            display: "120",
            configValue: 120,
            exec: () => {
                console.log("changed time 120");
                setTimeConfig(120);
                setModeConfig("time");
                resetTest();
            },
        },
        // {
        //     id: "changeTimeConfigCustom",
        //     display: "custom",
        //     input: true,
        //     exec: (input) => {
        //         if (!input) return;
        //         console.log("changed time custom");
        //         setTimeConfig(parseInt(input));
        //         setModeConfig("time");
        //         resetTest();
        //     },
        // },
    ],
};

const commandsTypeConfig = {
    title: "Change type config...",
    list: [
        {
            id: "changeTypeConfigTime",
            display: "time",
            configValue: "time",
            exec: () => {
                console.log("change type time");
                setModeConfig("time");
                resetTest();
            },
        },
        {
            id: "changeTypeConfigWords",
            display: "words",
            configValue: "words",
            exec: () => {
                console.log("change type words");
                setModeConfig("words");
                resetTest();
            },
        },
        // {
        //     id: "changeTypeConfigCustom",
        //     display: "custom",
        //     configValue: "custom",
        //     exec: () => {
        //         console.log("change type custom");
        //         setModeConfig("custom"); 
        //         resetTest();
        //     },
        // },
    ],
};

const commandsWordsConfig = {
    title: "Change words config...",
    list: [
        {
            id: "changeWordsConfig10",
            display: "10",
            configValue: 10,
            exec: () => {
                console.log("changed words 10");
                setWordsLimitConfig(10);
                setModeConfig("words");
                resetTest();
            },
        },
        {
            id: "changeWordsConfig25",
            display: "25",
            configValue: 25,
            exec: () => {
                console.log("changed words 25");
                setWordsLimitConfig(25);
                setModeConfig("words");
                resetTest();
            },
        },
        {
            id: "changeWordsConfig50",
            display: "50",
            configValue: 50,
            exec: () => {
                console.log("changed words 50");
                setWordsLimitConfig(50);
                setModeConfig("words");
                resetTest();
            },
        },
        {
            id: "changeWordsConfig100",
            display: "100",
            configValue: 100,
            exec: () => {
                console.log("changed words 100");
                setWordsLimitConfig(100);
                setModeConfig("words");
                resetTest();
            },
        },
    ],
};

const commandsThemeConfig = {
    title: "Theme...",
    configKey: "theme",
    list: [],
};

const commandsLayoutConfig = {
    title: "Layout...",
    list: [
        {
            id: "changeLayoutSingle",
            display: "Single",
            configValue: "single",
            exec: () => {
                console.log("changed layout single");
                setLayoutConfig("single");
                resetTest();
            }
        },
        {
            id: "changeLayoutMulti",
            display: "Multi",
            configValue: "multi",
            exec: () => {
                console.log("changed layout multi");
                setLayoutConfig("multi");
                resetTest();
            }
        },
    ]
}

getThemeList().then((themes) => {
    themes.forEach((theme) => {
        commandsThemeConfig.list.push({
            id: "changeTheme" + capitalizeFirstLetterOfEachWord(theme.name),
            display: theme.name.replace(/_/g, " "),
            configValue: theme.name,
            exec: () => {
                dispatch(setTheme(theme.name))
            }
        })
    })
})

export const defalutCommands = {
    title: "",
    list: [
        {
            id: "changeTimeConfig",
            display: "Time...",
            subgroup: commandsTimeConfig,
        },
        {
            id: "changeTypeConfig",
            display: "Type...",
            subgroup: commandsTypeConfig,
        },
        {
            id: "changeWordsConfig",
            display: "Words Config...",
            subgroup: commandsWordsConfig,
        },
        {
            id: "changeThemeConfig",
            display: "Theme...",
            subgroup: commandsThemeConfig,
        },
        {
            id: "changeLayoutConfig",
            display: "Layout...",
            subgroup: commandsLayoutConfig,
        },
    ],
};

export let currentCommands = defalutCommands;
export function setCurrentCommands(commands) {
    currentCommands = commands;
}
