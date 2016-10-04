import React, { PropTypes } from 'react';

function Thumbnail(props) {
  const { photo: { thumbnailUrl }, onSelect } = props;
  return (
    <div>
      <img className="tbn" onClick={onSelect} src={thumbnailUrl}></img>
    </div>
  );
}

Thumbnail.propTypes = {
  onSelect: PropTypes.func,
  photo: PropTypes.shape({
    albumId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    description: PropTypes.string
  })
};

export default Thumbnail;
