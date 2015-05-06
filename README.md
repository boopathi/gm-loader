# gm-loader

A image loader with some extras. 

Provides image metadata from [GraphicsMagick](https://github.com/aheckmann/gm)

## Installation and usage

Make sure you have [ImageMagick](http://www.imagemagick.org/) and [GraphicsMagick](http://www.graphicsmagick.org/) installed. On OSX, you can just do 

```sh
brew install imagemagick
brew install graphicsmagick
```

[Documentation: Using Loaders](http://webpack.github.io/docs/using-loaders.html)

Install the loader, and set `config.output.imageFilename`

```js
// webpack.config.js
module.exports = {
    output: {
        publicPath: 'public/',
        imageFilename: '[name]-[hash].[ext]'
    },
    module: {
        loaders: [
            {
                test: /\.(jpg|jpeg|png)/,
                loader: 'gm-loader'
            }
        ]
    }
};
```

## Options

#### `config.output.imageFilename`

You can use the placeholders specified here https://github.com/webpack/loader-utils#interpolatename

#### `config.output.publicPath`

https://github.com/webpack/docs/wiki/configuration#outputpublicpath

## Output

The following metadata are available after importing the image

Example:

```js
var foo = require('./foo.png');

// foo.src => public/foo-8dh929db293898d.png

// foo.width => 400

// foo.height => 200

// foo.format => 'PNG'

// foo.geometry => '400x200'

// foo.depth => 8

// foo.filesize => '4.8Ki'

```
