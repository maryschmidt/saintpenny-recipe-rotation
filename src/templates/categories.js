import React from "react";
import PropTypes from "prop-types";

// Components
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import BlogPost from '../components/blog-post'
import SEO from "../components/seo";

const Categories = ({ pageContext, data, location }) => {
    const { category } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const siteTitle = data.site.siteMetadata.title;
    const tagHeader = `${category} (${totalCount})`;

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title={`Posts for ${category} category`} />
            <h1>{tagHeader}</h1>
                {edges.map(({ node }) => {
                    return (
                        <BlogPost post={node} />
                    );
                })}
            <Link to="/categories">All categories</Link>
        </Layout>
    );
};

Categories.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }),
        }),
    }),
};

export default Categories;

export const pageQuery = graphql`
    query($category: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { categories: { in: [$category] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
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
