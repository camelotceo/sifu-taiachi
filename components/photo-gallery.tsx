"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Simple gallery images - just load them directly (reordered with last images first)
  const galleryImages = [
    {
      id: '22',
      src: '/images/gallery/cr=t_0,w_100.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 22'
    },
    {
      id: '21',
      src: '/images/gallery/rs=w_984,h_656.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 21'
    },
    {
      id: '20',
      src: '/images/gallery/rs=w_2320,h_1740 (4).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 20'
    },
    {
      id: '19',
      src: '/images/gallery/rs=w_2320,h_1740 (3).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 19'
    },
    {
      id: '18',
      src: '/images/gallery/rs=w_2320,h_1740 (2).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 18'
    },
    {
      id: '17',
      src: '/images/gallery/rs=w_2320,h_1740 (1).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 17'
    },
    {
      id: '16',
      src: '/images/gallery/rs=w_2320,h_1740.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 16'
    },
    {
      id: '15',
      src: '/images/gallery/rs=w_1160,h_979 (5).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 15'
    },
    {
      id: '14',
      src: '/images/gallery/rs=w_1160,h_979 (4).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 14'
    },
    {
      id: '13',
      src: '/images/gallery/rs=w_1160,h_979 (3).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 13'
    },
    {
      id: '12',
      src: '/images/gallery/rs=w_1160,h_979 (2).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 12'
    },
    {
      id: '11',
      src: '/images/gallery/rs=w_1160,h_979 (1).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 11'
    },
    {
      id: '10',
      src: '/images/gallery/rs=w_1160,h_979.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 10'
    },
    {
      id: '9',
      src: '/images/gallery/rs=w_1160,h_657.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 9'
    },
    {
      id: '8',
      src: '/images/gallery/rs=w_1160,h_1547.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 8'
    },
    {
      id: '7',
      src: '/images/gallery/download (6).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 7'
    },
    {
      id: '6',
      src: '/images/gallery/download (5).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 6'
    },
    {
      id: '5',
      src: '/images/gallery/download (4).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 5'
    },
    {
      id: '4',
      src: '/images/gallery/download (3).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 4'
    },
    {
      id: '3',
      src: '/images/gallery/download (2).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 3'
    },
    {
      id: '2',
      src: '/images/gallery/download (1).webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 2'
    },
    {
      id: '1',
      src: '/images/gallery/download.webp',
      alt: 'Dr. Beauvais Tai Chi session',
      caption: 'Tai Chi Session 1'
    }
  ]

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    const startScrollLeft = containerRef.current?.scrollLeft || 0

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const currentX = touch.clientX
      const diffX = startX - currentX
      if (containerRef.current) {
        containerRef.current.scrollLeft = startScrollLeft + diffX
      }
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollLeft()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        scrollRight()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])


  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Photo Gallery
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Moments of Transformation
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See Dr. Beauvais in action, teaching Tai Chi and helping students discover the power of mindful movement.
            </p>
          </div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={containerRef}
              className="gallery-container flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-16" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onTouchStart={handleTouchStart}
            >
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="flex-shrink-0 w-80 h-64 relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => openModal(image.src)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for full-size image viewing */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl"
              style={{ maxHeight: '80vh', width: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
