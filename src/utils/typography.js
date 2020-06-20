import gray from "gray-percentage";
import Typography from "typography";
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants";

const typography = new Typography({
    baseFontSize: "16px",
    baseLineHeight: 1.75,
    scaleRatio: 5 / 2,
    headerColor: "#D90A0A",
    headerFontFamily: ["Noto Serif", "serif"],
    headerWeight: 400,
    bodyColor: "#4A2F03",
    bodyFontFamily: ["Noto Sans", "sans-serif"],
    bodyWeight: 400,
    overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
        h1: {},
        p: {
            marginBottom: rhythm(1),
        },
        "p:last-child": {
            marginBottom: rhythm(1 / 4),
        },
        strong: {
            fontWeight: 500,
        },
        "article > footer > span:first-child::after": {
            display: "inline-block",
            content: "''",
            marginLeft: rhythm(1 / 4),
            verticalAlign: "middle",
            width: "0.25rem",
            height: "0.25rem",
            borderRadius: "0.25rem",
            backgroundColor: "#927e61",
        },
        blockquote: {
            ...scale(1 / 5),
            color: gray(40),
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
            marginBottom: rhythm(1 / 8),
        },
        "ul,ol": {
            marginLeft: rhythm(3 / 4),
        },
        "ol > li": {
            marginBottom: rhythm(1 / 4),
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
            color: "#D90A0A",
            textDecoration: "none",
        },
        "mark,ins": {
            background: "#D90A0A",
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
