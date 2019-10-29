import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class updateMember extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Id:'', memberName: '', address: '', contactNo:'', type: '', email: ''  };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Member?id=' + this.props.match.params.id)
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					Id: result.Id,
					// memberName: result.memberName,
					memberName: result.memberName,
					address: result.address,
					contactNo: result.contactNo,
					type: result.isAdmin,
					email: result.email

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
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/update_Member', {
			method: 'PUT',
			body: JSON.stringify({
				Id: this.state.Id,
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
				alert("Website update successfully.");
			}
		});
	}

	render() {
		return (
			<div id="container">
				
				<Link to="/">Websites</Link>
				<h2>Edit Member</h2>
				<form onSubmit={this.handleSubmit}>
					<input type="hidden" name="Id" value={this.state.Id} />
					<p>
						<label>Member Name : </label>
						<input type="text" name="memberName" value={this.state.memberName} onChange={this.handleChange} placeholder="Member Name" />
					</p>
					<p>
						<label>Address : </label>
						<input type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address" />
					</p>
					<p>
						<label>Contact No : </label>
						<input type="text" name="contactNo" value={this.state.contactNo} onChange={this.handleChange} placeholder="Contact No" />
					</p>
					<p>
						<label>Type  : </label>
						<select name="type" value={this.state.type} onChange={this.handleChange} >
							<option value="1">user</option>
							<option value="0">Member</option>
						</select>
					</p>
					<p>
						<label>Email  : </label>
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

export default updateMember;