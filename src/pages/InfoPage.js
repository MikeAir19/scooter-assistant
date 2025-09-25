import { useState } from "react"
import "./InfoPage.css"

const InfoPage = () => {
  const [showWhat, setShowWhat] = useState(false)
  const [showHow, setShowHow] = useState(false)

  return (
    <section className="info-page">
      <h2 className="info-title">Informace o stránce</h2>
      <p className="info-subtext">Klikni na otázku a dozvíš se víc.</p>

      <div className="info-block" onClick={() => setShowWhat(prev => !prev)}>
        <p className="info-question">Co je to?</p>
        {showWhat && (
          <p className="info-answer">
            Tato stránka byla navržena jako nástroj pro předpověď počasí a doporučení vhodného oblečení s ohledem na konkrétní lokalitu a časové podmínky. Vznikla primárně jako závěrečný projekt v rámci kurzu Reactu pořádaného společností ENGETO, zároveň však slouží i pro mé osobní využití. V nejbližších dnech ji plánuji nasadit na vlastní zařízení Raspberry Pi, kde bude sloužit jako praktický pomocník při plánování cest na koloběžce.
          </p>
        )}
      </div>

      <div className="info-block" onClick={() => setShowHow(prev => !prev)}>
        <p className="info-question">Jak se používá?</p>
        {showHow && (
          <div className="info-answer">
            <p>
              V sekci „Dnes“ se nejprve zobrazí souhrnný status pro celý den, který vychází z aktuální předpovědi počasí. Pod tímto přehledem se nachází dva samostatné widgety — jeden nastavený na 8:00 ráno a druhý na 17:00 odpoledne. Každý z nich zobrazuje konkrétní meteorologické parametry vztahující se k danému času, včetně teploty, srážek, větru a dalších údajů. Na základě těchto informací je uživateli doporučeno vhodné oblečení pro danou část dne.
            </p>
            <p>
              V sekci „Zítra“ je počasí pro zítřejší ráno a odpoledne včetně teploty, srážek a větru. Na základě těchto dat doporučí vhodné oblečení.
            </p>
            <p>
              V sekci „Týdenní předpověď“ najdeš přehled počasí na několik dní dopředu. Každý den obsahuje stav ráno, odpoledne a doporučení oblečení podle polední teploty.
            </p>
            <p>
              V sekci „Dlouhodobá předpověď“ najdeš orientační výhled na počasí v dalších týdnech. Zobrazuje průměrné teploty a srážky bez hodinového rozlišení.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default InfoPage
