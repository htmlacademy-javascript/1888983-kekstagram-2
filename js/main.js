import {getPhotos} from './data.js';
import { initGallery } from './gallery.js';
import './form.js';

const photos = getPhotos();

initGallery(photos);
