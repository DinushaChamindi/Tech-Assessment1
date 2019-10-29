import React from 'react';
import { Link } from 'react-router-dom';

class IssueDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {IssueDetails: []};
		this.headers = [
			{ key: 'date', label: 'Issued Date'},
			{ key: 'bookId', label: 'Book Id' },
			{ key: 'memberId', label: 'Member Id' },
			{ key: 'returnDate', label: 'Return Date'},
			{ key: 'isReturn', label: 'Returned' }
		];
		//this.deleteBook = this.deleteBook.bind(this);
	}
	
	componentDidMount() {
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/IssueDetails')
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					IssueDetails:result
				});
			});
	}
	
	
	
	render() {
		return (
			<div id="container">
				<center><h1><Link to="/Home"  >Library Solution System</Link></h1></center>
				
								<h2>Issued Book Details</h2> &nbsp; <Link to="/IssueBook"  >Issue New Book</Link>
								

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
						
						</tr>
					</thead>
					<tbody>
						{
							this.state.IssueDetails.map(function(item, key) {
							return (
								<tr key = {key}>
								  <td>{item.date}</td>
								  <td>{item.bookId}</td>
								  <td>{item.memberId}</td>
								  <td>{item.returnDate}</td>
								  <td>{item.isReturn}</td>
								  
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

export default IssueDetails;