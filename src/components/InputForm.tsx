type Props = {
    id: string;
    type: string;
    value: string;
    name: string;
    label: string;
    required?: boolean;
    onChange: (value: string) => void;
}
export default function InputForm({id, type, value, name, label, onChange, required = false}: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
    }
    return (<>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} className="form-control" required={required} value={value} onChange={handleChange}/>
        </>
    )
}