"use strict";
import I from "immutable";
import IPropTypes from "react-immutable-proptypes";
import React, { Component, PropTypes } from "react";
import Pager from "react-pager";
import FilterInput from "./FilterInput";
import MultiSelect from "./MultiSelect";
import DateSelector from "./DateSelector";
import Preset from "./Preset";
import yyyyMMdd from "../../utils/yyyyMMdd";

export default class Filter extends Component {
	shouldComponentUpdate(nextProps) {
		return 	nextProps.selections !== this.props.selections ||
							nextProps.filters !== this.props.filters ||
							nextProps.currentPage !== this.props.currentPage ||
							nextProps.totalPages !== this.props.totalPages;
	}

	render() {
		// use cx
		const baseClassName = "job-text-input ";
		const textFilterClassName = baseClassName + "filter";
		const dateFilterClassName = baseClassName + "date";

		const selects = this.props.filters.get("restrictions").map((field, restr) => {
			return (
				this.props.selections.has(restr) ?
				<MultiSelect key={restr}
					selected={field}
					selections={this.props.selections.get(restr)}
					onSelect={this.props.restrictTo}
				/>
				: <span key={restr}/>
			);
		}).toArray();

		const presets = this.props.presetConfig.map(preset => {
			const key = preset.description.split(" ")[0];
			return <Preset key={key} description={preset.description} onSelect={preset.onSelect} />;
		});

		return (
			<div className="table-manip">
				<div className="table-manip-col table-manip-filters" >
					<div className="table-manip-presets">
						{presets}
					</div>
					<FilterInput type="text" value={this.props.filters.get("filterBy")}
						setFilter={this.props.setFilter} className={textFilterClassName}
						placeholder="Filter all by..."
					/>
					<div className="table-manip-row">
						<DateSelector value={this.props.filters.get("startDate")}
							onChange={this.props.setStartDate} className={dateFilterClassName}
							inputClass={"clearable"} />
						<DateSelector value={this.props.filters.get("endDate")}
							onChange={this.props.setEndDate} className={dateFilterClassName}
							inputClass={"clearable"} />
					</div>
					<Pager total={this.props.totalPages} current={this.props.currentPage}
							visiblePages={5} onPageChanged={this.props.changePage}/>
				</div>
				<div className="table-manip-col">
					{selects}
				</div>
				{ this.props.children ?
				<div className="table-manip-col table-manip-children">
					{this.props.children}
				</div> :
				<span/> }
		</div>
		);
	}
}

Filter.propTypes = {
	filters: IPropTypes.shape({
		filterBy    : PropTypes.string,
		startDate   : PropTypes.string,
		endDate     : PropTypes.string,
		restrictions: IPropTypes.mapOf(IPropTypes.shape({
				key    : PropTypes.string,
				options: IPropTypes.listOf(PropTypes.string)
			})
		)
	}),

	selections   : IPropTypes.mapOf(IPropTypes.listOf(PropTypes.string)),

	presetConfig : PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string,
		onSelect: PropTypes.arrayOf(PropTypes.func)
	})),

	setFilter   : PropTypes.func,
	setStartDate: PropTypes.func,
	setEndDate  : PropTypes.func,
	restrictTo  : PropTypes.func,

	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	changePage : PropTypes.func
};