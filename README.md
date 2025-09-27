# Scooter Assistant

Aplikace pro sledování počasí s ohledem na jízdu na koloběžce. Aplikace poskytuje detailní předpověď počasí, doporučení oblečení a status jízdy na koloběžce pro různé časové období.

## Zadání projektu

*Tato sekce bude vyplněna později*

## Myšlenkový proces

Aplikace byla navržena s ohledem na praktické potřeby uživatelů, kteří se rozhodují, zda vyrazit na koloběžce. Klíčové principy:

- **Jednoduchost rozhodování**: Aplikace poskytuje jasné vizuální indikátory (✅, 🌧️, 🥶) pro rychlé posouzení vhodnosti jízdy
- **Časové rozlišení**: Rozdělení na ráno a odpoledne umožňuje plánovat jízdu podle konkrétních časů
- **Praktické doporučení**: Widget oblečení poskytuje konkrétní rady na základě teploty a větru
- **Dlouhodobé plánování**: 7denní a 14denní předpovědi umožňují plánovat dopředu
- **Lokální kontext**: Aplikace je optimalizována pro české prostředí (Brno) s českými názvy a formátováním

## Jak spustit

### Předpoklady
- Node.js (verze 14 nebo vyšší)
- npm nebo yarn

### Instalace
```bash
# Klonování repozitáře
git clone <repository-url>
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

### Klíčové komponenty
- **Status indikátory**: ✅ (vhodné), 🌧️ (déšť), 🥶 (zima)
- **ClothesWidget**: Inteligentní doporučení oblečení na základě teploty a větru
- **ShortWidget**: Kompaktní zobrazení denní předpovědi
- **LongWidget**: Zjednodušené zobrazení pro dlouhodobou předpověď

### Funkce aplikace
- **Real-time počasí**: Aktuální teplota, oblačnost, vlhkost
- **Časové rozlišení**: Ranní (8:00) a odpolední (17:00) předpovědi
- **Doporučení oblečení**: Dynamické doporučení na základě teploty a větru
- **Interaktivní navigace**: Slider pro procházení dnů
- **Responsive design**: Optimalizováno pro mobilní i desktop zařízení
- **Česká lokalizace**: Všechny texty a formátování v češtině

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

### Struktura projektu
```
src/
├── api/           # API služby
├── components/    # Znovupoužitelné komponenty
├── context/       # React Context pro state management
├── pages/         # Hlavní stránky aplikace
├── img/           # Obrázky a ikony
└── App.js         # Hlavní komponenta
```