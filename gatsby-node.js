const path = require("path");
const kebabCase = require("lodash/kebabCase");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const blogPost = path.resolve("src/templates/blog-post.js");
    const categoryTemplate = path.resolve("src/templates/categories.js");

    const result = await graphql(
        `
            {
                postsRemark: allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 2000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                categories
                            }
                        }
                    }
                }
                categoriesGroup: allMarkdownRemark(limit: 2000) {
                    group(field: frontmatter___categories) {
                        fieldValue
                    }
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const posts = result.data.postsRemark.edges;

    // Create blog posts pages.
    posts.forEach((post, index) => {
        const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
                slug: post.node.fields.slug,
                previous,
                next,
            },
        });
    });

    // Extract category data from query
    const categories = result.data.categoriesGroup.group;

    // Make category pages
    categories.forEach((category) => {
        createPage({
            path: `/categories/${kebabCase(category.fieldValue)}/`,
            component: categoryTemplate,
            context: {
                category: category.fieldValue,
            },
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      cta: String
      tags: [String!]!
    }
  `;
    createTypes(typeDefs);
};
