import { Recipe } from "../recipe";

export const gmGnocci : Recipe = {
    name: "Gluténmentes Gnocci",
    _id: "4",
    difficulty: "easy",
    dishType: ["main-dish"],
    when: ["lunch", "dinner"],
    preparationTime: {
        total: 60
    },
    serving: 2,
    ingredients: [
        {
            section: "Gnocchi", 
            ingredients: [
                {quantity: 26, unit:'dkg', name: "főtt burgonya"},
                {quantity: 10, unit:'dkg', name: "it's us miklos' universal plus mix lisztkeverék"},
                {quantity: 2, unit:'db', name: "tojás"},
                {quantity: 1, unit:'csip', name: "só"},
                {quantity: 1, unit:'ek', name: "margarin"}
        ]},
        {
            section: "Paradicsomos szósz", 
            ingredients: [
                { quantity: 0.5, unit: "fej", name: "vöröshagyma" }, 	
                { quantity: 4, unit: "dl", name: "paradicsompüré"},
                { quantity: 2, unit: "gerezd", name: "fokhagyma"},
                { quantity: 1, unit: "ek", name: "olívaolaj"},
                { quantity: 0, unit: "ízlés szerint", name: "só"},
                { quantity: 1, unit: "tk", name: "cukor"},
                { quantity: 5, unit: "db", name: "friss bazsalikom"},
                { quantity: 1, unit: "tk", name: "oregano"}
        ]}
    ],
    directions: [
        "A burgonyát héjában puhára főzzük, majd forrón megpucoljuk és összetörjük. A kihűlt burgonyához adjuk a lisztkeveréket, a sót, a tojásokat és rugalmas tésztát gyúrunk.",
        "A tésztát 4 részre osztjuk és ujjnyi vastag csíkokat sodrunk. A rudakat kb. 1,5 cm-es darabokra vágjuk és megnyomkodjuk kicsit egy villa hátuljával.",
        "Bő, enyhén sós vízben 2-3 perc alatt készre főzzük. A megfőtt gnocchit leszűrjük.",
        "Egy serpenyőben a vajat felforrósítjuk és aranybarnára sütjük a gnocchikat.",
        "A szószhoz apró kockákra vágjuk a hagymát és megdinszteljük az olívaolajon.",
        "Adjuk hozzá a zúzott fokhagymát, a paradicsomlevet. Fűszerezzük és a kívánt sűrűség eléréséig rotyogtassuk.",
        "A lepirított gnocchit hozzáadjuk és alaposan összemelegítjük.",
        "Sajttal megszórva tálaljuk."
    ],
    images: ["/assets/gm-gnocci.jpg"],
    labels: [ "cheap", "gluten-free"]
};