import gray from "gray-percentage";
import Typography from "typography";
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants";

const typography = new Typography({
    baseFontSize: "16px",
    baseLineHeight: 1.75,
    scaleRatio: 5 / 2,
    headerFontFamily: ["Work Sans", "sans-serif"],
    headerWeight: 400,
    bodyColor: "hsla(0,0%,0%,0.9)",
    bodyFontFamily: ["Georgia", "serif"],
    bodyWeight: 400,
    overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
        h1: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
        },
        p: {
            marginBottom: rhythm(1),
        },
        blockquote: {
            ...scale(1 / 5),
            color: gray(41),
            fontStyle: "italic",
            paddingLeft: rhythm(13 / 16),
            marginLeft: rhythm(-1),
            borderLeft: `${rhythm(3 / 16)} solid ${gray(10)}`,
        },
        "blockquote > :last-child": {
            marginBottom: 0,
        },
        "blockquote cite": {
            ...adjustFontSizeTo(options.baseFontSize),
            color: options.bodyColor,
            fontWeight: options.bodyWeight,
        },
        "blockquote cite:before": {
            content: '"— "',
        },
        ul: {
            listStyle: "disc",
        },
        "ul > li": {
            marginBottom: rhythm(1 / 4),
        },
        "ul,ol": {
            marginLeft: rhythm(3 / 4),
        },
        "ol > li": {
            marginBottom: rhythm(2 / 3),
        },
        [MOBILE_MEDIA_QUERY]: {
            "ul,ol": {
                marginLeft: rhythm(1),
            },
            blockquote: {
                marginLeft: rhythm(-3 / 4),
                marginRight: 0,
                paddingLeft: rhythm(9 / 16),
            },
        },
        a: {
            boxShadow: "0 1px 0 0 currentColor",
            color: "#0565ad",
            textDecoration: "none",
        },
        "a:hover,a:active": {
            boxShadow: "none",
        },
        "mark,ins": {
            background: "#0565ad",
            color: "white",
            padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
            textDecoration: "none",
        },
    }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
    typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
