import React from 'react';
import { Link } from 'react-router-dom';

class Members extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Members: []};
		this.headers = [
			{ key: 'memberid', label: 'Member Id'},
			{ key: 'memberName', label: 'Member Name' },
			{ key: 'address', label: 'Address' },
			{ key: 'contactNo', label: 'Contact No'},
			{ key: 'status', label: 'Status' },
			{ key: 'isAdmin', label: 'Type' }
		];
		this.deleteMemeber = this.deleteMemeber.bind(this);
	}
	
	componentDidMount() {
		fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Members')
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					Members:result
				});
			});
	}
	
	deleteMemeber(id) {
		if(window.confirm("Are you sure want to delete?")) {
			fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/delete_Member/' + id, {
				method : 'DELETE'//,
				//mode: 'no-cors',
				/*headers : {
					'Access-Control-Allow-Origin': '*',
					'Content-Type' : 'text/plain'
				}*/
			}).then(response => { 
					if(response.status === 200) {
						alert("Website deleted successfully");
						
						fetch('http://localhost/ci-3-1-9_react_crud/index.php/websiterestcontroller/Members')
						.then(response => {
							return response.json();
						}).then(result => {
							console.log(result);
							this.setState({
								Members:result
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

				<h2>Member Details</h2> &nbsp; <Link to="/addMember"  >New Member</Link>
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
							this.state.Members.map(function(item, key) {
							return (
								<tr key = {key}>
								  <td>{item.memberid}</td>
								  <td>{item.memberName}</td>
								  <td>{item.address}</td>
								  <td>{item.contactNo}</td>
								  <td>{item.status}</td>
								  <td>{item.isAdmin}</td>
								  <td>
										<Link to={`/updateMember/${item.memberid}`}>Edit</Link>
										&nbsp;
										<a href="javascript:void(0);" onClick={this.deleteMemeber.bind(this, item.memberid)}>Delete</a>
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

export default Members;