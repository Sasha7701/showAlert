# NYCDA React / Webpack Template

This template allows you to very quickly spin up a React application that's
equipped with Webpack for builds. It provides the following features:

* ES2017 and JSX using Babel
* Style components using SASS
* Asset resolving via file loader for JS and CSS
* Image compression using image-webpack-loader
* Hot module replacement with Webpack Dev Server
* Source maps in development and production
* A standard minified production build

## Getting Started

You must be on a Node version greater than 6 to use this. Once you've npm
installed, there are only two commands:

* `npm run start` - Runs the development server (Specify port with PORT, default 3000)
* `npm run build` - Builds the production version, which goes into `dist`

Once you start building things with this template, you may want to remove the
`.placeholder` files in `src/assets/fonts`, `src/assets/images`, and
`src/components` folders. They were added just to check in those directories.

## Project Structure

```
.
├── src                # Source code, including raw assets
│   ├── App.jsx        ### The top-level component for React
│   ├── App.scss       ### Any general, non-component styling done here
│   ├── assets         ### Static assets
│   │   ├── fonts      ##### Fonts(eot|otf|ttf|woff|woff2)
│   │   └── images     ##### Images (gif|png|jpe?g|svg|ico)
│   ├── components     ### Any shared components
│   ├── index.ejs      ### HTML template for the app
│   └── index.js       ### Webpack entry point / component mounting
├── dist               # Any built files are here, not checked in
└── webpack.config.js  # Webpack configuration for dev _and_ production
```

## License

This is available under the MIT License. Any distributions of it must also carry
this license.
