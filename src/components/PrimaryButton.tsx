type Props ={
    classBtn: string;
    classDiv: string;
    type?: "button" | "submit";
    id: string;
    disabled: boolean;
    text: string;
}
export default function PrimaryButton({classBtn, type = "button", id, disabled = false, text, classDiv}: Props) {
    return (
        <div className={classDiv}>
            <button type={type} className={classBtn} id={id} disabled={disabled}>{text}</button>
        </div>
    );
}