import React from "react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";

const Layout = ({ location, title, children }) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
        header = (
            <h1
                style={{
                    marginBottom: rhythm(1.5),
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        color: `inherit`,
                    }}
                    to={`/`}
                >
                    {title}
                </Link>
            </h1>
        );
    } else {
        header = (
            <h3
                style={{
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        color: `inherit`,
                    }}
                    to={`/`}
                >
                    {title}
                </Link>
            </h3>
        );
    }
    return (
        <div style={{ backgroundColor: "#FEF6E7" }}>
            <div
                style={{
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(24),
                    padding: `${rhythm(1)} ${rhythm(1 / 2)} ${rhythm(1 / 2)}`,
                }}
            >
                <header>{header}</header>
                <main>{children}</main>
                <footer>© {new Date().getFullYear()}</footer>
            </div>
        </div>
    );
};

export default Layout;
