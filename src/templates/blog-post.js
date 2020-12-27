import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Image from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

const BlogPostTemplate = ({ data, pageContext, location }) => {
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata.title;
    const { previous, next } = pageContext;
    const featuredImgFluid =
        post.frontmatter.featuredImage?.childImageSharp.fluid;
    const { author } = data.markdownRemark.frontmatter;
    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article>
                <header>
                    {featuredImgFluid && <Img fluid={featuredImgFluid} />}
                    <h1
                        style={{
                            marginTop: rhythm(1),
                            marginBottom: 0,
                        }}
                    >
                        {post.frontmatter.title}
                    </h1>
                    <p
                        style={{
                            ...scale(-1 / 5),
                            display: `block`,
                            marginBottom: rhythm(1),
                        }}
                    >
                        {post.frontmatter.date}
                    </p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr
                    style={{
                        marginBottom: rhythm(1),
                    }}
                />
                <footer>
                    <div
                        style={{
                            display: `flex`,
                            marginBottom: rhythm(2.5),
                        }}
                    >
                        <Image
                            fixed={author.photo.childImageSharp.fixed}
                            alt={author.id}
                            style={{
                                marginRight: rhythm(1 / 2),
                                marginBottom: 0,
                                minWidth: 50,
                                borderRadius: `100%`,
                            }}
                            imgStyle={{
                                borderRadius: `50%`,
                            }}
                        />
                        <p>
                            <strong>{author.id}</strong> {author.summary}
                        </p>
                    </div>
                </footer>
            </article>

            <nav>
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                author {
                    id
                    summary
                    photo {
                        childImageSharp {
                            fixed(width: 50, height: 50) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
                date(formatString: "MMMM DD, YYYY")
                description
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
`;
