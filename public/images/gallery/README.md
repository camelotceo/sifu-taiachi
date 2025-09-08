# Photo Gallery Images

This folder contains images for the photo gallery section on the homepage.

## How to Add Photos

**Super Simple!** Just add any image files to this folder and they will automatically appear in the gallery.

### Current Images
The gallery is currently configured to load these images:
- `download.webp` and variations (download (1).webp, download (2).webp, etc.)
- `rs=w_1160,h_1547.webp` and other resized versions
- `rs=w_2320,h_1740.webp` and variations
- `rs=w_984,h_656.webp`
- `cr=t_0,w_100.webp`

### Supported File Formats
- JPG/JPEG
- PNG  
- WebP

### Adding New Images
To add new images, simply:
1. Add your image files to this folder
2. Update the `knownImages` array in `components/photo-gallery.tsx` to include your new image names
3. The gallery will automatically load and display them

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 800x600 pixels or similar aspect ratio
- **File Size**: Keep under 500KB for optimal loading
- **Quality**: High quality images that showcase Dr. Beauvais's Tai Chi instruction

## Gallery Features

- **Automatic Detection**: Images are loaded automatically when you add them
- **Horizontal Scrolling**: Smooth scrolling gallery
- **Click to Expand**: Click any image to view full-size in modal
- **Responsive Design**: Works perfectly on all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Error Handling**: Graceful fallback for missing images
- **Flexible Naming**: No strict naming conventions required

## Example Usage

1. Download photos from: https://taichiwithdrbeauvais.com/gallery
2. Save them as:
   - `image-1.jpg`
   - `image-2.jpg` 
   - `image-3.jpg`
   - etc.
3. They will automatically appear in the gallery!

**That's it!** The gallery will automatically detect and display your images in the order they appear.
