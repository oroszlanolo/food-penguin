import { Recipe } from "../../recipe";

export const hortobagyi : Recipe = {
    name: "Hortobágyi húsos palacsinta",
    _id: "3",
    difficulty: "medium",
    dishType: ["main-dish"],
    when: ["lunch", "dinner"],
    preparationTime: {
        preparation: 10,
        cooking: 30,
        total: 40
    },
    serving: 4,
    ingredients: [
        {
            ingredients: [
                { quantity: 400, unit: "g", name: "csiperkegomba" },
                { quantity: 2, unit: "", name: "közepes fej vöröshagyma" },
                { quantity: 3, unit: "ek", name: "napraforgó olaj" },
                { quantity: 1, unit: "teáskanál", name: "fűszerpaprika" },
                { quantity: 1, unit: "tk", name: "só" },
                { quantity: 0.5, unit: "kk", name: "fekete bors" },
                { quantity: 2, unit: "ek", name: "finomliszt" },
                { quantity: 2, unit: "dl", name: "tejföl" }
            ]
        }
    ],
    directions: [
        "A gombát alaposan mossuk át, és hagyjuk lecsöpögni.",
        "A hagymát tisztítsuk meg, vágjuk nagyobb kockára, és kevéske olajon pároljuk üvegesre.",
        "A lángról levéve szórjuk bele a pirospaprikát, keverjük bele a gombát.",
        "A tűzre visszatéve szórjuk meg a sóval, borssal. Engedjünk hozzá kb. 2 dl vizet, majd fedővel lefedve kb. 40 percig puhítsuk.",
        "A lisztet keverjük csomómentesre a tejföllel, és hígítsuk 1 dl vízzel.",
        "Ha elfőtt a leve és puha a gomba, akkor keverjük hozzá a tejfölt, és ha már jó sűrű, zárjuk el alatta a lángot.",
    ],
    images: ["/assets/hortobagyi-palacsinta.jpg"],
    labels: []
};