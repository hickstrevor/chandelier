"use strict";
import React, { Component, PropTypes } from "react";
import DocumentTitle from "react-document-title";
import Table from "../components/table/Table";
import Filter from "../components/filter/Filter";
import NavBar from "../components/common/NavBar";
import Alert from "../components/common/Alert";
import Modal from "../components/common/Modal";
import connectToStores from "../utils/connectToStores";
import ProductStore from "../stores/ProductStore";
import AlertStore from "../stores/AlertStore";
import ModalStore from "../stores/ModalStore";
import PaginationStore from "../stores/PaginationStore";
import * as ModalActionCreators from "../actions/ModalActionCreators";
import * as ProductActionCreators from "../actions/ProductActionCreators";
import * as SharedActionCreators from "../actions/SharedActionCreators";

function requestDataFromServer() {
	SharedActionCreators.getAllProducts();
}

class ProductPage extends Component {

	componentWillMount() {
		requestDataFromServer();
	}

	componentWillUnmount() {
		SharedActionCreators.changePageNumber(0);
		SharedActionCreators.setRowsPerPage(50);
	}

	render() {
		return (
			<DocumentTitle title="Products — R&B">
				<div>
					<NavBar title={"Products"} >
						{(this.props.isLoading || this.props.alert) ?
							<Alert isLoading={this.props.isLoading} isUnsaved={this.props.isUnsaved}
								alert={this.props.alert} /> :
							<span />
						}
						<img src="/img/transparent.gif" className="logo" />
					</NavBar>
					<NavBar routeConfig={this.props.routeScheme}>
						<div className="nav nav-item logout">
							<a href="/logout">Logout</a>
						</div>
					</NavBar>
					{this.props.pendingAction ?
						<Modal isVisible={!!this.props.pendingAction.type} title={"Are you sure you want to delete this product?"}
								hide={ModalActionCreators.clearPendingAction}>
							<button className="confirm-delete" autoFocus
									onClick={ModalActionCreators.executePendingAction.bind(null, this.props.pendingAction.action)}>
								Confirm
							</button>
						</Modal> :
						<span />
					}
					<div className="container">
						<Filter filters={this.props.filters} selections={this.props.selections}
							setFilter={ProductActionCreators.setFilter}
							restrictTo={ProductActionCreators.restrictTo}
							presetConfig={this.props.presetScheme}
							currentPage={this.props.currentPage}
							rowsPerPage={this.props.rowsPerPage}
							numberOfRows={this.props.numberOfProducts}
							setRowsPerPage={SharedActionCreators.setRowsPerPage}
							changePage={SharedActionCreators.changePageNumber}
						>
							<button className="add-button rounded"
									onClick={ProductActionCreators.createSingleProduct}>
								Add Product
							</button>
						</Filter>
						<div className="table-container">
							<Table selections={this.props.selections}
								filters={this.props.filters}
								items={this.props.products} primaryKey={"id"}
								tableScheme={this.props.tableScheme}
								onBlur={ProductActionCreators.saveProduct}
								sortFunc={SharedActionCreators.externalSortBy.bind(null, "products")}
							/>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

function getState() {
	const start = PaginationStore.getOffset();
	const rowsPerPage = PaginationStore.getRowsPerPage();
	const end = start + rowsPerPage;

	const products = ProductStore.getFilteredProducts(start, end);
	const filters = ProductStore.getFilters();
	const selections = ProductStore.getSelections();
	const currentPage = PaginationStore.getCurrentPage();
	const numberOfProducts = ProductStore.getNumberOfProducts();
	const pendingAction = ModalStore.getPendingAction();
	const isLoading = AlertStore.getLoadStatus();
	const isUnsaved = AlertStore.getUnsavedStatus();
	const alert = AlertStore.getAlert();

	return {
		products,
		selections,
		filters,
		currentPage,
		numberOfProducts,
		rowsPerPage,
		pendingAction,
		isLoading,
		isUnsaved,
		alert
	};
}

export default connectToStores([
	ProductStore, AlertStore,
	ModalStore, PaginationStore
], getState)(ProductPage);

// Code too wide
ProductPage.defaultProps = {
	tableScheme: [
		{ key: "-", 	        display: "", className: "fixed-col hid", type: "button",
				onClick: ModalActionCreators.modifyPendingAction.bind(null, "DELETE", ProductActionCreators.deleteSingleProduct), inputClassName: "btn-left" },
		{ key: "type",        display: "Type", className: "", type: "select", onChange: ProductActionCreators.changeProduct },

		{ key: "name",       display: "Name", className: "u-flex-grow2",
					type: "text",   onChange: ProductActionCreators.changeProduct },

		{ key: "description",   display: "Description", className: "u-flex-grow2",
					type: "textarea", onChange: ProductActionCreators.changeProduct },

		{ key: "active",         display: "Active", className: "qty-sm",
					type: "checkbox",   onChange: ProductActionCreators.changeProduct, isBool: true},

		{ key: "saleable",         display: "Saleable", className: "qty-sm",
					type: "checkbox",   onChange: ProductActionCreators.changeProduct, isBool: true},

		{ key: "sku",         display: "SKU", className: "u-flex-grow2",
					type: "text", onChange: ProductActionCreators.changeProduct }
	],
	presetScheme: [
		{
			description: "Clear All Filters",
			onSelect: [
				ProductActionCreators.clearProductsFilters,
				SharedActionCreators.setRowsPerPage.bind(null, 50)
			]
		}
	],
	routeScheme: [
		{ display: "Jobs", "to": "jobs" },
		{ display: "Items", "to": "items" },
		{ display: "Products", to: "products"}
	]

};
