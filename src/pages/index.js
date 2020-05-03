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

                return (
                    <article
                        key={node.fields.slug}
                        style={{
                            marginBottom: rhythm(3 / 2),
                        }}
                    >
                        <header>
                            <h2
                                style={{
                                    color: "inherit",
                                    marginBottom: 0,
                                    fontFamily: `Work Sans, sans-serif`,
                                }}
                            >
                                <Link
                                    style={{ boxShadow: `none` }}
                                    to={node.fields.slug}
                                >
                                    {title}
                                </Link>
                            </h2>
                            <small
                                style={{
                                    fontFamily: `Work Sans, sans-serif`,
                                }}
                            >
                                {node.frontmatter.date}
                            </small>
                            {featuredImgFluid && (
                                <Img
                                    fluid={featuredImgFluid}
                                    style={{
                                        marginTop: rhythm(1),
                                        marginBottom: rhythm(1),
                                    }}
                                />
                            )}
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
                                    {node.frontmatter.cta ||
                                        "Continue to recipe"}
                                </Link>
                            </p>
                        </section>
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
