# Scooter Assistant

Aplikace pro sledování počasí s ohledem na jízdu na koloběžce. Poskytuje detailní předpověď počasí, doporučení oblečení a status vhodnosti jízdy pro různá časová období.

## Zadání projektu

### Téma webu
- Téma si volíš sám — může jít o film, knihu, produkt, službu nebo cokoli jiného.
- Důležité je, aby tě tvorba bavila.
- Obsah je zcela na tobě, cílem je kreativní zpracování.

---

## První strana webu

### Struktura
- Inspiruj se vzorovou stránkou (viz obrázek v zadání), ale obsah si urči sám.
- Požadavky jsou minimální — můžeš přidat více komponent, sekcí nebo funkcí.

### Funkce

#### 1. Dynamický text
- V horní části stránky se při každém načtení zobrazí jiný text.
- Text se vybírá náhodně z pole (např. 3 varianty).
- Zvýrazni ho vizuálně (např. žlutě).

#### 2. Statické komponenty
- Obsah je libovolný, ale musí obsahovat obrázky (ne pouze text).

#### 3. Záložky (tabs)
- Kliknutím na záložku se mění obsah v tmavé části pod ní.
- Každá záložka zobrazuje jiný obsah.
- Můžeš použít libovolný počet záložek.

---

## Druhá strana webu

### Kombinace
- Spoj **formulář** a **API**.
- Uživatel zadá údaje pomocí formuláře.
- Tyto údaje použiješ k dotazu na API.

### Podmínky
- Použij libovolné veřejné API, **kromě těch, která byla použita v kurzu**.
- Seznam veřejných API najdeš online (např. [public-apis.io](https://public-apis.io) nebo [apilist.fun](https://apilist.fun)).

---

## Myšlenkový proces

Aplikace vznikla jako závěrečný projekt kurzu Reactu od ENGETO, ale zároveň jsem chtěl vytvořit něco praktického, co budu sám používat. Požadavky zadání jsou implementovány v různých částech aplikace a přizpůsobeny tak, aby se hodily k celku. Záložky jsou například v sekci „Informace“ a zobrazí se po rozbalení části „Jak se používá?“.

Stránku CursePage (Kurz) jsem přidal pouze pro účely kurzu, kvůli zpracování statických komponent s obrázky, protože se mi nikam jinam do aplikace nehodily. Nýzvy filmů a tagy jsem vzal z kurzu.

### Klíčové principy:
- **Jednoduchost rozhodování**: Jasné vizuální indikátory (✅, 🌧️, 🥶) pro rychlé posouzení vhodnosti jízdy.
- **Časové rozlišení**: Rozdělení na ráno a odpoledne umožňuje plánovat jízdu podle konkrétního času.
- **Praktické doporučení**: Widget oblečení poskytuje konkrétní rady na základě teploty a větru.
- **Dlouhodobé plánování**: 7denní a 14denní předpovědi umožňují plánovat dopředu.
- **Lokální kontext**: Aplikace je optimalizována pro české prostředí (Brno) s českými názvy a formátováním.
- **Vyhledání předpovědi**: Uživatel může zobrazit až týdenní předpověď pro libovolné město v ČR i Evropě.

---

## Jak spustit

### Předpoklady
- Node.js (verze 14 nebo vyšší)
- npm nebo yarn

### Instalace
```bash
# Klonování repozitáře
git clone https://github.com/MikeAir19/scooter-assistant/
cd scooter-assistant

# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm start
```

Aplikace bude dostupná na `http://localhost:3000`

### Build pro produkci
```bash
npm run build
```

## Funkce

### Hlavní stránky
- **Dnes** - Aktuální počasí s doporučením pro jízdu na koloběžce
- **Zítra** - Detailní předpověď pro zítřejší den
- **Krátkodobá předpověď** - 7denní výhled s interaktivním sliderem
- **Dlouhodobá předpověď** - 14denní výhled s gridovým zobrazením
- **Informace** - O aplikaci a funkcích
- **Vlastní lokalita** - Vyhledávání počasí pro libovolné město
- **Kurz** - Pouze pro účely kurzu

### Klíčové komponenty
- **Status indikátory**: ✅ (vhodné), 🌧️ (déšť), 🥶 (zima)
- **ClothesWidget**: Inteligentní doporučení oblečení na základě teploty a větru
- **ShortWidget**: Kompaktní zobrazení denní předpovědi
- **LongWidget**: Zjednodušené zobrazení pro dlouhodobou předpověď
- **Header**: Logo a název aplikace
- **Footer**: Informace o autorovi a kurzu
- **Navbar**: Navigační menu s responzivním designem
- **CustomLocationForecast**: Vyhledávání počasí pro libovolné město
- **OneMovie**: Pouze pro účely kurzu

### Funkce aplikace
- **Real-time počasí**: Aktuální teplota, oblačnost, vlhkost
- **Časové rozlišení**: Ranní (8:00) a odpolední (17:00) předpovědi
- **Doporučení oblečení**: Dynamické doporučení na základě teploty a větru
- **Interaktivní navigace**: Slider pro procházení dnů
- **Vyhledávání měst**: Geocoding API pro vyhledání libovolného města
- **Vlastní lokalita**: 7denní předpověď pro vybrané město
- **Responsive design**: Optimalizováno pro mobilní i desktop zařízení
- **Česká lokalizace**: Všechny texty a formátování v češtině
- **Modulární layout**: Header, navigace a footer na všech stránkách

## Balíčky

### Hlavní závislosti
- **react** (^19.1.1) - React framework
- **react-dom** (^19.1.1) - React DOM rendering
- **react-router-dom** (^6.30.1) - Routing pro SPA
- **axios** (^1.12.2) - HTTP klient pro API volání

### Vývojové závislosti
- **react-scripts** (5.0.1) - Create React App build tools
- **@testing-library/react** (^16.3.0) - Testing utilities
- **@testing-library/jest-dom** (^6.8.0) - Jest DOM matchers
- **@testing-library/user-event** (^13.5.0) - User interaction testing
- **web-vitals** (^2.1.4) - Web performance metrics

### API
- **Open-Meteo API** - Bezplatné počasí API
  - Souřadnice: Brno (49.1952, 16.608)
  - Timezone: Europe/Prague
  - Předpověď: 14 dní dopředu
  - Data: teplota, srážky, vítr, oblačnost, vlhkost, sněžení
- **Geocoding API** - Vyhledávání souřadnic měst
  - Integrace s Open-Meteo geocoding službou
  - Podpora pro libovolné město v Evropě