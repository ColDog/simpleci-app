export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="container" className="effect mainnav-lg">
        <header id="navbar">
          <Navbar />
        </header>
        <div className="boxed">
          <div id="content-container">
            <Sidebar items={[
              {icon: 'building', link: () => { return "/accounts/" + AccountStore.current }},
              {icon: 'plug', link: () => { return "/accounts/" + AccountStore.current + "/configs" }},
            ]} />
            <div id="main">
              {this.props.main}
            </div>
          </div>
        </div>
      </div>
    )
  }
}