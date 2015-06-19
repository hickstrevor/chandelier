"use strict";
import I from "immutable";
import assert from "assert";
import rewire from "rewire";
import { sameVal } from "../setup/utils";

describe("SelectionStore", function() {
	let SelectionStore, onReceivingAction;

	beforeEach(function() {
		SelectionStore = rewire("../../../src/js/stores/SelectionStore");
		SelectionStore.__set__("selections", I.Map());
		onReceivingAction = SelectionStore.__get__("onReceivingAction");
	});

	it("#has a selections getter method", function() {
		let dummy = I.Map({hello: "hi"});
		SelectionStore.__set__("selections", dummy);

		assert.equal(typeof SelectionStore.getSelections, "function");
		assert.equal(SelectionStore.getSelections(), dummy);
	});

	it("#updates its internal state if the actiontype is RECEIVE SELECTIONS", function() {
		var testData = {
			testitems: [{label: "hello mum!"}, {label: ":)"}]
		};

		onReceivingAction({
			type: "RECEIVE_SELECTIONS",
			data: testData
		});

		sameVal(SelectionStore.getSelections(), I.Map({
			testitems: I.List(["hello mum!", ":)"])
		}));
	});

	it("#updates its internal state if the actiontype is RECEIVE_ALL_PRODUCTS", function() {
		var testData = {
			testitems1: {
				saleable: true,
				products: [{name: "hello mum!", age: "15"}, {name: ":)"}]
			},
			TESTITEMS2: {
				saleable: false,
				products: [{name: "test2"}, {name: ":("}]
			},
			testItems3: {
				saleable: true,
				products: [{name: "tony"}]
			}
		};

		onReceivingAction({
			type: "RECEIVE_ALL_PRODUCTS",
			data: testData
		});

		sameVal(SelectionStore.getSelections(), I.Map({
			product: I.List(["hello mum!", ":)", "tony"]),
			testitems1: I.List(["hello mum!", ":)"]),
			testitems2: I.List(["test2", ":("]),
			testitems3: I.List(["tony"])
		}));
	});

	it("#lowercases productType keys", () => {});
	it("#flops the arr of objs into an arr of values: from the name prop", () => {});
	it("#also pushes saleable products to the 'product' array", () => {});
	it("#gives each product type its own property", () => {});
});