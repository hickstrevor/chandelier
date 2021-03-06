"use strict";
import I from "immutable";
import { createStore } from "../utils/StoreUtils";
import ActionTypes from "../constants/ActionTypes";
import AppDispatcher from "../dispatchers/AppDispatcher";
import SelectionStore from "./SelectionStore";
import PaginationStore from "./PaginationStore";
import * as FilterUtils from "../utils/FilterUtils";

// TODO: Eventually set up a 'DefaultsStore'/'PreferencesStore'
const emptyFilters = I.fromJS({
	sortTerm: "shipping_date",
	isAsc: true,
	filterBy: "",
	dateField: "shipping_date",
	startDate: "",
	endDate: "",
	restrictions: {
		"job_status": {
			key: "job_status"
		},
		"payment": {
			key: "payment"
		},
		"parts_status": {
			key: "parts_status"
		}
	}
});

const defaultFilters = emptyFilters.setIn(
	["restrictions", "job_status", "options"],
	I.List(["Confirmed", "Packaged", "Dispatched"])
).setIn(
	["restrictions", "payment", "options"],
	I.List(["", "Awaiting Payment", "Partial Payment", "Full Payment"])
);

const keysToSearch = [
	"job_id", "client", "product", "description",
	"glass", "metal", "flex", "bulb", "notes"
];

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
				FilterUtils.contains(row, filterBy, keysToSearch)
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

		case ActionTypes.CHANGE_SINGLE_JOB_ITEM:
				let d = action.data;
				let ind = items.findIndex(item =>
					item.get("item_id") === d.id
				);

				items = items.setIn([ind, d.key], d.value);
				ItemsStore.emitChange();
				break;

		case ActionTypes.FILTER_ITEMS_BY:
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

		case ActionTypes.SET_ITEMS_START_DATE:
				filters = filters.set("startDate", action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.SET_ITEMS_END_DATE:
				filters = filters.set("endDate", action.data);
				ItemsStore.emitChange();
				break;

		case ActionTypes.RESTRICT_ITEMS_TO:
				if (filters.hasIn(["restrictions", action.data.key])) {
					filters = filters.setIn(["restrictions", action.data.key], I.fromJS(action.data));
				}
				ItemsStore.emitChange();
				break;

		case ActionTypes.CLEAR_ITEMS_FILTERS:
				filters = emptyFilters;
				ItemsStore.emitChange();
				break;

		case ActionTypes.DEFAULT_ITEMS_FILTERS:
				filters = defaultFilters;
				ItemsStore.emitChange();
				break;

		case ActionTypes.RECEIVE_ALL_SELECTIONS:
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
