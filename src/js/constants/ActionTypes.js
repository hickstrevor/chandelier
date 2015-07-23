"use strict";
import keyMirror from "react/lib/keyMirror";

export default keyMirror({
	// SERVER JS -> LOCAL IMMUTABLE
	"RECEIVE_ALL_SELECTIONS": null,

	"RECEIVE_ALL_JOBS": null,
	"RECEIVE_SINGLE_JOB": null,
	"RECEIVE_UPDATED_JOB": null,
	"RECEIVE_JOB_CREATION_CONFIRMATION": null,

	"RECEIVE_ALL_ITEMS": null,
	"RECEIVE_SINGLE_ITEM": null,
	"RECEIVE_ITEM_DELETION_CONFIRMATION": null,

	"RECEIVE_ALL_PRODUCTS": null,
	"RECEIVE_SINGLE_PRODUCT": null,
	"RECEIVE_PRODUCT_DELETION_CONFIRMATION": null,

	"RECEIVE_USER_PROFILE": null,

	"RECEIVE_ALERT": null,
	"RECEIVE_UPDATE_CONFIRMATION": null,

	// LOCAL IMMUTABLE -> SERVER JS
	"CREATE_SINGLE_JOB": null,
	"SAVE_SINGLE_JOB_DETAILS": null,
	"SAVE_SINGLE_JOB_ITEM": null,

	// LOCAL JS -> LOCAL IMMUTABLE
	"CHANGE_SINGLE_JOB_DETAILS": null,
	"CHANGE_SINGLE_JOB_ITEM": null,
	"CHANGE_SINGLE_PRODUCT": null,

	// LOCAL MUTABLE -> LOCAL MUTABLE
	"PENDING_ACTION": null,
	"IS_LOADING": null,

	"SET_CURRENT_Y": null,
	"SET_TABLE_HEIGHT": null,

	// LOCAL IMMUTABLE -> LOCAL IMMUTABLE
	"SORT_ONE": null,

	"SORT_JOBS": null,
	"SET_JOBS_START_DATE": null,
	"SET_JOBS_END_DATE": null,
	"FILTER_JOBS_BY": null,
	"RESTRICT_JOBS_TO": null,
	"CLEAR_JOBS_FILTERS": null,

	"SORT_ITEMS": null,
	"SET_ITEMS_START_DATE": null,
	"SET_ITEMS_END_DATE": null,
	"FILTER_ITEMS_BY": null,
	"RESTRICT_ITEMS_TO": null,
	"CLEAR_ITEMS_FILTERS": null,

	"SORT_PRODUCTS": null,
	"FILTER_PRODUCTS_BY": null,
	"RESTRICT_PRODUCTS_TO": null,
	"CLEAR_PRODUCTS_FILTERS": null
});
