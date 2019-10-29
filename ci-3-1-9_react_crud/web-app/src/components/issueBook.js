import React from 'react';
import { Link } from 'react-router-dom';

class IssueBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: '', bookId: '', memberId:'', type: '', returnDate: '' };
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
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Issue_book', {
			method: 'POST',
			body: JSON.stringify({
				date: this.state.date,
				bookId: this.state.bookId,
				memberId: this.state.memberId,
				type: this.state.type,
				returnDate: this.state.returnDate
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("New Book Issued successfully");
			}
		});
	}
	render() {
		return (
			<div id="container">
				<center><h1><Link to="/Home"  >Library Solution System</Link></h1></center>
				
								<h2>Add New Member</h2> &nbsp; <Link to="/IssueDetails"  >Back</Link>
								
				<form onSubmit={this.handleSubmit}>
					
					<p>
						<label>Member Name : </label>
						<input type="date" name="date" value={this.state.date} onChange={this.handleChange} placeholder="Issue Date" />
					</p>
					<p>
						<label>Book Id : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="text" name="bookId" value={this.state.bookId} onChange={this.handleChange} placeholder="Book Id" />
					</p>
					<p>
						<label>Member Id : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="text" name="memberId" value={this.state.memberId} onChange={this.handleChange} placeholder="Member Id" />
					</p>
					<p>
						<label>returnDate : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="date" name="returnDate" value={this.state.returnDate} onChange={this.handleChange} placeholder="Return Date" />
					</p>
					<p>
						<input type="submit" value="Submit" />
					</p>
				</form>
			</div>
		);
	}
}

export default IssueBook;