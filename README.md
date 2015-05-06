# gm-loader

An image loader with some extras. 

Provides image metadata from [GraphicsMagick](https://github.com/aheckmann/gm)

## Installation and usage

Make sure you have [ImageMagick](http://www.imagemagick.org/) and [GraphicsMagick](http://www.graphicsmagick.org/) installed. On OSX, you can just do 

```sh
brew install imagemagick
brew install graphicsmagick
```

[Documentation: Using Loaders](http://webpack.github.io/docs/using-loaders.html)

```js
var image = require('gm!./image.png');
// => emits image.png as file in the output directory
// => returns an object with some useful params about the image
```

## Options

#### `config.output.imageFilename`

You can use the placeholders specified here -

* `[ext]` the extension of the resource
* `[name]` the basename of the resource
* `[path]` the path of the resource relative to the `context` query parameter or option.
* `[hash]` the hash of `options.content` (Buffer) (by default it's the hex digest of the md5 hash)
* `[<hashType>:hash:<digestType>:<length>]` optionally one can configure
  * other `hashType`s, i. e. `sha1`, `md5`, `sha256`, `sha512`
  * other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
  * and `length` the length in chars
* `[N]` the N-th match obtained from matching the current file name against `options.regExp`

Source: https://github.com/webpack/loader-utils#interpolatename

#### `config.output.publicPath`

The path/URL that gets prepended to the imageFilename -
https://github.com/webpack/docs/wiki/configuration#outputpublicpath

## Output

The following metadata are available after importing the image

+ src: *string*
+ width: *number*
+ height: *number*
+ format: *string*
+ geometry: *string*
+ depth: *number*
+ filesize: *string*

## Example:

#### webpack.config.js

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

#### some_module.js

```js
var foo = require('./foo.png');

// foo.src      => public/foo-8dh929db293898d.png

// foo.width    => 400

// foo.height   => 200

// foo.format   => 'PNG'

// foo.geometry => '400x200'

// foo.depth    => 8

// foo.filesize => '4.8Ki'

```
