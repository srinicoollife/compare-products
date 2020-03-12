import Modal from 'react-bootstrap/Modal'
import React, { Component, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class EditAttributeModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    compare_attributes: [],
    isSelectAll : false
  }

  componentDidMount() {
    this.fetchAttributes();
  } 
   
  fetchAttributes = () => {
    this.setState({compare_attributes: this.props.compare_attributes.map(attribute => ({...attribute, show: true}))})
  }

  onSearch = (searchText) => {
    let compare_attributes = this.state.compare_attributes;
    compare_attributes = compare_attributes.map(attribute => {
      return{...attribute,  show: attribute.name.toLowerCase().includes(searchText.toLowerCase()) }
    })
    this.setState({compare_attributes})
  }

  onSelected = (selectedAttribute) => {
    let compare_attributes = this.state.compare_attributes;
    compare_attributes = compare_attributes.map(attribute => {
      if(attribute.key == selectedAttribute.key){
        return {...attribute, isSelected: !attribute.isSelected}
      } else{
        return attribute;
      }
    })
    this.setState({compare_attributes})
  }

  applyFilter = () => {
    this.props.closeModal();
    this.props.applyFilter(this.state.compare_attributes);
  }

  onSelectAll = (checked) => {
    if(checked){
      this.setState({
        compare_attributes: this.state.compare_attributes.map(attribute => ({...attribute, isSelected: false})),
        isSelectAll: false
      })
    } else{
      this.setState({
        compare_attributes: this.state.compare_attributes.map(attribute => ({...attribute, isSelected: true})),
        isSelectAll: true
      })  
    }
  }

  render(){
    const { compare_attributes, isSelectAll } = this.state;

    return(
      <Modal show={true} centered onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Remove Attributes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input className="modal-searchBox" type="text" placeholder="Search Attributes" onChange={(event) => this.onSearch(event.target.value)}/>
          <Form.Group id="select-all" onClick={ () => this.onSelectAll(isSelectAll) }>
              <Form.Check type="checkbox" label="Select All" className="select-all" checked={isSelectAll}/>
          </Form.Group>
          {
            compare_attributes.map( (attribute, index) => {
              if(attribute.show){
               return(<div>
                  <Form.Group id={attribute.key} onClick={ () => this.onSelected(attribute) }>
                    <Form.Check type="checkbox" label={attribute.name} checked={attribute.isSelected}/>
                  </Form.Group>
                </div>)
              }
            })
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={ () => this.props.closeModal() }>Cancel</Button>
          <Button variant="primary" onClick={ () => this.applyFilter() }>Apply</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default EditAttributeModal;