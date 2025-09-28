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
