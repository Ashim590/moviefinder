/* eslint-disable react/prop-types */
function Genre({ genres }) {
  return (
    <div id="genre">
      {genres
        ? genres.map((g) => {
            return <span key={g.id}>{g.name} </span>;
          })
        : null}
    </div>
  );
}

export default Genre;
