# ThreeUI adaptation

RibbonFieldBackground and ribbonFieldShaders are adapted from MengTo/threeui's
MIT-licensed Ribbon Field component. Copyright (c) 2026 Meng To; see LICENSE.
Source: https://github.com/MengTo/threeui/tree/main/src/shaders/ribbon-field
Original shader blob: 3c1c779dac32bd5532643c446d7fc0e8205d8726.

Ajwaa changes: ivory/champagne palette, continuous silk-like ribbons, limited
resolution and 30fps rendering, graceful WebGL failure, visibility lifecycle,
and opt-in mounting only on desktop with no reduced-motion/data-saving preference.
Only this component's source is included; no catalog assets, iframe runtimes,
global ThreeUI styles, or additional dependency packages are required.
