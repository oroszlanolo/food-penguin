import { Recipe } from "../../recipe";

export const turosteszta : Recipe = {
    name: "Túrós tészta",
    _id: "2",
    difficulty: "easy",
    dishType: ["main-dish"],
    when: ["lunch", "dinner"],
    preparationTime: {
        total: 40,
        summary: "quick",
    },
    serving: 3,
    ingredients: [
        { ingredients: [
            {quantity: 30, unit: "dkg", name: "tészta" },
            {quantity: 50, unit: "dkg", name: "tehéntúró"},
            {quantity: 20, unit: "dkg", name: "füstölt szalonna"},
            {quantity: 450, unit: "g", name: "tejföl"},
            {quantity: 0, unit: "ízlés szerint", name: "só"},
        ]}
    ],
    directions: [
        "Bő, sós, forró vízben kifőzzük a tésztát.",
        "A füstölt szalonna kockákat jól kisütjük.",
        "Egy tepsiben összekeverjük a tésztát a túróval és a tejföllel, meglocsoljuk a szalonnából kisült zsiradékkal, a tetejére szórjuk a sült szalonnát. Előmelegített sütőben 20 perc alatt összesütjük. Jó étvágyat hozzá!",
    ],
    images: ["/assets/turos-teszta.png"],
    labels: ["cheap"]
};