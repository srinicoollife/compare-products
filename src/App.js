import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import './App.css';
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Product from "./components/Product";
import ComparisonTable from "./components/ComparisonTable";
import EditAttributeModal from "./components/EditAttributeModal";

// data
import {products_data} from "./data/products";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    products: [],
    compareProducts_count: 0,
    compare_attributes: [{
    	name: 'Price',
    	key: 'price',
    	isSelected: true
    },
    {
    	name: 'Colors',
    	key: 'colors',
    	isSelected: true
    },
    {
    	name: 'Vendors',
    	key: 'vendors',
    	isSelected: false
    },
    {
    	name: 'Condition',
    	key: 'condition',
    	isSelected: true
    }
   ],
    isShowModal: false
  }

  componentDidMount() {
  	this.fetchProducts();
  } 
   
  fetchProducts = () => this.setState({products: products_data});

  handleCompareClick = (productId, isCompared) => {
  	let products = this.state.products;
  	products = products.map(product => {
  		if(product.id == productId){
  			return { ...product, isCompared: !isCompared};
  		} else {
  			return product;
  		}
  	})

  	let compareProducts_count = this.state.compareProducts_count;
  	compareProducts_count = isCompared? compareProducts_count - 1 : compareProducts_count + 1;

  	this.setState({ products, compareProducts_count });
  }

  handleEditClick = () => this.setState({isShowModal: true});

  closeModal = () => this.setState({isShowModal: false});

  applyFilter = (compare_attributes) => this.setState({compare_attributes});

  render(){
    const { products, compare_attributes, compareProducts_count, isShowModal } = this.state;

    return (
      <div className="container">
      	{ isShowModal && <EditAttributeModal closeModal={this.closeModal} compare_attributes={compare_attributes} applyFilter={this.applyFilter}/>}
      	<div className="products-container">
	        <h4>Compare Products
	        <Button size="sm" className="button_editAttribute" variant="outline-secondary" onClick={ () => this.handleEditClick() }>
	        	Add/Remove Attributes
	       	</Button>
	        </h4>
	        <div className="row">
	          {
	            products.map( (product, index) => {
	              return(<Product productClicked={this.handleCompareClick} key={index} {...product}/>)
	            })
	          }
	        </div>
	    </div>
        <div className="table-container shadow-sm mb-5 bg-white rounded">
        {
        	compareProducts_count>=2 && (<ComparisonTable products={products} compare_attributes={compare_attributes}/>)
       	}
       	</div>      
      </div>
    );
  }
}

export default App;
