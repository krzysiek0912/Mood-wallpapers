import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchParams, setSearchParamsRequest } from '../../../redux/imagesRedux';

const StyledOptionWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    grid-gap: 30px;
`;
const StyledInput = styled.input`
    width: 100%;
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    line-height: 33px;
`;
const optionsTimeOfYear = [
    { label: 'Spring', value: 'spring' },
    { label: 'Summer', value: 'summer' },
    { label: 'Autumn', value: 'autumn' },
    { label: 'Winter', value: 'winter' },
];
const optionsTimeOfDay = [
    { label: 'Morning', value: 'morning' },
    { label: 'South', value: 'south' },
    { label: 'Evening', value: 'evening' },
    { label: 'Night', value: 'night' },
];
class SettingSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOfDay: '',
            timeOfYear: '',
            customText: '',
        };
        this.optionsTimeOfYearRef = React.createRef();
    }

    // componentDidMount() {
    //     const searchParams = this.props;
    //     if (searchParams) {
    //         // console.log('searc', searchParams);
    //         this.setState({
    //             ...searchParams,
    //         });
    //     }
    // }

    handleChangeSearchOptions = () => {
        const { setSearchParams } = this.props;
        setSearchParams(this.state);
    };

    handleChangeInput = ({ target }) => {
        this.setState(
            (prevState) => ({
                ...prevState.searchParams,
                customText: target.value,
            }),
            () => {
                this.handleChangeSearchOptions();
            },
        );
    };

    handleChangeSelect = (values, option) => {
        let optionToString = '';
        if (values) {
            optionToString = values
                .map((value) => {
                    return value.value;
                })
                .join(' ');
        }
        this.setState((prevState) => {
            return {
                ...prevState.searchParams,
                [option.name]: optionToString,
            };
        }, this.handleChangeSearchOptions);
    };

    render() {
        const { customText } = this.state;
        return (
            <>
                <StyledOptionWrapper>
                    <div>
                        <span>Choose the time of year</span>
                        <Select
                            onChange={this.handleChangeSelect}
                            closeMenuOnSelect={false}
                            id="timeOfYear"
                            name="timeOfYear"
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsTimeOfYear}
                        />
                    </div>
                    <div>
                        <span>Choose time of day</span>
                        <Select
                            onChange={this.handleChangeSelect}
                            name="timeOfDay"
                            closeMenuOnSelect={false}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsTimeOfDay}
                        />
                    </div>
                    <div>
                        <span>Custom search</span>
                        <StyledInput
                            value={customText}
                            onChange={this.handleChangeInput}
                            name="customSearch"
                            type="text"
                        />
                    </div>
                </StyledOptionWrapper>
            </>
        );
    }
}
SettingSidebar.propTypes = {
    // searchParams: PropTypes.arrayOf(PropTypes.string),
    setSearchParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    searchParams: getSearchParams(state),
});
const mapDispatchToProps = (dispatch) => ({
    setSearchParams: (searchParams) => dispatch(setSearchParamsRequest(searchParams)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingSidebar);
