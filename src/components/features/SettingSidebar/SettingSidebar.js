import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Label } from 'reactstrap';

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

class SettingSidebar extends Component {
    onChangeInput = (selected) => {
        console.log(selected);
    };

    onClick = (e) => {
        console.log(e);
    };

    render() {
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
        return (
            <>
                <StyledOptionWrapper>
                    <div>
                        <Label for="timeOfYear">Choose the time of year</Label>
                        <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsTimeOfYear}
                        />
                    </div>
                    <div>
                        <Label for="timeOfDay">Choose time of day</Label>
                        <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={optionsTimeOfDay}
                        />
                    </div>
                    <div>
                        <Label for="customSearch">Custom search</Label>
                        <StyledInput name="customSearch" type="text" />
                    </div>
                </StyledOptionWrapper>
            </>
        );
    }
}

export default SettingSidebar;
