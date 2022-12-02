import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ data, returnImage }) => {
  return (
    <>
      {data.map(item => (
        <li className={css.galleryItem} key={item.id}>
          <img
            className={css.galleryItem_image}
            src={item.webformatURL}
            alt={item.tags}
            large={item.largeImageURL}
            onClick={returnImage}
          />
        </li>
      ))}
    </>
  );
};

/* <img
      src="https://poster.keepcalmandposters.com/default/5773497_keep_calm_there_is_nothing_here.png"
      alt="nothing here"
      className={css.nothing}
    ></img>*/
