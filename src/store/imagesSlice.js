import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const IMAGES_SLICE = 'IMAGES';

const initialState = {
  images: [],
  activeImage: null
};

export const imagesSlice = createSlice({
  name: IMAGES_SLICE,
  initialState,
  reducers: {
    updateImagesList: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    setActiveImage: (state, action) => {
      const activeElement = _.find(current(state.images), {url:action.payload});
      state.activeImage = activeElement;
    },
    updateImage:(state, action) => {
      state.images = state.images.map((image) => ((image.url === action.payload.url) ? { ...image, ...action.payload } : image));
    },
    updateActiveImage: (state, action) => { 
      state.activeImage = action.payload;
    },
    addImages: () => {},
  },
});

export const {
  addImages,
  updateImagesList,
  setActiveImage,
  updateImage,
  updateActiveImage,
} = imagesSlice.actions;

export const imagesSliceSelector = (state) => state.images;

export default imagesSlice.reducer;
