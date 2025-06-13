const cities = [
  { name: "Kandy", postal_code: "20000" },
  { name: "Katugastota", postal_code: "20800" },
  { name: "Gampola", postal_code: "20500" },
  { name: "Peradeniya", postal_code: "20400" },
  { name: "Ampitiya", postal_code: "20160" },

  { name: "Colombo 1 (Fort)", postal_code: "00100" },
  { name: "Colombo 2 (Slave Island)", postal_code: "00200" },
  { name: "Colombo 3 (Kollupitiya)", postal_code: "00300" },
  { name: "Colombo 4 (Bambalapitiya)", postal_code: "00400" },
  { name: "Colombo 5 (Havelock Town/Kirulapone)", postal_code: "00500" },
  { name: "Colombo 6 (Wellawatte)", postal_code: "00600" },
  { name: "Colombo 7 (Cinnamon Gardens)", postal_code: "00700" },
  { name: "Colombo 8 (Borella)", postal_code: "00800" },
  { name: "Colombo 9 (Dematagoda)", postal_code: "00900" },
  { name: "Colombo 10 (Maradana)", postal_code: "01000" },
  { name: "Colombo 11 (Pettah)", postal_code: "01100" },
  { name: "Colombo 12 (Hulftsdorp)", postal_code: "01200" },
  { name: "Colombo 13 (Kotahena)", postal_code: "01300" },
  { name: "Colombo 14 (Grandpass)", postal_code: "01400" },
  { name: "Colombo 15 (Mutwal)", postal_code: "01500" },

  { name: "Talawatugoda", postal_code: "10116" },
  { name: "Hokandara", postal_code: "10118" },
  { name: "Battaramulla", postal_code: "10120" },
  { name: "Malabe", postal_code: "10115" },
  { name: "Athurugiriya", postal_code: "10150" },
  { name: "Rajagiriya", postal_code: "10100" },
  { name: "Pitakotte", postal_code: "10100" },
  { name: "Nugegoda", postal_code: "10250" },
  { name: "Pannipitiya", postal_code: "10230" },
  { name: "Maharagama", postal_code: "10280" },
  { name: "Homagama", postal_code: "10200" },
  { name: "Kolonnawa", postal_code: "10600" },
  { name: "Kaduwela", postal_code: "10640" },
  { name: "Kotewatta", postal_code: "10120" },
  { name: "Angoda", postal_code: "10620" },
  { name: "Mulleriyawa", postal_code: "10620" },

  { name: "Padukka", postal_code: "10500" },
  { name: "Hanwella", postal_code: "10650" },
  { name: "Avissawella", postal_code: "10700" },
  { name: "Kosgama", postal_code: "10730" },
  { name: "Akarawita", postal_code: "10732" },

  { name: "Ragama", postal_code: "11010" },
  { name: "Kolonnawa", postal_code: "10600" },
  { name: "Kelaniya", postal_code: "11600" },
  { name: "Kadawatha", postal_code: "11850" },
  { name: "Ja-Ela", postal_code: "11350" },

  { name: "Negombo", postal_code: "11500" },
  { name: "Katunayake", postal_code: "11450" },
  { name: "Seeduwa", postal_code: "11410" },

  { name: "Panadura", postal_code: "12500" },
  { name: "Horana", postal_code: "12400" },
  { name: "Kalutara", postal_code: "12000" },

  { name: "Galle", postal_code: "80000" },
  { name: "Ambalangoda", postal_code: "80300" },
  { name: "Hikkaduwa", postal_code: "80240" },
  { name: "Gonapinuwala", postal_code: "80230" },

  { name: "Matale (Wahacotte)", postal_code: "21160" },
  { name: "Dambulla", postal_code: "21100" },

  { name: "Trincomalee", postal_code: "31000" },
  { name: "Batticaloa", postal_code: "32000" },
  { name: "Kalmunai", postal_code: "32300" },

  { name: "Badulla", postal_code: "90000" },
  { name: "Anuradhapura", postal_code: "50000" },
  { name: "Ratnapura", postal_code: "70000" },
  { name: "Ampara", postal_code: "32000" },
];

export const validCityNames = cities.map((c) => c.name);
export const validPostalCodes = cities.map((c) => c.postal_code);
export const cityPostalCodeMap: Record<string, string> = cities.reduce(
  (acc, city) => {
    acc[city.name] = city.postal_code;
    return acc;
  },
  {} as Record<string, string>
);
