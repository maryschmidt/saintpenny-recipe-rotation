import React from "react";
import PropTypes from "prop-types";
import CategoryList from "../components/category-list.js";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const CategoriesPage = ({
    data: {
        allMarkdownRemark: { group, edges },
        site: {
            siteMetadata: { title },
        },
    },
    location,
}) => (
    <Layout location={location} title={title}>
        <SEO title="Categories" />
        <div>
            <h1>Categories</h1>
            {group.map((category) => {
                const posts = edges.filter(edge => edge.node.frontmatter.categories?.includes(category.fieldValue));
                return (
                    <div key={category.fieldValue} style={{ marginBottom: 10 }}>
                        <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                            {category.fieldValue} ({category.totalCount})
                        </Link>
                        {posts && <div style={{ display: 'flex' }}>
                            <CategoryList posts={posts} />
                        </div>}
                    </div>
                );
            })}
        </div>
    </Layout>
);

CategoriesPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            group: PropTypes.arrayOf(
                PropTypes.shape({
                    fieldValue: PropTypes.string.isRequired,
                    totalCount: PropTypes.number.isRequired,
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

export default CategoriesPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featuredImage {
                            childImageSharp {
                                fixed(width: 120, height: 120) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                        categories
                    }
                }
            }
        }
    }
`;
