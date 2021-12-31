[![npm version](https://badge.fury.io/js/expo-image-picker-multiple.svg)](https://badge.fury.io/js/expo-image-picker-multiple)

# expo-image-picker-multiple

Multiple image (video, etc.) selecting package for Expo SDK (React Native) using [MediaLibrary](https://docs.expo.io/versions/latest/sdk/media-library) and [Permissions](https://docs.expo.io/versions/latest/sdk/permissions).

### [Snack full demo](https://snack.expo.io/@monstrodev/expo-image-picker-multiple-full-example) with navbar and compression
![Demo](https://media.giphy.com/media/LP0lZs1dvVCsTk59Bw/giphy.gif)

## Features
- Selects multiple images
- Changes orientation (4 in a row for vertical and 7 for horizontal orientations)
- Displays the selected image number
- Permission requests
- Customization
- Sorting from new to old

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
      onChange={(num, onSubmit)  => {
        
      }}
      callback={(callback) => {

      }}
    />
    ```
### Props:   
- `max`: maximum number of photos
- `loadCount`: by default `50`
- `loadCompleteMetadata`: Whether to load [extra fields](https://docs.expo.io/versions/latest/sdk/media-library/#asset) like location. Loading all of the information will reduce performance. by default `false`
- `emptyStayComponent`: by default `null`
- `noCameraPermissionComponent`: by default `null`
- `preloaderComponent`: by default `ActivityIndicator` (loader)
- `renderSelectedComponent`: one-parameter (selected number) function is expected to return the component for the icon/text over the selected picture
- `mediaType`: photo by default ([mediaType](https://docs.expo.io/versions/latest/sdk/media-library/#expomedialibrarymediatype))