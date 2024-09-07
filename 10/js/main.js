import {getPhotos} from './data.js';
import { initGallery } from './gallery.js';
import './form.js';
import './slider.js';

const photos = getPhotos();

initGallery(photos);
