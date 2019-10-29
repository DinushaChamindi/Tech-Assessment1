import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	
	
	
	render() {
		return (
			<div id="container">
				
				<p/>
			<center><h1><Link to="/Home"  >Library Solution System</Link></h1></center>
			<Link to="/Books"  >Books</Link><br/><br/>
			<Link to="/Members"  >Members</Link><br/><br/>
			<Link to="/IssueDetails"  >Issue Books</Link><br/><br/>

			</div>
		)
	}
}

export default Home;