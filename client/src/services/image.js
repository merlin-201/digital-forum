const BASE_IMG_URL = "http://localhost:5000/uploads"
export const getImage = (imgName) => `${BASE_IMG_URL}/${imgName}`;

const BASE_AD_BANNER_URL = "http://localhost:5000/ad-banners";
export const getAdBanner = (imgName) => `${BASE_AD_BANNER_URL}/${imgName}`

