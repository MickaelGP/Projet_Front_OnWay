type Props = {
    message: string;
}
export default function SuccesAlert({ message }: Props) {
    return (
        <div className="w-50 mt-5 alert alert-success text-center container">
            {message}
        </div>
    )
}