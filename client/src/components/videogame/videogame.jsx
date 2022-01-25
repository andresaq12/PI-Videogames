const Videogame = ({ name, image, rating }) => {
  return (
    <div>
      <h3>{name}</h3>
      <h4>{rating}</h4>
      <img src={image} alt="imagen" width="200" height="150" />
    </div>
  )
}

export default Videogame