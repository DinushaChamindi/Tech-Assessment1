import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './website.css';
import Home from './components/Home';
import Books from './components/Books';
import Members from './components/Members';
import IssueDetails from './components/IssueDetails';
import addBook from './components/addBook';
import addMember from './components/addMember';
import issueBook from './components/issueBook';
import Update from './components/update';
import UpdateBook from './components/updateBook';
import updateMember from './components/updateMember';



import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={Home} />
			<Route path='/Home' component={Home} />
			<Route path='/IssueDetails' component={IssueDetails} />
			<Route path='/update/:id' component={Update} />
			<Route path='/updateBook/:id' component={UpdateBook} />
			<Route path='/updateMember/:id' component={updateMember} />
			<Route path='/addBook' component={addBook} />
			<Route path='/Books' component={Books} />
			<Route path='/Members' component={Members} />			
			<Route path='/addMember' component={addMember}/>
			<Route path='/issueBook' component={issueBook}/>
		</div>
	</Router>,
document.getElementById('root'));

registerServiceWorker();