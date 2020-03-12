import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

const Color = ({color}) => <span className="color" style={{backgroundColor: color}}> </span>;
  
const ComparisonTable = (props) => {
  const { products, compare_attributes }  = props;

  return (
	<Table responsive className="compare-table m-0">
  <thead>
    <tr>
      <th></th>
      {
      	products.map(product => product.isCompared && (<th className="text-center">{product.name}</th>))
      }
    </tr>
  </thead>
  <tbody>
  	  {
  	  	compare_attributes.map(attribute => {
  	  		return( attribute.isSelected && 
  	  		<tr>
  	  			<td className="attribute-heading">{attribute.name}</td>
  	  			{
  	  				products.map(product => {
  	  					if(product.isCompared){
  	  						if(attribute.key == 'condition') {
  	  							return(<td className={`text-center ${product[attribute.key] == 'Fresh' ? "fresh" : "frozen"}`}>{product[attribute.key]}</td>)
  	  						} else if(attribute.key == 'vendors'){
  	  							return(
  	  								<td className="text-center">
  	  									{product[attribute.key].map(vendor => `${vendor}, `)}
  	  								</td>)
  	  						} else if(attribute.key == 'colors'){
  	  							return(
  	  								<td className="text-center">
  	  									{ product[attribute.key].map(color => <Color color={color}/>) }
  	  								</td>)
  	  						}
  	  						else{
  	  							return(<td className="text-center">{product[attribute.key]}</td>)
  	  						}
  	  					}
  	  				})
  	  			}		
  	  		</tr>
  	  		)	
  	  	})
  	  }
  </tbody>
</Table>
  )
}

export default ComparisonTable;