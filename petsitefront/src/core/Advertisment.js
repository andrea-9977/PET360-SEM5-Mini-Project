import { Carousel } from 'react-carousel-minimal';
import React from 'react';
function Slideshow() {
 const data = [
    {
      image: "https://www.marketing91.com/wp-content/uploads/2017/11/SWOT-analysis-of-Pedigree.jpg",
      //caption: "Advertisment"
    },
    {
      image: "https://www.whiskas.me/areas/en/assets/img/products/pListKitten-xs.jpg",
      //caption: "Advertisment"
    },
    {
    //   image: "https://i.pinimg.com/originals/4b/e8/98/4be898e6e0abf26d8a7700d6004b06e6.jpg",
      image:"./images/petimage.png",
      //caption: "Advertisment"
    },

  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="">
      <div style={{ textAlign: "center" }}>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={2000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Slideshow;