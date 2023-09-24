export type SpotlightOptions = {
    // The color of the background, default 00000070
    backgroundColor?: HTMLElement['style']['color'];

    // Number of milliseconds it takes for the spotlight to appear/change, set 0 for no transition, default 250
    transitionDelay?: number;

    // The z-index of the background, default 999999
    zIndex?: HTMLElement['style']['zIndex'];
};

const ELEMENT_ID = 'spotlight-background-element';
const getBgElement = () => document.querySelector(`#${ELEMENT_ID}`) as HTMLElement;

// Sets spotlight on an element
const set = (el: HTMLElement, options: SpotlightOptions = {}) => {
    const {
        backgroundColor = '#00000070',
        zIndex = '999999',
        transitionDelay = 250,
    } = options;

    let bgEl = getBgElement();
    if (!bgEl) {
        bgEl = document.createElement('div');
        bgEl.id = ELEMENT_ID;
        bgEl.style.position = 'absolute';
        bgEl.style.zIndex = zIndex;
        bgEl.style.boxShadow = `0 0 0 max(100vw, 100vh) ${backgroundColor}`;
        if (transitionDelay > 0) {
            bgEl.style.transition = `all ${transitionDelay}ms ease 0s`;
        }
        bgEl.style.pointerEvents = 'none';
        document.body.appendChild(bgEl);
    }

    const rect = el.getBoundingClientRect();
    bgEl.style.inset = `${rect.top}px ${rect.right}px ${rect.bottom}px ${rect.left}px`;
    bgEl.style.width = rect.width + 'px';
    bgEl.style.height = rect.height + 'px';
}

//  Clear spotlight
const clear = () => getBgElement()?.remove();

export default {
    set,
    clear,
}
