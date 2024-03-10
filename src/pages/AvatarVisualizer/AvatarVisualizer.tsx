import React, { useEffect, useState } from "react"
import "./AvatarVisualizer.css"
import useDebounce from "../../hooks/useDebounce"
import VisualizerModes from "./VisualizerModes"
import { OptionalParts, VisualizerOption } from "./VisualizerOptions"

function Checkbox({
    option, state, setState
}: {
    option: VisualizerOption,
    state: boolean,
    setState: (arg0: boolean) => void
}) {
    return <div className="checkbox-row">
        <input 
            id={option.slug} 
            type="checkbox" 
            name={option.name} 
            checked={!state} 
            onChange={() => setState(!state)}
        />
        <label htmlFor={option.slug}>{option.name}</label>
    </div>
}

type PositionParamType = 'y'|'p'|'r'|'null'

export function AvatarVisualizer() {
    const [subject, setSubject] = useState<string>('X-Steve')
    const [debouncedSubject, setDebouncedSubject] = useState<string>('')
    const [renderOption, setRenderOption] = useState<string>(VisualizerModes[1].options[2].slug)
    const [imgHasError, setImgHasError] = useState<boolean>(false)
    
    const [hideShadow, setHideShadow] = useState<boolean>(false)
    const [hideCape, setHideCape] = useState<boolean>(false)
    const [hideEars, setHideEars] = useState<boolean>(false)
    const [hideHelmet, setHideHelmet] = useState<boolean>(false)
    const [hideOverlay, setHideOverlay] = useState<boolean>(false)

    const [selectedPositionParam, setSelectedPositionParam] = useState<PositionParamType>(null)
    const [positionParamValue, setPositionParamValue] = useState<number>(0)
    const [debouncedPositionParamValue, setDebouncedPositionParamValue] = useState<number>(0)

    function getVisageSrc(subject: string) {
        const anyHideOptions = (hideShadow || hideCape || hideEars || hideHelmet || hideOverlay)
        const hideParams = 
            anyHideOptions
            ? `?no=${hideShadow ? 'shadow,' : ''}${hideCape ? 'cape,' : ''}${hideEars ? 'ears,' : ''}${hideHelmet ? 'helmet,' : ''}${hideOverlay ? 'overlay' : ''}`
            : ''
        const positionParam = 
            (selectedPositionParam !== null)
            ? `?${selectedPositionParam}=${debouncedPositionParamValue}` 
            : ''
        const params = `${hideParams}${anyHideOptions ? '' : positionParam}`
        return `https://visage.surgeplay.com/${renderOption}/384/${subject}${params}`
    }

    useEffect(() => setImgHasError(false), [
        hideShadow,
        hideCape,
        hideEars,
        hideHelmet,
        hideOverlay,
        selectedPositionParam,
        debouncedPositionParamValue,
        debouncedSubject
    ])

    useDebounce(() => {
        setDebouncedSubject(subject)
    }, [subject], 300)

    useDebounce(() => {
        setDebouncedPositionParamValue(positionParamValue)
    }, [positionParamValue], 100)

    return (
        <>
        <h2>Minecraft Avatar Visualizer</h2>
        <div id="skin-options">
            <select
                onChange={(e) => setRenderOption(e.target.value)}
            >
                {VisualizerModes.map((optionType) => 
                    <optgroup label={optionType.name}>
                        {optionType.options.map((option) => <option value={option.slug} selected={option.slug === renderOption}>{option.name}</option>)}
                    </optgroup>
                )}
            </select>
            <input 
                type="text" 
                id="subject" 
                placeholder="Skin Subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
            />
            <div className="checkboxes">
                <Checkbox option={OptionalParts[0]} state={hideShadow} setState={setHideShadow} />
                <Checkbox option={OptionalParts[1]} state={hideCape} setState={setHideCape} />
                <Checkbox option={OptionalParts[2]} state={hideEars} setState={setHideEars} />
                <Checkbox option={OptionalParts[3]} state={hideHelmet} setState={setHideHelmet} />
                <Checkbox option={OptionalParts[4]} state={hideOverlay} setState={setHideOverlay} />
            </div>
            
            <div>
                <select
                    onChange={(e) => {
                        setSelectedPositionParam(e.target.value as PositionParamType)
                    }}
                >
                    <option value={'null'} selected={'null' === selectedPositionParam}>Default position</option>
                    <option value={'y'} selected={'y' === selectedPositionParam}>Yaw</option>
                    <option value={'p'} selected={'p' === selectedPositionParam}>Pitch</option>
                    <option value={'r'} selected={'r' === selectedPositionParam}>Roll</option>
                </select>
                <input
                    hidden={selectedPositionParam === 'null'} 
                    type="range" 
                    min="-180" 
                    max="180" 
                    value={positionParamValue} 
                    onChange={(e) => setPositionParamValue(e.target.valueAsNumber)}
                    id="position"
                />
            </div>
        </div>
        <div>
            <img 
                id="skin-img" 
                src={getVisageSrc(debouncedSubject)}
                onError={(e: any) => {
                    console.log(e)
                    e.target.src = getVisageSrc('ddrl46')
                    setImgHasError(true)
                }}
            />
            {imgHasError && <p>
                Subject not found
            </p>}
        </div>
        </>
    )
}