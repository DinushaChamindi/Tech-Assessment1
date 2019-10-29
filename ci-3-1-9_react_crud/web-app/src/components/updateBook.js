import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class UpdateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: '', bookName: '', auther: '', category:'', price:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
	fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Book?id=' + this.props.match.params.id)
		.then(response => {
			return response.json();
		}).then(result => {
			console.log(result);
			this.setState({
				Id: result.Id,
				bookName: result.bookName,
				auther: result.auther,
				category: result.category,
				price: result.price,
				
			});
		});
  }
  handleChange(event) {
	  const state = this.state
	  state[event.target.name] = event.target.value
	  this.setState(state);
  }
  handleSubmit(event) {
	  event.preventDefault();
	  fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/update_Book', {
			method: 'PUT',
			body: JSON.stringify({
				id: this.state.Id,
				bookName: this.state.bookName,
				auther: this.state.auther,
				category: this.state.category,
				price: this.state.price
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
				if(response.status === 200) {
					alert("Website update successfully.");
				}
			});
  }
  
  render() {
    return (
			<div id="container">
			  <Link to="/">Websites</Link>
				  <p/>
				  <form onSubmit={this.handleSubmit}>
					<input type="hidden" name="Id" value={this.state.Id}/>
					<p>
					<label>Book Name : </label>
					<input type="text" name="bookName" value={this.state.bookName} onChange={this.handleChange} placeholder="Book Name" />
				</p>
				<p>
					<label>Auther : </label>
					<input type="text" name="auther" value={this.state.auther} onChange={this.handleChange} placeholder="Auther" />
				</p>
				<p>
					<label>Category : </label>
					<select name="category" value={this.state.category} onChange={this.handleChange} >
						<option value="1">Novel</option>
						<option value="2">Educational</option>
						<option value="3">Tecnical</option>
						<option value="4">StoryBooks</option>
					</select>
				</p>
				<p>
					<label>Price : </label>
					<input type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Price" />
				</p>
				<p>
							<input type="submit" value="Submit" />
						</p>
				  </form>
			   </div>
    );
  }
}

export default UpdateBook;