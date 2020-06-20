import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="All posts" />
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                const featuredImgFluid =
                    node.frontmatter.featuredImage?.childImageSharp?.fluid;
                const tags = node.frontmatter.tags.join(", ");

                return (
                    <article
                        key={node.fields.slug}
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
                                <Link
                                    style={{ boxShadow: `none` }}
                                    to={node.fields.slug}
                                >
                                    {title}
                                </Link>
                            </h2>
                        </header>
                        <section>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html:
                                        node.frontmatter.description ||
                                        node.excerpt,
                                }}
                            />
                            <p>
                                <Link
                                    style={{ boxShadow: `none` }}
                                    to={node.fields.slug}
                                >
                                    {(node.frontmatter.cta ||
                                        "Continue to recipe") + " "}
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
                                {node.frontmatter.date}
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
            })}
        </Layout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                        cta
                        tags
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
