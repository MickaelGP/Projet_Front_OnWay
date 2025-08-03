type Props = {
    classDiv?: string;
    label: string;
    name: string;
    id: string;
    placeHolder: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
}
export default function TextArea({ classDiv, label, name, id, placeHolder, required, value, onChange }: Props) {
    return (
        <div className={classDiv}>
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea className="form-control" name={name} id={id} placeholder={placeHolder} required={required} value={value} onChange={(e) => onChange(e.target.value)}></textarea>
        </div>
    )
}