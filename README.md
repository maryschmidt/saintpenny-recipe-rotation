<h1 align="center">
  Saint Penny Recipe Rotation
</h1>

## 🚀 Quick start

0.  **Environment.**

This project relies on node.js and yarn. To install these, we recommend using [homebrew](https://formulae.brew.sh/formula/node).

```shell
brew update
brew install node yarn
nvm install 10.16
nvm use
```

1.  **Start developing.**

Navigate into your new site’s directory and start it up.

```shell
git clone git@github.com:maryschmidt/saintpenny-recipe-rotation.git
cd saintpenny-recipe-rotation/
yarn
gatsby develop
```

2.  **Open the source code and start editing!**

Your site is now running at `http://localhost:8000`!

_Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## How to: Create your first post

Welcome! Thanks for sharing your recipes 🙌

First, You'll need to add an image to `src/content/assets` to use as an avatar as well as a little information about yourself to the authors file in order for your bio to show up at the bottom of your new post. Something like the following:

**`src/data/author.yaml`**

```yaml
- id: Mary Schmidt
  summary: aims to bring sunshine and order to the world around her with her cooking.
  photo: "../../content/assets/profile-photo-mary.JPG"
```

Make sure the `photo` path matches the path to the photo you added!

Next, create the post. Create a new folder `src/content/blog/my-post-name` and inside that folder, add a markdown file `index.md`. The post should have _frontmatter_ structured like so:

```markdown
---
title: German Potato Salad
author: Mary Schmidt
date: "2020-05-01T23:49:52.824Z"
description: Quick, easy, and great with just about everything, from hamburgers to fried pork cutlets. Need I say more? Okay, fine... it's also full of bacon.
featuredImage: "potato-salad.JPG"
cta: "Show me the bacon"
tags: ["Quick", "Bacon", "Side"]
---
```

Notes:

-   To populate the `date` field, open the developer console in your browser and type `new Date().toISOString()`
-   The `description` and `cta` are optional
-   Posts should all have at least one image
-   Images should reside in the folder for the post, next to the `index.md` file to which they belong.
