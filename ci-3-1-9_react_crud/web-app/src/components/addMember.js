import React from 'react';
import { Link } from 'react-router-dom';

class AddMember extends React.Component {
	constructor(props) {
		super(props);
		this.state = { memberName: '', address: '', contactNo:'', type: '', email: '' };
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
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/add_Member', {
			method: 'POST',
			body: JSON.stringify({
				memberName: this.state.memberName,
				address: this.state.address,
				contactNo: this.state.contactNo,
				type: this.state.type,
				email: this.state.email
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("New Member saved successfully");
			}
		});
	}
	render() {
		return (
			<div id="container">
				<center><h1><Link to="/Home"  >Library Solution System</Link></h1></center>

				<h2>Add New Member</h2> &nbsp; <Link to="/Members"  >Back</Link>
				<p />
				
				<form onSubmit={this.handleSubmit}>
					<p>
						<label>Member Name : </label>&nbsp;
						<input type="text" name="memberName" value={this.state.memberName} onChange={this.handleChange} placeholder="Member Name" />
					</p>
					<p>
						<label>Address : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address" />
					</p>
					<p>
						<label>Contact No : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="text" name="contactNo" value={this.state.contactNo} onChange={this.handleChange} placeholder="Contact No" />
					</p>
					<p>
						<label>Type  : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<select name="type" value={this.state.type} onChange={this.handleChange} >
							<option value="1">user</option>
							<option value="0">Member</option>  
						</select>
					</p>
					<p>
						<label>Email : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
					</p>
					<p>
						<input type="submit" value="Submit" />
					</p>
				</form>
			</div>
		);
	}
}

export default AddMember;