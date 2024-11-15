import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images: string[] = [
    'https://cdn.pixabay.com/photo/2022/05/04/11/49/dried-flowers-7173793_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/01/24/13/14/boat-8529554_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/02/07/07/21/road-7773395_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/06/20/11/09/cat-5320572_1280.jpg',
  ];

  currentIndex: number = 0;

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  openFullscreen(): void {
    const img = document.getElementById('gallery-image') as HTMLElement;
    if (img) {
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else { // @ts-ignore
        if (img.webkitRequestFullscreen) { // Safari
          // @ts-ignore
          img.webkitRequestFullscreen();
        } else { // @ts-ignore
          if (img.msRequestFullscreen) { // IE11
            // @ts-ignore
            img.msRequestFullscreen();
          }
        }
      }
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  exitFullscreen(event: Event) {
    if (!document.fullscreenElement) {
      // Handle exit from fullscreen if needed
      console.log('Exited fullscreen mode');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  onSliderChange(value: number): void {
    this.currentIndex = value;
  }
}
