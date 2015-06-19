"use strict";
import I from "immutable";
import { createStore } from "../utils/StoreUtils";
import ActionTypes from "../constants/ActionTypes";
import AppDispatcher from "../dispatchers/AppDispatcher";
import SelectionStore from "./SelectionStore";
import PaginationStore from "./PaginationStore";
import * as FilterUtils from "../utils/FilterUtils";

const defaultFilters = I.fromJS({
	sortTerm: "shipping_date",
	isAsc: false,
	filterBy: "",
	dateField: "shipping_date",
	startDate: "",
	endDate: "",
	restrictions: {
		"job_status": {
			key: "job_status",
			options: ["Confirmed", "Packaged"]
		},
		"payment": {
			key: "payment",
			options: ["Deposit", "Paid Card", "Paid BACS", "Paid Other"]
		}
	}
});


var	items = I.List(),
		itemLength = 0,
		filters = defaultFilters;

const ItemsStore = createStore({
	getFilteredItems(start, end) {
		let f = filters;
		let filterBy = f.get("filterBy");
		let dateField = f.get("dateField");
		let startDate = f.get("startDate");
		let endDate = f.get("endDate");
		let restrictions = f.get("restrictions");

		const filtered = items.filter(row => {
			return (
				FilterUtils.satisfies(row, restrictions) &&
				FilterUtils.isWithinBounds(row.get(dateField), startDate, endDate) &&
				FilterUtils.contains(row, filterBy)
			);
		});

		itemLength = filtered.size;
		return filtered.slice(start, end);
	},
	getFilters() {
		return filters;
	},
	getNumberOfItems() {
		return itemLength;
	}

});

const onReceivingAction = action => {
	switch (action.type) {

		case ActionTypes.RECEIVE_ALL_ITEMS:
				items = I.fromJS(action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.RECEIVE_SINGLE_ITEM:
				items = items.unshift(I.fromJS(action.data));
				ItemsStore.emitChange();
				break;

		case ActionTypes.CHANGE_SINGLE_JOB_ITEM:
				let d = action.data;
				items = items.map(item =>
					item.get("item_id") === d.id ?
						item.set(d.key, d.value) :
						item
				);
				ItemsStore.emitChange();
				break;

		case ActionTypes.RECEIVE_DELETION_CONFIRMATION:
				items = items.filterNot(item =>
					item.get("item_id") === action.data
				);
				ItemsStore.emitChange();
				break;

		case ActionTypes.FILTER_BY:
				filters = filters.set("filterBy", action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.SORT_ITEMS:
				const asc = action.data === filters.get("sortTerm") ?
											!filters.get("isAsc") :
											false;

				filters = filters.set("isAsc", asc);
				filters = filters.set("sortTerm", action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.SET_START_DATE:
				filters = filters.set("startDate", action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.SET_END_DATE:
				filters = filters.set("endDate", action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.RESTRICT_TO:
				if (filters.hasIn(["restrictions", action.data.key])) {
					filters = filters.setIn(["restrictions", action.data.key], I.fromJS(action.data));
				}
				ItemsStore.emitChange();
				break;

		case ActionTypes.RECEIVE_SELECTIONS:
				AppDispatcher.waitFor([SelectionStore.dispatchToken]);
				const selections = SelectionStore.getSelections();
				const rIterable = filters.get("restrictions").keySeq();

				rIterable.forEach(r => {
					if(!filters.hasIn(["restrictions", r, "options"])) {
						filters = filters.setIn(["restrictions", r, "options"], selections.get(r));
					}
				});
				ItemsStore.emitChange();
				break;

		default:
				break;

	}
};

export default ItemsStore;

AppDispatcher.register(onReceivingAction);