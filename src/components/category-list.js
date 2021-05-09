import React from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "gatsby";
import Img from "gatsby-image";

const CategoryList = ({ posts }) => {
    return posts.map(( post ) => {
        const title = post.node.frontmatter.title;
        const slug = post.node.fields.slug;
        const featuredImgFixed = post.node.frontmatter.featuredImage?.childImageSharp?.fixed;
        return featuredImgFixed ? <div key={title} style={{ 
            height: 130,
            width: 130,
            marginRight: 10,
            padding: 5,
            backgroundColor: '#fefcf7',
            border: '1px solid #dad5cc',
            borderRadius: 2
        }}>
            <Link to={slug}>
                <Img fixed={featuredImgFixed} />
            </Link>
        </div> : null;
    });
};

CategoryList.propTypes = {
    posts: PropTypes.any,
};

export default CategoryList;
