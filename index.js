import React, { Component } from 'react';
import {
  View,
  requireNativeComponent,
  ViewPropTypes
} from 'react-native';
import { string, number, array, shape, arrayOf, bool } from 'prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class ImageSequence extends Component {
  render() {
    let normalized = this.props.images.map(resolveAssetSource);

    // reorder elements if start-index is different from 0 (beginning)
    if (this.props.startFrameIndex !== 0) {
      normalized = [...normalized.slice(this.props.startFrameIndex), ...normalized.slice(0, this.props.startFrameIndex)];
    }

    return (
      <RCTImageSequence
        {...this.props}
        images={normalized} />
    );
  }
}

ImageSequence.defaultProps = {
  startFrameIndex: 0,
  framesPerSecond: 24,
  started: false,
};

ImageSequence.propTypes = {
  startFrameIndex: number,
  images: array.isRequired,
  framesPerSecond: number,
  started: bool
};

const RCTImageSequence = requireNativeComponent('RCTImageSequence', {
  propTypes: {
    ...ViewPropTypes,
    images: arrayOf(shape({
      uri: string.isRequired
    })).isRequired,
    framesPerSecond: number,
    started: bool
  },
});

export default ImageSequence;
