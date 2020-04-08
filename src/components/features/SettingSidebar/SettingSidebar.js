import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchParams, setSearchParamsRequest } from '../../../redux/imagesRedux';

const StyledOptionWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(250px, 1fr));
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
    { label: 'Spring', value: 'Spring' },
    { label: 'Summer', value: 'Summer' },
    { label: 'Autumn', value: 'Autumn' },
    { label: 'Winter', value: 'Winter' },
];
const optionsTimeOfDay = [
    { label: 'Morning', value: 'Morning' },
    { label: 'Afternoon', value: 'Afternoon' },
    { label: 'Evening', value: 'Evening' },
    { label: 'Night', value: 'Night' },
];
const optionsWeather = [
    { label: 'Sunny', value: 'Sunny' },
    { label: 'Rainy', value: 'Rainy' },
    { label: 'Cloudy', value: 'Cloudy' },
];
const optionsPlace = [
    { label: 'City', value: 'City' },
    { label: 'Beach', value: 'Beach' },
    { label: 'Mountains', value: 'Mountains' },
    { label: 'Forest', value: 'Forest' },
];
class SettingSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOfDay: [],
            timeOfYear: [],
            weather: [],
            place: [],
            customText: '',
        };
        this.timeout = null;
    }

    componentDidMount() {
        const searchParams = this.props;
        if (searchParams) {
            this.setState({
                ...searchParams.searchParams,
            });
        }
    }

    handleChangeSearchOptions = () => {
        const { setSearchParams } = this.props;
        setSearchParams({ ...this.state });
    };

    handleChangeInput = ({ target }) => {
        this.setState(
            (prevState) => ({
                ...prevState.searchParams,
                customText: target.value,
            }),
            () => {},
        );
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.handleChangeSearchOptions();
        }, 500);
    };

    handleChangeSelect = (values, option) => {
        this.setState(() => {
            return {
                [option.name]: values || [],
            };
        }, this.handleChangeSearchOptions);
    };

    render() {
        const { searchParams } = this.props;
        const { customText, weather, place } = this.state;
        const { timeOfDay, timeOfYear } = searchParams;
        return (
            <>
                <StyledOptionWrapper>
                    <div>
                        <span>Change the time of year</span>
                        <Select
                            onChange={this.handleChangeSelect}
                            defaultValue={timeOfYear[0]}
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
                        <span>Change time of day</span>
                        <Select
                            onChange={this.handleChangeSelect}
                            defaultValue={timeOfDay[0]}
                            name="timeOfDay"
                            closeMenuOnSelect={false}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsTimeOfDay}
                        />
                    </div>
                    <div>
                        <span>Change place</span>
                        <Select
                            onChange={this.handleChangeSelect}
                            defaultValue={place}
                            name="place"
                            closeMenuOnSelect={false}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsPlace}
                        />
                    </div>
                    <div>
                        <span>Change weather</span>
                        <Select
                            onChange={this.handleChangeSelect}
                            defaultValue={weather}
                            name="weather"
                            closeMenuOnSelect={false}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsWeather}
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
    searchParams: PropTypes.shape({
        timeOfYear: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
        timeOfDay: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    }).isRequired,

    setSearchParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    searchParams: getSearchParams(state),
});
const mapDispatchToProps = (dispatch) => ({
    setSearchParams: (searchParams) => dispatch(setSearchParamsRequest(searchParams)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingSidebar);
