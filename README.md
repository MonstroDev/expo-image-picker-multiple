[![npm version](https://badge.fury.io/js/expo-image-picker-multiple.svg)](https://badge.fury.io/js/expo-image-picker-multiple)

# expo-image-picker-multiple

Multiple image selecting package for Expo SDK (React Native) using [MediaLibrary](https://docs.expo.io/versions/latest/sdk/media-library).

## Usage
1. Install the repository
    ```bash
    $ npm install --save expo-image-picker-multiple
    ```
    or
    ```bash
    $ yarn add expo-image-picker-multiple
    ```
2. Add an import to the top of your file
    ```js
    import { ImageBrowser } from 'expo-image-picker-multiple';
    ```
3. Declare the component in the render method.
    ```js
    <ImageBrowser
      max={4}
      onChange={(callback) => {
        
      }}
      callback={(num, onSubmit) => {

      }}
    />
    ```
### Props:   
- `loadCount`: by default `50`
- `emptyStayComponent`: by default `Empty =(` text
- `preloaderComponent`: by default `ActivityIndicator` (loader)