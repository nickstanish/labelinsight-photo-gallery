import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Thumbnail(props) {
  const { photo: { thumbnailUrl, id }, onSelect } = props;
  return (
    <div>
      <Link to={`/${id}`}>
        <img className="tbn" onClick={onSelect} src={thumbnailUrl}></img>
      </Link>
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
