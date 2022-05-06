function Home(props) {
  return (
    <div>
      <div className="bg-light">This is homepage.</div>
      <button onClick={() => props.callback(false)}>Logout</button>
    </div>);
}

export default Home;
