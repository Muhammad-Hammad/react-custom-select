import { useState } from 'react';
import Select from './select';
import { SelectOption } from './select.type';

const options = [
    {
        value: 1,
        label: 'first',
    },
    {
        value: 2,
        label: 'second',
    },
    {
        value: 3,
        label: 'third',
    },
    {
        value: 4,
        label: 'fourth',
    },
    {
        value: 5,
        label: 'fifth',
    },
];
function App() {
    const [value, setValue] = useState<SelectOption | undefined>(options[0]);
    const [value1, setValue1] = useState<SelectOption[]>([options[0]]);

    return (
        <div>
            {/* <Select
                onChange={(e) => setValue(e)}
                value={value}
                options={options}
            /> */}
            <br />

            <Select
                multiple
                onChange={(e) => setValue1(e)}
                value={value1}
                options={options}
            />
        </div>
    );
}

export default App;
