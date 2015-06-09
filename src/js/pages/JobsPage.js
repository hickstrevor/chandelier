"use strict";
import React, { Component, PropTypes } from "react";
import Table from "../components/common/Table";
import NavBar from "../components/common/NavBar";
import Filter from "../components/common/Filter";
import JobsStore from "../stores/JobsStore";
import SelectionStore from "../stores/SelectionStore";
import connectToStores from "../utils/connectToStores";
import * as JobsActionCreators from "../actions/JobsActionCreators";
import * as SharedActionCreators from "../actions/SharedActionCreators";

function requestDataFromServer() {
	SharedActionCreators.getSelections();
	JobsActionCreators.getAllJobs();
}

class JobsPage extends Component {

	componentWillMount() {
		requestDataFromServer();
	}

	render() {
		let items = this.props.items.map(item => item.details);

		return (
			<div>
				<NavBar title={"All Jobs"}/>
				<div className="container">
					<Filter filters={this.props.filters} selections={this.props.selections}
						setFilter={SharedActionCreators.setFilter}
						setStartDate={SharedActionCreators.setStartDate}
						setEndDate={SharedActionCreators.setEndDate}
						restrictTo={SharedActionCreators.restrictTo}
						sortFunc={SharedActionCreators.sortBy}
					/>
					<div className="table-container">
						<Table {...this.props} items={items} primaryKey={"job_id"} onBlur={SharedActionCreators.saveDetails}/>
					</div>
					<button className="add-button" onClick={JobsActionCreators.createSingleJob}>+</button>
				</div>
			</div>
		);
	}
}

function getState() {
	const items = JobsStore.getFilteredAndSortedJobs();
	const filters = JobsStore.getFilters();
	const selections = SelectionStore.getSelections();

	return {
		selections,
		items,
		filters
	};
}

export default connectToStores([JobsStore, SelectionStore], getState)(JobsPage);

JobsPage.defaultProps = {
	tableScheme: [
		{ key: "job_id",        display: "Job #",         "className": "qty-sm",
				type: "link", to: "singlejob" },
		{ key: "client",        display: "Client",        "className": "u-flex-grow2",
				type: "text", onChange: SharedActionCreators.changeDetails },
		{ key: "project",       display: "Project",       "className": "",
				type: "text", onChange: SharedActionCreators.changeDetails },
		{ key: "job_status",    display: "Job Status",    "className": "",
				type: "select", onChange: SharedActionCreators.changeDetails },
		{ key: "order_type",    display: "Order Type",    "className": "",
				type: "select", onChange: SharedActionCreators.changeDetails },
		{ key: "shipping_date", display: "Shipping Date", "className": "u-flex-grow2",
				type: "date", onChange: SharedActionCreators.changeDetails },
		{ key: "job_items",     display: "# Job Items",   "className": "",
				type: "text" },
		{ key: "parts_status",  display: "Parts Status",  "className": "",
				type: "select", onChange: SharedActionCreators.changeDetails }
	]
};
