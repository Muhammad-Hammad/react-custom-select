// export type SelectOption = {
//     label: String;
//     value: any;
// };

// export type SelectProps = {
//     options: SelectOption[];
// } & (SingleSelectProps | MultipleSelectProps);

// export type SingleSelectProps = {
//     multiple?: false;
//     value?: SelectOption;
//     onChange: (value: SelectOption | undefined) => void;
// };
// export type MultipleSelectProps = {
//     multiple: true;
//     value: SelectOption[];
//     onChange: (value: SelectOption | undefined) => void;
// };

export type SelectOption = {
    label: string;
    value: any;
};

export type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
};

export type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

export type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);
