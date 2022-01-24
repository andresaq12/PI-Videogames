const Videogame = ({ name, image }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="imagen" width="200" height="150" />
    </div>
  )
}

export default Videogame