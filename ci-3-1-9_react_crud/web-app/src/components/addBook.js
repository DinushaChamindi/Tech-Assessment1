import React from 'react';
import { Link } from 'react-router-dom';

class AddBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = { bookName: '', auther: '', category:'', price: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value
		this.setState(state);
	}
	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/add_Book', {
			method: 'POST',
			body: JSON.stringify({
				bookName: this.state.bookName,
				auther: this.state.auther,
				category: this.state.category,
				price: this.state.price
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("New Book saved successfully");
			}
		});
	}
	render() {
		return (
			<div id="container">
				<center><h1><Link to="/Home"  >Library Solution System</Link></h1></center>

				<h2>Add New Book</h2> &nbsp; <Link to="/Books"  >Back</Link>
				<p />
				
				<form onSubmit={this.handleSubmit}>
					<p>
						<label>Book Name : </label>
						<input type="text" name="bookName" value={this.state.bookName} onChange={this.handleChange} placeholder="Book Name" />
					</p>
					<p>
						<label>Auther : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="text" name="auther" value={this.state.auther} onChange={this.handleChange} placeholder="Auther" />
					</p>
					<p>
						<label>Category : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<select name="category" value={this.state.category} onChange={this.handleChange} >
							<option value="1">Novel</option>
							<option value="2">Educational</option>
							<option value="3">Tecnical</option>
							<option value="4">StoryBooks</option>
						</select>
					</p>
					<p>
						<label>Price : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default AddBook;