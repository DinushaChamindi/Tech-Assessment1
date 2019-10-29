import React from 'react';
import { Link } from 'react-router-dom';

class Books extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Books: []};
		this.headers = [
			{ key: 'bookId', label: 'Book Id'},
			{ key: 'bookName', label: 'Book Name' },
			{ key: 'auther', label: 'Auther' },
			{ key: 'price', label: 'Price'},
			{ key: 'isAvailable', label: 'Availability' }
		];
		this.deleteBook = this.deleteBook.bind(this);
	}
	
	componentDidMount() {
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Books')
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					Books:result
				});
			});
	}
	
	deleteBook(id) {
		if(window.confirm("Are you sure want to delete?")) {
			fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/delete_Book/' + id, {
				method : 'DELETE'//,
				//mode: 'no-cors',
				/*headers : {
					'Access-Control-Allow-Origin': '*',
					'Content-Type' : 'text/plain'
				}*/
			}).then(response => { 
					if(response.status === 200) {
						alert("Website deleted successfully");
						
						fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Books')
						.then(response => {
							return response.json();
						}).then(result => {
							console.log(result);
							this.setState({
								Books:result
							});
						});
					} 
			 });
		}
	}
	
	render() {
		return (
			<div id="container">
				<center><h1><Link to="/Home"  >Library Solution System</Link></h1></center>

				<h2>Book Details</h2> &nbsp; <Link to="/addBook"  >New Book</Link>
				<p/>
				<table>
					<thead>
						<tr>
						{
							this.headers.map(function(h) {
								return (
									<th key = {h.key}>{h.label}</th>
								)
							})
						}
						  <th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.Books.map(function(item, key) {
							return (
								<tr key = {key}>
								  <td>{item.bookId}</td>
								  <td>{item.bookName}</td>
								  <td>{item.auther}</td>
								  <td>{item.price}</td>
								  <td>{item.isAvailable}</td>
								  <td>
										<Link to={`/updateBook/${item.bookId}`}>Edit</Link>
										&nbsp;
										<a href="javascript:void(0);" onClick={this.deleteBook.bind(this, item.bookId)}>Delete</a>
								  </td>
								</tr>
											)
							}.bind(this))
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Books;