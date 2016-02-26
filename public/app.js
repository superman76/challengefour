{/* 
Need to ininitialize the state of products 
Need to set the state of products
*/}

var ProductTable = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      products: []
    }
  },
  loadProductsFromServer: function() {
    var anything = this;
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).done(function(data){
        anything.setState({
          products: data
        })
    })
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  render: function() {
    return (
      <div>
        <ProductList superProducts={this.state.products} />
      </div>
      )
  }
});

var  ProductList = React.createClass({
  render: function() {

    var productRows = this.props.superProducts.filter(function(item){
      return item.inStock;
    }).map(function(item){
      return (
            <tr>
              <td> { item.name } </td>
              <td> { item.cost } </td>
              <td> { item.inStock.toString() } </td>
            </tr>
        )
    }); 
        return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>product</th>
                <th>cost </th>
                <th> inStock </th>
              </tr>
            </thead>
            <tbody>

            { productRows }
            
            </tbody>
          </table>
        </div>
      )
  }
});

React.render(<ProductTable url="api/products" />, document.getElementById('react-container'));
