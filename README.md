# THE-CASE-FILES

`Empowering Minds, Exposing Truths: Navigating College Life Safely`

[Model Link](https://app.eraser.io/workspace/mVCQx3sXs1Q8AInWo81T?origin=share)

# Welcome to CredLock 🎓

CredLock is a thriving haven for college students, fostering a supportive community that nurtures personal growth and academic excellence. Our mission is deeply rooted in empowering students through shared experiences and valuable educational resources.

## About CredLock 🎓

At CredLock, we believe in creating a vibrant community where students are active contributors to each other's learning journey. Here's what sets us apart:

### Basic Features

- **User Registration and Login**: Begin your journey by creating a personal profile on CredLock.
- **Blog Creation**: Unlock your creativity with intuitive tools to craft and publish your blog posts.
- **Content Editing**: Customize your content with ease using text formatting options and image upload functionality.
- **Comment Section**: Foster discussion and interaction with dedicated comment sections for each blog post.
- **Search Functionality**: Navigate the wealth of content with ease using our search functionality.
- **Following System**: Build connections and curate your personalized feed by following other bloggers.

### Advanced Features

- **Content Categorization**: Organize your blogs under specific themes for enhanced organization and discovery.
- **Analytics Tools**: Track the performance of your blog with insights into views, comments, and user demographics.
- **Social Media Integration**: Share your blog posts effortlessly across popular platforms, amplifying your reach.

## Join CredLock

Join us at CredLock and embark on a shared adventure of knowledge, connection, and growth. Together, let's make learning a collaborative and enriching experience.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a Cloudinary account and obtain your `API_KEY API_SECRET` and Create FOLDER_NAME by you won - [Cloudinary](https://cloudinary.com/)

- Get `CLIENT_ID CLIENT_SECRET REFRESH_TOKEN`
  from [Google Developer Console](https://console.cloud.google.com/welcome?project=eateasy-405214)

### Env Variables

create the `.env` file inside server directory and add the variables that has been mentioned in `.env.sample`

Change the JWT_SECRET to whatever you want.

### Install Dependencies (frontend & backend)

```
cd server
npm install
cd ..
cd client
npm install
```

### Run

```

# Run backend (:4000) & frontend (:3000)
cd server
npm run server

# Run frontend
npm run start
```

## Build & Deploy

```
# Create frontend prod build
npm run build
```
