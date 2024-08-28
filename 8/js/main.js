import {getPhotos} from './data.js';
import { initGallery } from './gallery.js';

const photos = getPhotos();

initGallery(photos);
