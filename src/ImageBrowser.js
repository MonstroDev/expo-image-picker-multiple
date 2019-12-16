import React from 'react';
import {
  StyleSheet,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import ImageTile from './ImageTile'

const {width} = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
  state = {
    photos: [],
    selected: {},
    after: null,
    has_next_page: true
  }

  componentDidMount() {
    this.getPhotos()
  }

  selectImage = (index) => {
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({selected: newSelected});
    this.props.onChange(Object.keys(newSelected).length, () => this.prepareCallback());
  }

  getPhotos = () => {
    let params = {first: 50, assetType: 'Photos'};
    if (Platform.OS === 'ios') params.groupTypes = 'All'; // undocumented requirement or results will be empty
    if (this.state.after) params.after = this.state.after;
    if (!this.state.has_next_page) return;
    CameraRoll
      .getPhotos(params)
      .then(this.processPhotos)
  }

  processPhotos = (r) => {
    if (this.state.after === r.page_info.end_cursor) return;
    const uris = r.edges.map(i => i.node).map(i => i.image).map(i => i.uri)
    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    });
  }

  getItemLayout = (data, index) => {
    const length = width / 4;
    return {length, offset: length * index, index}
  }

  prepareCallback() {
    const {selected, photos} = this.state;
    const selectedPhotos = photos.filter((item, index) => selected[index]);
    const files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, {md5: true}))
    const callbackResult = Promise
      .all(files)
      .then(imageData => {
        return imageData.map((data, i) => {
          return {file: selectedPhotos[i], ...data};
        })
      })
    this.props.callback(callbackResult)
  }

  renderImageTile = ({item, index}) => {
    const selected = this.state.selected[index] ? true : false;
    return (
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    )
  }

  renderImages() {
    return (
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => {
          this.getPhotos()
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<ActivityIndicator size="large"/>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
})
