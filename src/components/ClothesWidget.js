import hot from "../img/hot.png"
import warm from "../img/warm.png"
import mild from "../img/mild.png"
import cool from "../img/cool.png"
import chilly from "../img/chilly.png"
import thermal from "../img/thermal.png"
import freeze from "../img/freeze.png"
import windy from "../img/windy.png"

import { useState } from "react"
import "./ClothesWidget.css"

//icons
const getTempIcons = (temp) => {
    switch (true) {
        case temp >= 22:
            return [hot]
        case temp >= 18:
            return [warm]
        case temp >= 15:
            return [mild]
        case temp >= 10:
            return [cool]
        case temp >= 5:
            return [chilly]
        case temp >= 0:
            return [chilly, thermal]
        default:
            return [freeze, thermal]
    }
}

//clothes
const getTempText = (temp) => {
    switch (true) {
        case temp >= 22:
            return "tričko, kraťasy"
        case temp >= 18:
            return "lehká mikina, kraťasy"
        case temp >= 15:
            return "mikina, džíny"
        case temp >= 10:
            return "lehká bunda, džíny"
        case temp >= 5:
            return "bunda, džíny"
        case temp >= 0:
            return "bunda, termoprádlo, džíny"
        default:
            return "silná bunda, termoprádlo, čepice"
    }
}

//wind
const getWindText = (wind) => wind >= 6 ? "+ čepice (fouká)" : ""

const getClothingRecommendationData = (temp, wind) => {
    const baseText = getTempText(temp)
    const windText = getWindText(wind)
    const text = windText ? `${baseText} ${windText}` : baseText
    
    //v případě vícenásobného použití getTempIcons použít spread operátor 
    const icons = getTempIcons(temp)
    if (wind >= 6) icons.push(windy)


    return { text, icons }
}


const ClothesWidget = ({ temp, wind }) => {
    const [expanded, setExpanded] = useState(false)

    const recommendation =
        typeof temp === "number" ? getClothingRecommendationData(temp, wind ?? 0) : null

    const toggleExpanded = () => setExpanded(prev => !prev)

    return (
        <section
            className={`clothes-widget ${expanded ? "expanded" : ""}`}
            onClick={toggleExpanded}
        >
            <div className="clothes-header">
                <span className="clothes-icon">
                    {recommendation
                        ? recommendation.icons.map((src, i) => (
                            <img key={i} src={src} alt="oblečení" className="clothes-img" />
                        ))
                        : "🧥"}
                </span>
                <span className="clothes-temp">
                    {typeof temp === "number" ? `${Math.round(temp)}°C` : "Načítám…"}
                </span>
            </div>
            {expanded && recommendation && (
                <div className="clothes-details">
                    <p className="clothes-recommendation">{recommendation.text}</p>
                    <p className="clothes-wind">
                        Vítr: {typeof wind === "number" ? `${wind.toFixed(1)} km/h` : "?"}
                    </p>
                </div>
            )}
            {!recommendation && (
                <p className="clothes-loading shimmer">
                    Načítám doporučení podle počasí…
                </p>
            )}
        </section>
    )
}

export default ClothesWidget



