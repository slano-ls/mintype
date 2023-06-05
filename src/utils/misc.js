import data from "../themes/_list.json";

let themeList = [];
export async function getThemeList() {
    if (themeList.length == 0) {
        const list = data.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        themeList = list;
        return themeList;
    } else {
        return themeList;
    }
}

export function capitalizeFirstLetterOfEachWord(str) {
    return str
        .split(/ +/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}
