import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";

const BlogPost = ({ post }) => {
    const title = post.frontmatter.title || post.fields.slug;
    const featuredImgFluid =
        post.frontmatter.featuredImage?.childImageSharp?.fluid;
    const tags = post.frontmatter.tags?.join(", ");
    return (
        <article
            key={post.fields.slug}
            className="card"
            style={{
                marginBottom: rhythm(2),
            }}
        >
            <header>
                {featuredImgFluid && (
                    <Img
                        fluid={featuredImgFluid}
                        style={{
                            marginTop: rhythm(1 / 2),
                            marginBottom: rhythm(1 / 2),
                        }}
                    />
                )}
                <h2
                    style={{
                        color: "inherit",
                        marginTop: rhythm(1),
                        marginBottom: rhythm(2 / 3),
                    }}
                >
                    <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                        {title}
                    </Link>
                </h2>
            </header>
            <section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                    }}
                />
                <p>
                    <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                        {(post.frontmatter.cta || "Continue to recipe") + " "}
                        <span>»</span>
                    </Link>
                </p>
            </section>
            <footer>
                <span
                    style={{
                        fontSize: "0.9rem",
                        marginRight: rhythm(1 / 4),
                    }}
                >
                    {post.frontmatter.date}
                </span>
                <span
                    style={{
                        fontSize: "0.9rem",
                    }}
                >
                    {tags}
                </span>
            </footer>
        </article>
    );
};

export default BlogPost;
