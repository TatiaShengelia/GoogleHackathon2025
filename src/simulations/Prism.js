import React, { useRef, useEffect, useState } from 'react';
import './Prism.css'
import Navbar from '../navigationbar/Navbar';

class Prism {
    #prismElement;

    #angle = Math.PI / 3;
    #angleTan = Math.tan(this.#angle);

    constructor(topX, topY, height, prismElement) {
        this.topX = topX;
        this.topY = topY;
        this.height = height;
        this.#prismElement = prismElement;
    }

    get bottomY() {
        return this.topY + this.height;
    }

    get bottomRightPos() {
        return { x: this.topX + this.height / this.#angleTan, y: this.topY + this.height }
    }

    get bottomLeftPos() {
        return { x: this.topX - this.height / this.#angleTan, y: this.topY + this.height }
    }

    getXPosOnLeftSide(yPos) {
        return yPos > this.bottomY || yPos < this.topY ?
            -1 : this.topX - ((yPos - this.topY) / this.#angleTan);
    }

    draw() {
        this.#prismElement.setAttribute('points', 
            `${this.bottomLeftPos.x},${this.bottomLeftPos.y} 
            ${this.topX},${this.topY} 
            ${this.bottomRightPos.x},${this.bottomRightPos.y}`);
    }
}

class IncidentRay {
    #startPos
    #endPos
    #prism

    #startElement
    #rayElement
    #endElement

    #hitRange = 12;
    #doubleHitRange = this.#hitRange * 2;

    constructor(prism, startElement, rayElement, endElement) {
        this.#prism = prism;
        this.#startElement = startElement;
        this.#rayElement = rayElement;
        this.#endElement = endElement;
        const endPosY = this.#prism.topY + this.#prism.height / 2;
        this.#startPos = { x: parseFloat(this.#startElement.getAttribute('rx')), y: this.#prism.topY + this.#prism.height };
        this.#endPos = { x: this.#prism.getXPosOnLeftSide(endPosY), y: endPosY };
    }

    get rayAngle() {
        const y1 = this.#startPos.y,
            y2 = this.#endPos.y,
            x1 = this.#startPos.x,
            x2 = this.#endPos.x;

        const baseAngle = Math.atan((y2 - y1) / (x2 - x1));
        return (x2 > x1 ? baseAngle : Math.PI / 2 + (Math.PI / 2 + baseAngle));
    }

    get startPos() {
        return this.#startPos;
    }

    get endPos() {
        return this.#endPos;
    }

    get beamWidth() {
        return parseFloat(this.#rayElement.getAttribute('stroke-width'));
    }

    set beamWidth(value) {
        this.#rayElement.setAttribute('stroke-width', value);
        const r = value / 2 + 0.5;
        this.#startElement.setAttribute('rx', r);
        this.#startElement.setAttribute('ry', r);
        this.#endElement.setAttribute('rx', r);
        this.#endElement.setAttribute('ry', r);
    }

    #isEndPositionValid(x, y) {
        return y > this.#prism.topY + this.beamWidth / 2 && y < this.#prism.bottomY - this.beamWidth / 2;
    }

    #isStartPositionValid(x, y) {
        return x < this.#prism.bottomLeftPos.x - ((this.#prism.topX - this.#prism.bottomLeftPos.x) / (this.#prism.bottomY - this.#prism.topY)) * (y - this.#prism.bottomY);
    }

    #isInBBox(x, y, box) {
        return x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height;
    }

    findClosestRayElement(x, y) {
        const rayBox = this.#rayElement.getBBox();
        const startBox = this.#startElement.getBBox();
        const endBox = this.#endElement.getBBox();

        rayBox.height += this.#doubleHitRange;
        rayBox.y -= this.#hitRange;
        startBox.y -= this.#hitRange;
        startBox.x -= this.#hitRange;
        startBox.width = this.#doubleHitRange;
        startBox.height = this.#doubleHitRange;
        endBox.y -= this.#hitRange;
        endBox.x -= this.#hitRange;
        endBox.width = this.#doubleHitRange;
        endBox.height = this.#doubleHitRange;

        let res = null;
        if (this.#isInBBox(x, y, startBox)) {
            res = this.#startElement;
        } else if (this.#isInBBox(x, y, endBox)) {
            res = this.#endElement;
        } else if (this.#isInBBox(x, y, rayBox)) {
            res = this.#rayElement;
        }

        return res;
    }

    getIncidentAngle(direction) {
        switch (direction) {
            case 'bottom':
                return this.rayAngle * -1 - Math.PI / 6;
            case 'right':
                return this.rayAngle * -1 + Math.PI / 6;
            default:
                throw new Error('Direction not supported by getIncidentAngle');
        }
    }

    tryMoveStart(x, y) {
        if (!this.#isStartPositionValid(x, y)) {
            return false;
        }

        this.#startPos.x = x;
        this.#startPos.y = y;
        return true;
    }

    tryMoveEnd(y) {
        const x = this.#prism.getXPosOnLeftSide(y);

        if (!this.#isEndPositionValid(x, y)) {
            return false;
        }

        this.#endPos.y = y;
        this.#endPos.x = x;
        return true;
    }

    tryMoveRay(y1, y2) {
        const endX = this.#prism.getXPosOnLeftSide(y2);

        if (!this.#isStartPositionValid(this.startPos.x, y1) || !this.#isEndPositionValid(endX, y2)) {
            return false;
        }

        this.#startPos.y = y1;
        this.#endPos.y = y2;
        this.#endPos.x = endX;
        return true;
    }

    draw() {
        this.#startElement.setAttribute('cx', this.#startPos.x);
        this.#startElement.setAttribute('cy', this.#startPos.y);
        this.#rayElement.setAttribute('x1', this.#startPos.x);
        this.#rayElement.setAttribute('y1', this.#startPos.y);
        this.#rayElement.setAttribute('x2', this.#endPos.x);
        this.#rayElement.setAttribute('y2', this.#endPos.y);
        this.#endElement.setAttribute('cx', this.#endPos.x);
        this.#endElement.setAttribute('cy', this.#endPos.y);
    }
}

class Refraction {
    #refractions
    #refractionGroup

    #incidentRay
    #prism

    #prismAConstant = 1.67;
    #prismBConstant = 0.00743;
    #nRed
    #nViolet

    constructor(incidentRay, prism, refractionGroup) {
        this.#incidentRay = incidentRay;
        this.#prism = prism;
        this.#refractionGroup = refractionGroup;
        this.#refractions = this.#refractionGroup.children;
        this.#setRefractiveIndices();
    }

    get prismAConstant() {
        return this.#prismAConstant;
    }

    set prismAConstant(value) {
        this.#prismAConstant = value;
        this.#setRefractiveIndices();
    }

    get prismBConstant() {
        return this.#prismBConstant;
    }

    set prismBConstant(value) {
        this.#prismBConstant = value;
        this.#setRefractiveIndices();
    }

    #setRefractiveIndices() {
        this.#nRed = this.#cauchysEquationN(0.68);
        this.#nViolet = this.#cauchysEquationN(0.41);
    }

    #cauchysEquationN(waveLength) {
        return this.prismAConstant + (this.prismBConstant / Math.pow(waveLength, 2));
    }

    #outAngleNormalized(n, direction) {
        const incidentAngle = this.#incidentRay.getIncidentAngle(direction);
        const sinIncident = Math.sin(incidentAngle);
        const angle = (Math.sqrt(3) / 2)
            * Math.sqrt(Math.pow(n, 2) - Math.pow(sinIncident, 2))
            - sinIncident / 2;
        const res = direction == 'right' ? angle - Math.PI / 6 : (angle - Math.PI / 2) * Math.PI;
        return res;
    }

    #refractionAngleNormalized(n) {
        return Math.asin(Math.sin(this.#incidentRay.getIncidentAngle('right')) / n)
            * -1 + Math.PI / 6;
    }

    #findPrismExitPoint(rayStart, n) {
        const bottomSideStart = this.#prism.bottomLeftPos,
            bottomSideEnd = this.#prism.bottomRightPos,
            rightSideStart = { x: this.#prism.topX, y: this.#prism.topY },
            rightSideEnd = this.#prism.bottomRightPos,
            rayTargetDirection = { x: rayStart.x + 1, y: rayStart.y + Math.tan(this.#refractionAngleNormalized(n)) };

        const bottomIntersection = this.#findLineIntersection(rayStart, rayTargetDirection, bottomSideStart, bottomSideEnd);
        const chosenIntersection = bottomIntersection.isIntersect ?
            bottomIntersection :
            this.#findLineIntersection(rayStart, rayTargetDirection, rightSideStart, rightSideEnd);

        return {
            x: chosenIntersection.x,
            y: chosenIntersection.y,
            direction: chosenIntersection === bottomIntersection ? 'bottom' : 'right'
        }
    }

    #findLineIntersection(line1StartPos, line1EndPos, line2StartPos, line2EndPos) {
        var denominator, a, b, numerator1, numerator2, result = {
            x: null,
            y: null,
            isIntersect: false
        };

        denominator = ((line2EndPos.y - line2StartPos.y) * (line1EndPos.x - line1StartPos.x)) - ((line2EndPos.x - line2StartPos.x) * (line1EndPos.y - line1StartPos.y));
        if (denominator == 0) {
            return result;
        }
        a = line1StartPos.y - line2StartPos.y;
        b = line1StartPos.x - line2StartPos.x;
        numerator1 = ((line2EndPos.x - line2StartPos.x) * a) - ((line2EndPos.y - line2StartPos.y) * b);
        numerator2 = ((line1EndPos.x - line1StartPos.x) * a) - ((line1EndPos.y - line1StartPos.y) * b);
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        result.x = line1StartPos.x + (a * (line1EndPos.x - line1StartPos.x));
        result.y = line1StartPos.y + (a * (line1EndPos.y - line1StartPos.y));

        if (b > 0 && b < 1) {
            result.isIntersect = true;
        }

        return result;
    }

    draw() {
        const rayEnd = this.#incidentRay.endPos;
        const halfBeamWidth = this.#incidentRay.beamWidth / 2;
        const colorCount = this.#refractions.length;
        const beamStartY = rayEnd.y - halfBeamWidth, beamEndY = rayEnd.y + halfBeamWidth;
        const refractionStart = { x: this.#prism.getXPosOnLeftSide(beamStartY), y: beamStartY },
            refractionEnd = { x: this.#prism.getXPosOnLeftSide(beamEndY), y: beamEndY };

        const redPrismEnd = this.#findPrismExitPoint(refractionStart, this.#nRed),
            violetPrismEnd = this.#findPrismExitPoint(refractionEnd, this.#nViolet);

        const refractStartDeviationX = (refractionEnd.x - refractionStart.x) / colorCount,
            refractStartDeviationY = (refractionEnd.y - refractionStart.y) / colorCount,
            refractEndDeviationX = (violetPrismEnd.x - redPrismEnd.x) / colorCount,
            refractEndDeviationY = (violetPrismEnd.y - redPrismEnd.y) / colorCount;

        const endX = this.#refractionGroup.viewportElement.viewBox.baseVal.width;
        const redEnd = { x: endX, y: redPrismEnd.y + (endX - redPrismEnd.x) * Math.tan(this.#outAngleNormalized(this.#nRed, redPrismEnd.direction)) },
            violetEnd = { x: endX, y: violetPrismEnd.y + (endX - violetPrismEnd.x) * Math.tan(this.#outAngleNormalized(this.#nViolet, violetPrismEnd.direction)) }
        const endDeviationY = (violetEnd.y - redEnd.y) / colorCount;

        for (let i = 0; i < this.#refractions.length; i++) {
            const refraction = this.#refractions[i];
            refraction.setAttribute('points', 
                `${refractionStart.x + refractStartDeviationX * i},${refractionStart.y + refractStartDeviationY * i} 
                ${redPrismEnd.x + refractEndDeviationX * i},${redPrismEnd.y + refractEndDeviationY * i} 
                ${endX},${redEnd.y + endDeviationY * i} 
                ${endX},${redEnd.y + endDeviationY * (i + 1)} 
                ${redPrismEnd.x + refractEndDeviationX * (i + 1)},${redPrismEnd.y + refractEndDeviationY * (i + 1)} 
                ${refractionStart.x + refractStartDeviationX * (i + 1)},${refractionStart.y + refractStartDeviationY * (i + 1)}`);
        }
    }
}

const PrismComponent = () => {
    const svgRef = useRef(null);
    const prismGlassRef = useRef(null);
    const incidentStartRef = useRef(null);
    const incidentRayRef = useRef(null);
    const incidentEndRef = useRef(null);
    const refractionGroupRef = useRef(null);
    
    const [aConstant, setAConstant] = useState(1.67);
    const [bConstant, setBConstant] = useState(0.00743);
    const [rayWidth, setRayWidth] = useState(8);
    const [showSettings, setShowSettings] = useState(false);
    
    const [selectedDragElement, setSelectedDragElement] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 });
    
    // Use refs to store the instances so they persist between renders
    const prismRef = useRef(null);
    const incidentRayRefInstance = useRef(null);
    const refractionRef = useRef(null);

    useEffect(() => {
        if (svgRef.current && prismGlassRef.current && incidentStartRef.current && 
            incidentRayRef.current && incidentEndRef.current && refractionGroupRef.current) {
            
            prismRef.current = new Prism(150, 0, 100, prismGlassRef.current);
            prismRef.current.draw();
            
            incidentRayRefInstance.current = new IncidentRay(
                prismRef.current, 
                incidentStartRef.current, 
                incidentRayRef.current, 
                incidentEndRef.current
            );
            incidentRayRefInstance.current.beamWidth = rayWidth;
            incidentRayRefInstance.current.draw();
            
            refractionRef.current = new Refraction(
                incidentRayRefInstance.current, 
                prismRef.current, 
                refractionGroupRef.current
            );
            refractionRef.current.prismAConstant = aConstant;
            refractionRef.current.prismBConstant = bConstant;
            refractionRef.current.draw();
        }
    }, []);

    useEffect(() => {
        if (refractionRef.current) {
            refractionRef.current.prismAConstant = aConstant;
            refractionRef.current.prismBConstant = bConstant;
            refractionRef.current.draw();
        }
    }, [aConstant, bConstant]);

    useEffect(() => {
        if (incidentRayRefInstance.current) {
            incidentRayRefInstance.current.beamWidth = rayWidth;
            incidentRayRefInstance.current.draw();
            if (refractionRef.current) {
                refractionRef.current.draw();
            }
        }
    }, [rayWidth]);

    const getMousePosition = (evt) => {
        const svg = svgRef.current;
        var CTM = svg.getScreenCTM();

        if (evt.touches) {
            evt = evt.touches[0];
        }

        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    };

    const startDrag = (evt) => {
        if (!incidentRayRefInstance.current) return;
        
        const mousePos = getMousePosition(evt);
        
        if (!evt.target.classList.contains('draggable')) {
            const closestElement = incidentRayRefInstance.current.findClosestRayElement(mousePos.x, mousePos.y);
            setSelectedDragElement(closestElement);

            if (closestElement === null) {
                return;
            }
        } else {
            setSelectedDragElement(evt.target);
        }

        setDragOffset({
            y1: mousePos.y - incidentRayRefInstance.current.startPos.y,
            y2: mousePos.y - incidentRayRefInstance.current.endPos.y,
            x1: mousePos.x - incidentRayRefInstance.current.startPos.x,
            x2: mousePos.x - incidentRayRefInstance.current.endPos.x
        });
    };

    const drag = (evt) => {
        if (!selectedDragElement || !incidentRayRefInstance.current || !refractionRef.current) {
            return;
        }

        evt.preventDefault();
        const mousePos = getMousePosition(evt);
        let moved = false;

        if (selectedDragElement.id === 'incident-ray') {
            const newY1 = mousePos.y - dragOffset.y1, newY2 = mousePos.y - dragOffset.y2;
            moved = incidentRayRefInstance.current.tryMoveRay(newY1, newY2);
        } else if (selectedDragElement.id === 'incident-start') {
            const newCx = mousePos.x - dragOffset.x1, newCy = mousePos.y - dragOffset.y1;
            moved = incidentRayRefInstance.current.tryMoveStart(newCx, newCy);
        } else if (selectedDragElement.id === 'incident-end') {
            const newCy = mousePos.y - dragOffset.y2;
            moved = incidentRayRefInstance.current.tryMoveEnd(newCy);
        }

        if (moved) {
            incidentRayRefInstance.current.draw();
            refractionRef.current.draw();
        }
    };

    const endDrag = () => {
        setSelectedDragElement(null);
    };

    return (
        <>
        <Navbar />
        <div className="prism-container">
            <svg 
                ref={svgRef}
                id="prism-svg" 
                viewBox="0,0,300,120" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlLang="en"
                onMouseDown={startDrag}
                onMouseMove={drag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onTouchStart={startDrag}
                onTouchMove={drag}
                onTouchEnd={endDrag}
                onTouchCancel={endDrag}
            >
                <g ref={refractionGroupRef} id="prism-refraction">
                    <polygon id="refraction-red" fill="red" />
                    <polygon id="refraction-orange" fill="orange" />
                    <polygon id="refraction-yellow" fill="yellow" />
                    <polygon id="refraction-green" fill="green" />
                    <polygon id="refraction-blue" fill="blue" />
                    <polygon id="refraction-indigo" fill="indigo" />
                    <polygon id="refraction-violet" fill="violet" />
                </g>
                <polygon 
                    ref={prismGlassRef}
                    id="prism-glass" 
                    stroke="#8eecf3" 
                    strokeWidth="1.5" 
                    fillOpacity="0"
                    onClick={() => setShowSettings(!showSettings)}
                />
                <g id="incident" className="glow" fill="white" stroke="white">
                    <line 
                        ref={incidentRayRef}
                        id="incident-ray" 
                        className="draggable" 
                        fill="white" 
                        stroke="white" 
                        strokeWidth={rayWidth} 
                    />
                    <ellipse 
                        ref={incidentStartRef}
                        id="incident-start" 
                        className="draggable" 
                        rx="4.5" 
                        ry="4.5"
                    >
                        <animate attributeName="fill" values="white;lightgray;white" dur="7s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse 
                        ref={incidentEndRef}
                        id="incident-end" 
                        className="draggable" 
                        rx="4.5" 
                        ry="4.5"
                    >
                        <animate attributeName="fill" values="white;lightgray;white" dur="7s" repeatCount="indefinite" />
                    </ellipse>
                </g>
            </svg>
            
            {showSettings && (
                <div id="settings-container" className="move-in">
                    <div id="settings">
                        <button id="button-close-settings" onClick={() => setShowSettings(false)}>&times;</button>
                        <div className="setting">
                            <label htmlFor="range-a" title="A constant of Cauchy's equation.">Material A</label>
                            <input 
                                type="range" 
                                id="range-a" 
                                step="0.01" 
                                min="1" 
                                max="2" 
                                value={aConstant}
                                onChange={(e) => setAConstant(parseFloat(e.target.value))}
                            />
                            <span id="value-a">{aConstant.toFixed(2)}</span>
                        </div>
                        <div className="setting">
                            <label htmlFor="range-b" title="B constant of Cauchy's equation. Value adjusted by 1.000">Material B</label>
                            <input 
                                type="range" 
                                id="range-b" 
                                step="0.01" 
                                min="0.01" 
                                max="100" 
                                value={bConstant * 1000}
                                onChange={(e) => setBConstant(parseFloat(e.target.value) / 1000)}
                            />
                            <span id="value-b">{(bConstant * 1000).toFixed(2)}</span>
                        </div>
                        <div className="setting">
                            <label htmlFor="range-ray" title="Width of the light ray.">Ray width</label>
                            <input 
                                type="range" 
                                id="range-ray" 
                                step="0.1" 
                                min="1" 
                                max="15" 
                                value={rayWidth}
                                onChange={(e) => setRayWidth(parseFloat(e.target.value))}
                            />
                            <span id="value-ray">{rayWidth.toFixed(1)}</span>
                        </div>
                        <small>&#9432; Values used to calculate the refractive index</small>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default PrismComponent;