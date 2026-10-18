const toolProducts = [
  { name: "Plough", type: "hand", price: [18, 95] },
  { name: "Hoe", type: "hand", price: [3, 11] },
  { name: "Sickle", type: "hand", price: [2, 6] },
  { name: "Spade", type: "hand", price: [3, 11] },
  { name: "Shovel", type: "hand", price: [4, 15] },
  { name: "Rake", type: "hand", price: [3, 11] },
  { name: "Watering can", type: "hand", price: [3, 15] },
  { name: "Wheelbarrow", type: "hand", price: [30, 95] },
  { name: "Tractor", type: "hand", price: [5300, 11800] },
  { name: "Seed drill", type: "hand", price: [530, 2950] },
  { name: "Harrow", type: "hand", price: [295, 1410] },
  { name: "Cultivator", type: "hand", price: [355, 1765] },
  { name: "Sprayer", type: "hand", price: [18, 140] },
  { name: "Axe", type: "hand", price: [5, 18] },
  { name: "Pitchfork", type: "hand", price: [4, 15] },
  { name: "Hand trowel", type: "hand", price: [1, 6] },
  { name: "Standard bucket", type: "machine", price: [295, 1765] },
  { name: "Large cylindrical pick-up baler", type: "machine", price: [4700, 14100] },
  { name: "Backhoe", type: "machine", price: [3500, 9400] },
  { name: "Potato harvester 4U", type: "machine", price: [3500, 9400] },
  { name: "Dozer", type: "machine", price: [590, 2350] },
  { name: "Rotary tiller", type: "machine", price: [530, 2350] },
  { name: "Pallet forks", type: "machine", price: [235, 940] },
  { name: "Peanut harvester", type: "machine", price: [1765, 7050] },
  { name: "Corn planter", type: "machine", price: [295, 2350] },
  { name: "Tractor plough", type: "machine", price: [295, 1410] },
  { name: "Snow blower for front-end loader", type: "machine", price: [1765, 7050] },
  { name: "Disc harrows", type: "machine", price: [410, 2940] },
  { name: "3T trailer", type: "machine", price: [1410, 4120] },
  { name: "Five-share plough", type: "machine", price: [470, 2120] },
  { name: "Disc plow", type: "machine", price: [350, 1765] },
];
const toolGrid = document.querySelector("#farm-tools");
const seedProducts = [
  { name: "Tomato seeds", type: "tomato", price: [3, 6], detail: "Juicy garden favorite · 1 packet" },
  { name: "Sweet pepper seeds", type: "pepper", price: [3, 6], detail: "Colorful, crisp harvest · 1 packet" },
  { name: "Lettuce seeds", type: "lettuce", price: [2, 5], detail: "Tender leafy greens · 1 packet" },
  { name: "Carrot seeds", type: "carrot", price: [2, 5], detail: "Sweet roots for the kitchen · 1 packet" },
  { name: "Cucumber seeds", type: "cucumber", price: [2, 5], detail: "Fresh, refreshing harvest · 1 packet" },
  { name: "Spinach seeds", type: "spinach", price: [2, 5], detail: "Fast-growing leafy greens · 1 packet" },
  { name: "Radish seeds", type: "radish", price: [2, 4], detail: "Quick-growing garden roots · 1 packet" },
  { name: "Sweet corn seeds", type: "corn", price: [3, 7], detail: "A sunny-season favorite · 1 packet" },
];
const seedIllustrations = {
  tomato: '<path d="M160 93c-25-26-63-6-61 27 2 32 37 51 61 63 24-12 59-31 61-63 2-33-36-53-61-27Z" fill="#bd7057"/><path d="M159 94c-5-24-29-27-40-19 17 2 25 13 26 23-18-13-34-5-38 3 19-4 31 2 44 13 10-10 26-17 43-16-10-12-26-13-35-5 7-15 19-18 31-17-16-13-40-6-42 18Z" fill="#58754f"/>',
  pepper: '<path d="M149 103c-21-31-57-19-58 13-1 26 20 60 50 62 13 0 19-9 21-21 3 12 9 21 22 21 30-2 51-36 49-62-2-32-38-44-59-13-5-17-19-17-25 0Z" fill="#81976a"/><path d="M161 97c-2-18 4-30 18-35" fill="none" stroke="#58754f" stroke-width="8" stroke-linecap="round"/>',
  lettuce: '<path d="M160 182c-42-4-73-31-68-68 4-30 34-38 51-18-2-32 34-44 52-18 20-28 55-10 48 19 32-4 45 26 25 51-20 24-62 35-108 34Z" fill="#81976a"/><path d="M160 174c-4-30-21-49-43-62m44 61c1-39 15-59 34-76m-33 77c24-26 46-35 68-38" fill="none" stroke="#dce6c8" stroke-width="6" stroke-linecap="round"/>',
  carrot: '<path d="M118 112c13-5 51 8 74 24 8 6 8 17 2 29l-23 46c-5 10-17 11-23 2-17-24-31-62-32-88-1-7-3-11 2-13Z" fill="#d68b54"/><path d="M156 112c-5-22-20-30-37-29m36 29c10-24 25-29 40-27m-41 29c3-26 0-38-10-49" fill="none" stroke="#58754f" stroke-width="8" stroke-linecap="round"/><path d="m133 136 21 10m-14 11 22 10" stroke="#edbd86" stroke-width="4" stroke-linecap="round"/>',
  cucumber: '<path d="M121 178c-17-16-22-49-9-73 12-23 41-29 68-16 27 12 43 39 35 63-8 25-35 39-61 34-15-3-25-2-33-8Z" fill="#71895e"/><path d="M127 114c5-6 10-5 13 2m20-12c5-6 10-4 13 3m17 9c5-5 10-4 13 3m-62 34c5-6 10-5 13 2m21-8c5-6 10-5 13 2" fill="none" stroke="#cad8ae" stroke-width="4" stroke-linecap="round"/>',
  spinach: '<path d="M160 197c-45-19-71-61-55-94 14-29 48-22 56 4 9-41 51-45 64-15 15 36-18 82-65 105Z" fill="#58754f"/><path d="M159 190c2-37 15-64 38-88m-38 90c-10-30-25-49-43-61" fill="none" stroke="#dce6c8" stroke-width="6" stroke-linecap="round"/>',
  radish: '<path d="M129 101c22-17 50-15 69 3 22 21 18 57-9 81-11 10-24 20-31 31-8-11-21-20-32-30-28-26-26-64 3-85Z" fill="#bd7057"/><path d="M160 104c-3-24-20-32-37-28m37 28c7-25 23-32 40-30m-40 29c2-26-6-39-21-47" fill="none" stroke="#58754f" stroke-width="8" stroke-linecap="round"/><path d="M160 216v17" stroke="#f0e7d8" stroke-width="5" stroke-linecap="round"/>',
  corn: '<path d="M160 91c-27 20-34 67-13 104l13 18 13-18c21-37 14-84-13-104Z" fill="#d5b65f"/><path d="M157 202c-32-1-50-26-47-70 20 6 37 28 48 62m7 8c32-1 50-26 47-70-20 6-37 28-48 62" fill="#71895e"/><path d="M149 117v69m11-76v83m11-76v69" stroke="#f1df9a" stroke-width="4"/>',
};
const claySeedDefs = `<defs>
  <linearGradient id="seed-packet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffef8"/><stop offset="1" stop-color="#e4e7d8"/></linearGradient>
  <linearGradient id="seed-red"><stop stop-color="#db6553"/><stop offset="1" stop-color="#db6553"/></linearGradient>
  <linearGradient id="seed-green"><stop stop-color="#55794e"/><stop offset="1" stop-color="#55794e"/></linearGradient>
  <linearGradient id="seed-orange"><stop stop-color="#e08b48"/><stop offset="1" stop-color="#e08b48"/></linearGradient>
  <linearGradient id="seed-gold"><stop stop-color="#d7ad43"/><stop offset="1" stop-color="#d7ad43"/></linearGradient>
  <filter id="seed-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#304b37" flood-opacity=".2"/></filter>
</defs>`;
const claySeedIllustrations = Object.fromEntries(
  Object.entries(seedIllustrations).map(([type, illustration]) => [
    type,
    illustration
      .replaceAll("#bd7057", "url(#seed-red)")
      .replaceAll("#81976a", "url(#seed-green)")
      .replaceAll("#58754f", "url(#seed-green)")
      .replaceAll("#71895e", "url(#seed-green)")
      .replaceAll("#d68b54", "url(#seed-orange)")
      .replaceAll("#d5b65f", "url(#seed-gold)"),
  ]),
);
const seedGrid = document.querySelector("#seed-products");
seedProducts.forEach(({ name, type, price, detail }) => {
  const estimatedUnitPrice = Math.round((price[0] + price[1]) / 2);
  const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const productCard = document.createElement("article");
  productCard.className = "product-card seed-product";
  productCard.dataset.category = "seeds";
  productCard.dataset.name = name.toLowerCase();
  productCard.innerHTML = `
    <div class="product-image-wrap seed-art-wrap" role="img" aria-label="Illustrated AgriLink packet of ${name}">
      <span class="product-tag">Seed packet</span>
      <svg class="seed-packet-art" viewBox="0 0 320 280" aria-hidden="true">
        ${claySeedDefs}
        <ellipse cx="160" cy="238" rx="69" ry="12" fill="#284434" opacity=".12"/>
        <g filter="url(#seed-shadow)">
        <path d="M107 48h106l13 17v151H94V65l13-17Z" fill="url(#seed-packet)" stroke="#d8decd" stroke-width="2"/>
        <path d="M94 65h132v22H94z" fill="#496b50"/>
        <path d="M109 54h102" stroke="#dbe9a5" stroke-width="2"/>
        <text x="160" y="80" fill="#fffdf4" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing="2" text-anchor="middle">AGRILINK</text>
        <circle cx="160" cy="145" r="62" fill="#e7eadf"/>
        ${claySeedIllustrations[type]}
        <path d="M120 220h80" stroke="#dce3d2" stroke-width="2"/>
        <circle cx="138" cy="234" r="3" fill="#81976a"/><circle cx="160" cy="234" r="3" fill="#d1b461"/><circle cx="182" cy="234" r="3" fill="#bd7057"/>
        </g>
        <path d="M73 146c13-22 31-28 47-25m127 43c17-17 34-19 50-14" fill="none" stroke="#95a784" stroke-width="2" stroke-linecap="round"/>
        <path d="M85 140c-3-14 3-23 18-26-1 13-7 22-18 26Zm190 10c3-14 12-20 27-17-5 13-14 19-27 17Z" fill="#81976a"/>
      </svg>
    </div>
    <div class="product-info">
      <div><span class="product-farm">AGRILINK SEED CO.</span><h3>${name}</h3></div>
      <button class="add-button" type="button" aria-label="Add ${name} to cart at estimated price" data-product="${name} (estimated)" data-price="${estimatedUnitPrice}">+</button>
    </div>
    <p class="product-detail">${detail}</p>
    <button class="tool-price-button" type="button" aria-expanded="false">See estimated price <span aria-hidden="true">↓</span></button>
    <div class="tool-price-answer" hidden>
      <span class="tool-price-range">${formattedPrice.format(price[0])}–${formattedPrice.format(price[1])}</span>
      <span class="tool-cart-note">Add to cart uses the range midpoint: ${formattedPrice.format(estimatedUnitPrice)} per packet.</span>
      <span class="tool-price-disclaimer">Indicative estimate for one small seed packet. Variety and pack size affect the final price.</span>
    </div>`;
  seedGrid.append(productCard);
});

const machineAttachments = {
  "Standard bucket": '<path d="m221 119 31 18-18 35h-44l10-23 22-5Z" fill="url(#tool-metal)"/><path d="m225 125 18 12" stroke="#f7e1b5" stroke-width="5" stroke-linecap="round"/>',
  "Large cylindrical pick-up baler": '<rect x="223" y="124" width="49" height="49" rx="19" fill="url(#tool-orange)"/><path d="M231 129v38m13-41v43m13-40v37m10-30v23" stroke="#f6d99f" stroke-width="4" stroke-linecap="round"/>',
  "Backhoe": '<path d="m219 127 25-17 17 15-13 24 25 20-14 14-32-24 10-26-15 4Z" fill="url(#tool-yellow)"/><path d="m258 182 23 4-8 15-21-4Z" fill="url(#tool-metal)"/>',
  "Potato harvester 4U": '<path d="m216 150 51 3 13 24h-58Z" fill="url(#tool-orange)"/><path d="m228 149 12-25h27l8 28" fill="url(#tool-green)"/><path d="M225 166h44m-34 10 6 11m15-11 6 11" stroke="#f6d99f" stroke-width="5" stroke-linecap="round"/>',
  Dozer: '<path d="m220 139 44-15 14 10-14 34h-48Z" fill="url(#tool-yellow)"/><path d="M215 164h61l-9 15h-44Z" fill="url(#tool-metal)"/>',
  "Rotary tiller": '<path d="M220 147h53v18h-53Z" fill="url(#tool-orange)"/><path d="M226 165c-9 9-6 17 0 21m12-21c-9 9-6 17 0 21m12-21c-9 9-6 17 0 21m12-21c-9 9-6 17 0 21" fill="none" stroke="#9a7045" stroke-width="5" stroke-linecap="round"/>',
  "Pallet forks": '<path d="m224 150 52-2m-44 2-6 39m24-39-1 39m-18-4h-12m34 0h-12" fill="none" stroke="url(#tool-metal)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
  "Peanut harvester": '<path d="m220 139 47-8 13 30-13 19h-47Z" fill="url(#tool-orange)"/><path d="M226 142h41m-38 11h40m-36 11h35" stroke="#f6d99f" stroke-width="4" stroke-linecap="round"/>',
  "Corn planter": '<path d="m222 127 43 4 7 36h-51Z" fill="url(#tool-orange)"/><path d="m231 138 26 3m-22 9 25 2" stroke="#f6d99f" stroke-width="5" stroke-linecap="round"/><path d="m231 168-6 23m23-22v22m18-23 6 23" stroke="#71895e" stroke-width="5" stroke-linecap="round"/>',
  "Tractor plough": '<path d="m219 143 52 17m-38-13-5 26 15-3 4-16m-4 19 18-4 5-15m-5 20 16-4 3-12" fill="none" stroke="url(#tool-metal)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
  "Snow blower for front-end loader": '<rect x="230" y="134" width="48" height="46" rx="8" fill="url(#tool-metal)"/><circle cx="254" cy="157" r="14" fill="#496b50"/><path d="m254 145 4 10 10 2-10 4-4 10-4-10-10-4 10-2Z" fill="#dbe9a5"/>',
  "Disc harrows": '<path d="m214 146 61 5m-54 0 8 33m7-31 10 34m7-32 12 31m6-29 11 25" fill="none" stroke="#71895e" stroke-width="6" stroke-linecap="round"/><circle cx="228" cy="181" r="9" fill="url(#tool-metal)"/><circle cx="248" cy="183" r="9" fill="url(#tool-metal)"/><circle cx="268" cy="179" r="9" fill="url(#tool-metal)"/>',
  "3T trailer": '<path d="m219 126 56 5-6 44h-45Z" fill="url(#tool-orange)"/><path d="M227 137h41m-42 12h40m-40 12h39" stroke="#f6d99f" stroke-width="4" stroke-linecap="round"/>',
  "Five-share plough": '<path d="m218 145 54 5m-45 1-2 25 12-3 3-18m3-3-1 25 13-3 2-18m4-3 1 24 13-2 1-18m4-5 3 23 12-3-2-17" fill="none" stroke="url(#tool-metal)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>',
  "Disc plow": '<path d="m216 145 57 8m-48-5-2 28m18-25 2 28m15-25 5 27m9-24 8 22" fill="none" stroke="#71895e" stroke-width="6" stroke-linecap="round"/><circle cx="226" cy="177" r="10" fill="url(#tool-metal)"/><circle cx="247" cy="179" r="10" fill="url(#tool-metal)"/><circle cx="269" cy="177" r="10" fill="url(#tool-metal)"/>',
};
const machineAttachmentBounds = {
  "Standard bucket": [190, 119, 62, 56],
  "Large cylindrical pick-up baler": [223, 124, 49, 49],
  Backhoe: [219, 110, 62, 91],
  "Potato harvester 4U": [216, 124, 64, 64],
  Dozer: [215, 124, 63, 55],
  "Rotary tiller": [220, 147, 53, 39],
  "Pallet forks": [224, 148, 52, 43],
  "Peanut harvester": [220, 131, 60, 57],
  "Corn planter": [222, 127, 56, 64],
  "Tractor plough": [219, 143, 52, 43],
  "Snow blower for front-end loader": [230, 134, 48, 46],
  "Disc harrows": [214, 146, 61, 42],
  "3T trailer": [219, 126, 56, 49],
  "Five-share plough": [218, 145, 64, 44],
  "Disc plow": [216, 145, 65, 42],
};
const handToolBounds = {
  Plough: [150, 60, 84, 162],
  Hoe: [131, 59, 75, 127],
  Sickle: [157, 66, 78, 133],
  Spade: [155, 58, 65, 193],
  Shovel: [155, 58, 56, 189],
  Rake: [119, 60, 98, 164],
  "Watering can": [103, 84, 167, 120],
  Wheelbarrow: [108, 131, 152, 86],
  Tractor: [88, 126, 163, 85],
  "Seed drill": [106, 124, 123, 83],
  Harrow: [92, 129, 134, 72],
  Cultivator: [98, 58, 119, 159],
  Sprayer: [110, 83, 133, 123],
  Axe: [139, 63, 93, 147],
  Pitchfork: [127, 60, 78, 137],
  "Hand trowel": [141, 72, 61, 138],
};
const handToolArt = {
  Plough: '<path d="M112 155h91l-28 40h-37Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/><path d="M156 60v116m0 0-32 20m32-20 31 18" fill="none" stroke="url(#tool-wood)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path d="M113 200h95" stroke="#596c61" stroke-width="7" stroke-linecap="round"/>',
  Hoe: '<path d="M157 56v134" fill="none" stroke="url(#tool-wood)" stroke-width="19" stroke-linecap="round"/><path d="M103 87h111l-9 31H111Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/><path d="M116 88v-9m84 9v-9" stroke="#596c61" stroke-width="5" stroke-linecap="round"/>',
  Sickle: '<path d="M152 78v121" stroke="url(#tool-wood)" stroke-width="20" stroke-linecap="round"/><path d="M159 183c-1-49 29-84 84-88-21 17-33 34-39 53-8 27-22 43-45 43" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/>',
  Spade: '<path d="M159 54v133" stroke="url(#tool-wood)" stroke-width="20" stroke-linecap="round"/><path d="M158 162h4c30 0 47 16 43 37-4 21-21 33-45 33s-41-12-45-33c-4-21 13-37 43-37Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/><path d="M145 56h30v13h-30Z" rx="6" fill="url(#tool-wood)"/>',
  Shovel: '<path d="M160 54v130" stroke="url(#tool-wood)" stroke-width="20" stroke-linecap="round"/><path d="M145 53h30v14h-30Z" rx="7" fill="url(#tool-wood)"/><path d="M131 169h58l27 56h-112Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/><path d="M160 176v42" stroke="#d7e1d1" stroke-width="4" stroke-linecap="round"/>',
  Rake: '<path d="M161 54v145" fill="none" stroke="url(#tool-wood)" stroke-width="18" stroke-linecap="round"/><path d="M94 162h134l-8 22H102Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/><path d="m109 181-4 27m23-27-2 29m23-29v30m23-30 2 29m22-29 4 27" stroke="#ba8050" stroke-width="9" stroke-linecap="round"/>',
  "Watering can": '<path d="M98 122h107a18 18 0 0 1 18 18v60a18 18 0 0 1-18 18h-89a18 18 0 0 1-18-18Z" fill="url(#tool-green)" stroke="#405c3b" stroke-width="6"/><path d="M122 122V99a31 31 0 0 1 62 0v23m38 34 48-28 13 18-51 39" fill="none" stroke="url(#tool-metal)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="m272 126 15-9m-9 22 18-3m-27-18 6-14" stroke="#74877d" stroke-width="5" stroke-linecap="round"/>',
  Wheelbarrow: '<circle cx="105" cy="197" r="23" fill="#74877d"/><circle cx="105" cy="197" r="9" fill="#efe6ca"/><path d="m123 176 94-57 30 55-102 34Z" fill="url(#tool-orange)" stroke="#a85c39" stroke-width="6" stroke-linejoin="round"/><path d="m220 169 40-39m-41 45 42 28m-139-8 21 15" fill="none" stroke="url(#tool-wood)" stroke-width="10" stroke-linecap="round"/>',
  Tractor: '<circle cx="123" cy="184" r="27" fill="url(#tool-metal)"/><circle cx="221" cy="185" r="20" fill="url(#tool-metal)"/><path d="m88 171 17-45h73l27 35h33l10 17h-28a24 24 0 0 0-46 0h-49a24 24 0 0 0-37-7Z" fill="url(#tool-green)"/><path d="M126 131h44l10 27h-55Z" fill="url(#tool-yellow)"/><path d="M135 134h28v18h-28Z" fill="#f7f2df"/>',
  "Seed drill": '<circle cx="120" cy="189" r="18" fill="url(#tool-metal)"/><circle cx="222" cy="189" r="18" fill="url(#tool-metal)"/><path d="m106 157 123 1-9 15H113Zm32-33h64l13 34h-89Z" fill="url(#tool-orange)"/><path d="M148 131h45m-37 41-5 27m26-27-2 27m24-27 3 27" stroke="url(#tool-metal)" stroke-width="7" stroke-linecap="round"/>',
  Harrow: '<path d="m92 129 134 12-16 41-109-11Z" fill="url(#tool-green)" stroke="#496b50" stroke-width="5"/><path d="m111 169-8 24m30-22-6 27m32-24-3 27m31-26 1 25" stroke="url(#tool-metal)" stroke-width="8" stroke-linecap="round"/>',
  Cultivator: '<path d="M160 58v103m-54 1h108m-86 0-15 42m47-42v47m42-47 15 42" fill="none" stroke="url(#tool-wood)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="m108 197-10 13m57-8-9 15m60-20 10 13" stroke="url(#tool-metal)" stroke-width="9" stroke-linecap="round"/>',
  Sprayer: '<path d="M105 95h97v120h-97Z" rx="17" fill="url(#tool-orange)" stroke="#a85c39" stroke-width="6"/><path d="M126 95V76h54v19m22 26 43-44" fill="none" stroke="url(#tool-metal)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M124 122h59m-59 13h59" stroke="#f4d6a5" stroke-width="5" stroke-linecap="round"/>',
  Axe: '<path d="m117 202 90-131" stroke="url(#tool-wood)" stroke-width="24" stroke-linecap="round"/><path d="M189 92c14-36 45-45 75-25-10 32-32 51-70 48l-21-8Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="6" stroke-linejoin="round"/>',
  Pitchfork: '<path d="M160 68v143m-44-83h88m-78-1-7-45m30 44V32m31 96 9-45" fill="none" stroke="url(#tool-wood)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="m117 84-8-40m38 38V25m38 57 9-40" stroke="url(#tool-metal)" stroke-width="10" stroke-linecap="round"/>',
  "Hand trowel": '<path d="M159 69v100" stroke="url(#tool-wood)" stroke-width="20" stroke-linecap="round"/><path d="M141 64h36v13h-36Z" rx="6" fill="url(#tool-wood)"/><path d="M139 151h40l21 46-41 29-41-29Z" fill="url(#tool-metal)" stroke="#596c61" stroke-width="5" stroke-linejoin="round"/>',
};
function toolIllustration(name, type) {
  const defs = `<defs>
    <linearGradient id="tool-wood"><stop stop-color="#ba8050"/><stop offset="1" stop-color="#ba8050"/></linearGradient>
    <linearGradient id="tool-metal"><stop stop-color="#74877d"/><stop offset=".45" stop-color="#74877d"/><stop offset="1" stop-color="#74877d"/></linearGradient>
    <linearGradient id="tool-green"><stop stop-color="#55794e"/><stop offset="1" stop-color="#55794e"/></linearGradient>
    <linearGradient id="tool-orange"><stop stop-color="#dd754b"/><stop offset="1" stop-color="#dd754b"/></linearGradient>
    <linearGradient id="tool-yellow"><stop stop-color="#dfb846"/><stop offset="1" stop-color="#dfb846"/></linearGradient>
    <filter id="tool-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#304b37" flood-opacity=".2"/></filter>
  </defs>`;
  const [x, y, width, height] = type === "machine" ? machineAttachmentBounds[name] : handToolBounds[name];
  const scale = Math.min(4.2, 260 / width, 190 / height);
  const translateX = 160 - (x + width / 2) * scale;
  const translateY = 145 - (y + height / 2) * scale;
  const artwork = type === "machine" ? machineAttachments[name] : handToolArt[name];
  const body = `<ellipse cx="160" cy="220" rx="82" ry="11" fill="#284434" opacity=".1"/>
    <g transform="translate(${translateX} ${translateY}) scale(${scale})" filter="url(#tool-shadow)">${artwork}</g>`;
  return `<svg class="tool-clay-art" viewBox="0 0 320 240" role="img" aria-label="Simple clay-style illustration of ${name}">${defs}${body}</svg>`;
}

toolProducts.forEach(({ name, type, price }) => {
  const toolVisual = toolIllustration(name, type);
  const estimatedUnitPrice = Math.round((price[0] + price[1]) / 2);
  const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const toolCategory = type === "machine" || ["Tractor", "Seed drill", "Harrow", "Cultivator"].includes(name)
    ? "Farm machinery"
    : "Hand tool";
  const productCard = document.createElement("article");
  productCard.className = "product-card tool-product";
  productCard.dataset.category = "tools";
  productCard.dataset.name = name.toLowerCase();
  productCard.innerHTML = `
    <div class="product-image-wrap">
      ${toolVisual}
      <span class="product-tag${toolCategory === "Farm machinery" ? " tag-soft" : ""}">${toolCategory}</span>
    </div>
    <div class="product-info">
      <div><span class="product-farm">AGRILINK FARM TOOLS</span><h3>${name}</h3></div>
      <button class="add-button" type="button" aria-label="Add ${name} to cart at estimated price" data-product="${name} (estimated)" data-price="${estimatedUnitPrice}">+</button>
    </div>
    <p class="product-detail">${toolCategory === "Hand tool" ? "A practical everyday essential for growers." : "Hard-working equipment for the field."}</p>
    <button class="tool-price-button" type="button" aria-expanded="false">Ask for price <span aria-hidden="true">↓</span></button>
    <div class="tool-price-answer" hidden>
      <span class="tool-price-range">${formattedPrice.format(price[0])}–${formattedPrice.format(price[1])}</span>
      <span class="tool-cart-note">Add to cart uses the range midpoint: ${formattedPrice.format(estimatedUnitPrice)} per item.</span>
      <span class="tool-price-disclaimer">Indicative estimate converted from typical Indian-market pricing at about ₹85 per $1. Brand, model, shipping and location affect the final price.</span>
    </div>`;
  toolGrid.append(productCard);
});

const products = [...document.querySelectorAll(".product-card")];
const categoryButtons = [...document.querySelectorAll(".category-chip")];
const searchPanel = document.querySelector(".search-panel");
const searchInput = document.querySelector("#site-search");
const emptyState = document.querySelector(".empty-state");
const cartButton = document.querySelector(".cart-button");
const cartDrawer = document.querySelector(".cart-drawer");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartItemsList = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartSummary = document.querySelector(".cart-summary");
const cartCount = document.querySelector(".cart-count");
const drawerCount = document.querySelector(".drawer-count");
const toast = document.querySelector(".toast");

const cart = new Map();
let selectedCategory = "all";
let toastTimeout;

function initScrollAnimations() {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = document.querySelectorAll(
    ".values-strip, .section-heading, .category-list, .product-card, .story-image, .story-copy, .newsletter-section > *, .footer-top > *, .footer-bottom"
  );

  revealTargets.forEach((target, index) => {
    target.dataset.reveal = "";
    if (target.classList.contains("product-card")) {
      target.style.setProperty("--reveal-delay", `${(index % 4) * 85}ms`);
    }
  });

  if (motionPreference.matches || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach((target) => revealObserver.observe(target));
}

function updateProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  products.forEach((product) => {
    const matchesCategory = selectedCategory === "all" || product.dataset.category === selectedCategory;
    const matchesSearch = !query || product.dataset.name.includes(query);
    const visible = matchesCategory && matchesSearch;

    product.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function updateCart() {
  const totalItems = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = [...cart.values()].reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = totalItems;
  cartButton.setAttribute("aria-label", `Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`);
  drawerCount.textContent = `(${totalItems})`;
  cartEmpty.hidden = totalItems > 0;
  cartSummary.hidden = totalItems === 0;
  cartItemsList.replaceChildren();

  cart.forEach((item, name) => {
    const listItem = document.createElement("li");
    listItem.className = "cart-item";

    const itemName = document.createElement("span");
    itemName.className = "cart-item-name";
    itemName.textContent = name;

    const itemPrice = document.createElement("span");
    itemPrice.className = "cart-item-price";
    const lineTotal = `$${(item.price * item.quantity).toFixed(2)}`;
    itemPrice.textContent = item.isEstimate ? `${lineTotal} estimated` : lineTotal;

    const controls = document.createElement("span");
    controls.className = "cart-item-controls";

    const decrease = document.createElement("button");
    decrease.className = "quantity-button";
    decrease.type = "button";
    decrease.dataset.action = "decrease";
    decrease.dataset.product = name;
    decrease.setAttribute("aria-label", `Remove one ${name}`);
    decrease.textContent = "−";

    const quantity = document.createElement("span");
    quantity.className = "cart-quantity";
    quantity.textContent = item.quantity;

    const increase = document.createElement("button");
    increase.className = "quantity-button";
    increase.type = "button";
    increase.dataset.action = "increase";
    increase.dataset.product = name;
    increase.setAttribute("aria-label", `Add one ${name}`);
    increase.textContent = "+";

    controls.append(decrease, quantity, increase);
    listItem.append(itemName, itemPrice, controls);
    cartItemsList.append(listItem);
  });

  const containsEstimates = [...cart.values()].some((item) => item.isEstimate);
  document.querySelector(".cart-subtotal").textContent = `$${subtotal.toFixed(2)}${containsEstimates ? " estimated" : ""}`;
}

function setCartOpen(isOpen) {
  cartDrawer.classList.toggle("open", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
  cartBackdrop.hidden = !isOpen;
  document.body.classList.toggle("drawer-open", isOpen);
  if (isOpen) document.querySelector(".drawer-close").focus();
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach((categoryButton) => {
      const isSelected = categoryButton === button;
      categoryButton.classList.toggle("selected", isSelected);
      categoryButton.setAttribute("aria-pressed", String(isSelected));
    });
    updateProducts();
    const targetSection = selectedCategory === "tools"
      ? "#tools"
      : selectedCategory === "seeds"
        ? "#seeds"
        : "#shop";
    document.querySelector(targetSection).scrollIntoView({ behavior: "smooth" });
  });
});

for (const grid of [toolGrid, seedGrid]) {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".tool-price-button");
    if (!button) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;
    button.setAttribute("aria-expanded", String(!isExpanded));
    answer.hidden = isExpanded;
    button.innerHTML = isExpanded
      ? `${grid === seedGrid ? "See estimated price" : "Ask for price"} <span aria-hidden="true">↓</span>`
      : 'Hide estimate <span aria-hidden="true">↑</span>';
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-button");
    if (!button) return;

    const itemName = button.dataset.product;
    const item = cart.get(itemName) || { price: Number(button.dataset.price), quantity: 0, isEstimate: true };
    item.quantity += 1;
    cart.set(itemName, item);
    updateCart();
    showToast(`${itemName.replace(" (estimated)", "")} added using the estimated midpoint price`);
  });
}

searchInput.addEventListener("input", updateProducts);
searchPanel.addEventListener("submit", (event) => {
  event.preventDefault();
  searchPanel.hidden = true;
  const seedResults = document.querySelector("#seed-products .product-card:not([hidden])");
  const toolResults = document.querySelector("#farm-tools .product-card:not([hidden])");
  const foodResults = document.querySelector("#products .product-card:not([hidden])");
  const resultsSection = seedResults && !foodResults && !toolResults
    ? "#seeds"
    : toolResults && !foodResults && !seedResults
      ? "#tools"
      : "#shop";
  document.querySelector(resultsSection).scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".search-toggle").addEventListener("click", () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) searchInput.focus();
});

document.querySelectorAll("#products .add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { product, price } = button.dataset;
    const item = cart.get(product) || { price: Number(price), quantity: 0 };
    item.quantity += 1;
    cart.set(product, item);
    updateCart();
    showToast(`${product} added to your cart`);
  });
});

cartButton.addEventListener("click", () => setCartOpen(true));
document.querySelector(".drawer-close").addEventListener("click", () => setCartOpen(false));
cartBackdrop.addEventListener("click", () => setCartOpen(false));

cartItemsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = cart.get(button.dataset.product);
  if (!item) return;

  if (button.dataset.action === "increase") {
    item.quantity += 1;
  } else if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.delete(button.dataset.product);
  }

  updateCart();
});

document.querySelector(".checkout-button").addEventListener("click", () => {
  showToast("Online checkout is not connected yet.");
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setCartOpen(false);
    searchPanel.hidden = true;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.querySelector("#email-address");
  const message = document.querySelector(".newsletter-message");
  message.textContent = `Thanks! The mailing-list form is ready to connect for ${emailInput.value}.`;
  event.currentTarget.reset();
});

document.querySelector(".current-year").textContent = new Date().getFullYear();
initScrollAnimations();
updateProducts();
updateCart();
